import copy

def check_equation(a, b, op, result):
    if op == "+":
        return a + b == result
    elif op == "-":
        return a - b == result
    elif op == "*":
        return a * b == result
    elif op == "/":
        return b != 0 and a / b == result
    return False

def solve_grid(grid):
    # پیدا کردن input ها
    inputs = []
    for i in range(7):
        for j in range(7):
            if grid[i][j]["type"] == "input":
                inputs.append((i, j))

    def backtrack(index, used):
        if index == len(inputs):
            # همه پر شده، بررسی کن
            return check_grid(grid)

        i, j = inputs[index]
        for num in range(1, 10):
            if num in used:
                continue
            grid[i][j]["value"] = str(num)
            used.add(num)
            if backtrack(index + 1, used):
                return True
            used.remove(num)
            grid[i][j]["value"] = ""
        return False

    def check_grid(grid):
        # چک کردن همه معادله‌ها در ردیف‌ها
        for i in range(0, 7, 2):
            for j in range(0, 7, 2):
                if j + 4 >= 7:
                    continue
                a = int(grid[i][j]["value"])
                op = grid[i][j+1]["value"]
                b = int(grid[i][j+2]["value"])
                eq = grid[i][j+4]["value"]
                res = int(eq)
                if not check_equation(a, b, op, res):
                    return False
        return True

    backtrack(0, set())
    return grid
