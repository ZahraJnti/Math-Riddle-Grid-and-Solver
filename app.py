from flask import Flask, render_template, request, jsonify
from logic.generator import generate_grid
from logic.solver import solve_grid

app = Flask(__name__)

@app.route("/")
def index():
    grid = generate_grid()
    return render_template("index.html", grid=grid)

@app.route("/generate", methods=["GET"])
def generate():
    try:
        grid = generate_grid()
        return jsonify({"success": True, "grid": grid})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/solve", methods=["POST"])
def solve():
    try:
        data = request.json
        grid = data.get("grid")
        solution = solve_grid(grid)
        return jsonify({"success": True, "solution": solution})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
