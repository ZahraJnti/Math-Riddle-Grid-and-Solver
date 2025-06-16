
import random

def generate_puzzle(size=5):
    """
    تولید یک جدول تصادفی ۵×۵ با اعداد ۱ تا ۹، طوری که در کل جدول فقط از هر عدد یک‌بار استفاده بشه.
    در آینده میشه قوانین ریاضی و جمع ردیف‌ها/ستون‌ها رو اضافه کرد.
    """

    # ساخت یک لیست از اعداد 1 تا 9
    numbers = list(range(1, 10)) * ((size * size) // 9 + 1)
    random.shuffle(numbers)

    # ساخت جدول 2D
    grid = []
    for i in range(size):
        row = []
        for j in range(size):
            value = numbers.pop()
            row.append(value)
        grid.append(row)

    return grid
