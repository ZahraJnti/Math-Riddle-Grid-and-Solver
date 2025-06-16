
from flask import Flask, render_template, request, jsonify
from logic.generator import generate_puzzle
from logic.solver import solve_puzzle

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/generate", methods=["POST"])
def generate():
    puzzle_data = generate_puzzle()
    return jsonify({"status": "ok", "grid": puzzle_data})

@app.route("/solve", methods=["POST"])
def solve():
    data = request.get_json()
    grid = data.get("grid")

    if not grid:
        return jsonify({"status": "error", "message": "No grid provided."})

    solution = solve_puzzle(grid)
    return jsonify({"status": "ok", "solution": solution})

if __name__ == "__main__":
    app.run(debug=True)
