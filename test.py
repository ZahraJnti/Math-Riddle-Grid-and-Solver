import random

OPERATORS = ["+", "-", "*"]

def safe_eval(a, op, b):
    if op == "/" and b == 0:
        return 0
    if op == "/":
        return a // b  # تقسیم صحیح
    return eval(f"{a}{op}{b}")

def g():
    size = 7
    grid = [[None for _ in range(size)] for _ in range(size)]
    numbers = list(range(1, 100))
    num_idx = 0
    for i in range(size):
        for j in range(size):
            if i % 2 == 0 and i < size - 2:
                if j % 2 == 0 and j < size - 2:
                    grid[i][j] = {"type": "input", "value": str(numbers[num_idx])}
                    num_idx += 1
                elif j == size - 2:
                    grid[i][j] = {"type": "input", "value": "0"}
                else:
                    grid[i][j] = {"type": "operator", "value": "0"}  # O
            elif i == size - 2:
                grid[i][j] = {"type": "input", "value": "0"} 
            else:
                if j % 2 == 0:
                    grid[i][j] = {"type": "operator", "value": "0"}  # I
                else:
                    grid[i][j] = {"type": "operator", "value": "0"}  # O
    
    for i in range(0, size, 2):
        if i + 1 >= size - 1:
            continue  # اگر i+1 خارج جدول شد

        a = int(grid[i][0]["value"])
        b = int(grid[i][2]["value"])
        c = int(grid[i][4]["value"])

        op1 = random.choice(OPERATORS)
        op2 = random.choice(OPERATORS)

        ab = safe_eval(a, op1, b)
        result = safe_eval(ab, op2, c)

        grid[i][1]["value"] = op1
        grid[i][3]["value"] = op2
        grid[i][5]["value"] = "="
        grid[i][6]["value"] = str(result)

    for j in range(0, size, 2):
        if j + 1 >= size - 1:
            continue
        a = int(grid[0][j]["value"])
        b = int(grid[2][j]["value"])
        c = int(grid[4][j]["value"])

        op1 = random.choice(OPERATORS)
        op2 = random.choice(OPERATORS)

        ab = safe_eval(a, op1, b)
        result = safe_eval(ab, op2, c)

        grid[1][j]["value"] = op1
        grid[3][j]["value"] = op2
        grid[5][j]["value"] = "="
        grid[6][j]["value"] = str(result)

    return grid

gridd = g()

for row in gridd:
    print("  ".join(cell["value"] if cell["value"] is not None else " " for cell in row))
