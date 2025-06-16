
def solve_puzzle(grid):
    """
    حل ساده جدول با پر کردن سلول‌های خالی با اعدادی بین ۱ تا ۹
    بدون در نظر گرفتن محدودیت‌های ریاضی، فقط بدون تکرار عدد در جدول.
    """

    from copy import deepcopy

    size = len(grid)
    numbers = set(range(1, 10))

    # استخراج اعداد استفاده‌شده
    used = set()
    for row in grid:
        for cell in row:
            if isinstance(cell, int):
                used.add(cell)

    available = list(numbers - used)

    solution = deepcopy(grid)

    index = 0
    for i in range(size):
        for j in range(size):
            if not solution[i][j] or solution[i][j] == "":
                if index < len(available):
                    solution[i][j] = available[index]
                    index += 1
                else:
                    solution[i][j] = 0  # اگر عددی باقی نبود، صفر بذاریم

    return solution
