document.addEventListener("DOMContentLoaded", () => {
    let selectedNumber = null;

    const numberButtons = document.querySelectorAll(".number-btn");
    const tableCells = document.querySelectorAll("#gridTable td");

    // ✅ انتخاب عدد از پایین
    numberButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // برداشتن highlight از دکمه‌های قبلی
            numberButtons.forEach(b => b.classList.remove("active"));
            // تنظیم عدد انتخاب شده
            selectedNumber = btn.dataset.number;
            btn.classList.add("active");
        });
    });

    // ✅ گذاشتن عدد در سلول‌های input
    tableCells.forEach(cell => {
        if (cell.dataset.type === "input") {
            cell.addEventListener("click", () => {
                if (!selectedNumber) return; // اگر عددی انتخاب نشده
                if (cell.textContent === selectedNumber) {
                    // اگر کاربر دوباره روی همان عدد کلیک کند، پاک شود
                    cell.textContent = "";
                } else {
                    cell.textContent = selectedNumber;
                }
                updateUsedNumbers();
            });
        }
    });

    // ✅ بروزرسانی اعداد استفاده شده
    function updateUsedNumbers() {
        // همه اعداد داخل inputها را جمع کنیم
        const usedNumbers = new Set();
        tableCells.forEach(cell => {
            if (cell.dataset.type === "input" && cell.textContent) {
                usedNumbers.add(cell.textContent);
            }
        });

        // دکمه‌ها را مدیریت کنیم
        numberButtons.forEach(btn => {
            const num = btn.dataset.number;
            if (usedNumbers.has(num)) {
                btn.classList.add("hidden");
                // اگر این عدد انتخاب شده بود، آن را لغو کن
                if (selectedNumber === num) {
                    selectedNumber = null;
                    btn.classList.remove("active");
                }
            } else {
                btn.classList.remove("hidden");
            }
        });
    }
});


// دکمه‌های اصلی
const generateBtn = document.getElementById("generateBtn");
const solveBtn = document.getElementById("solveBtn");
const designBtn = document.getElementById("designBtn");

// Generate Random Grid
generateBtn.addEventListener("click", () => {
    fetch("/generate")
        .then(response => response.json())
        .then(data => {
            updateGrid(data);
        });
});

// Solve Grid
solveBtn.addEventListener("click", () => {
    const currentGrid = getCurrentGrid();
    fetch("/solve", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ grid: currentGrid })
    })
    .then(response => response.json())
    .then(solution => {
        updateGrid(solution);
    });
});

// Design Custom Grid
designBtn.addEventListener("click", () => {
    // برای طراحی دستی فعلا فقط همه inputها را خالی کن
    tableCells.forEach(cell => {
        if (cell.dataset.type === "input") {
            cell.textContent = "";
        }
    });
    updateUsedNumbers();
});

// تابع کمکی: بروز رسانی جدول
function updateGrid(newGrid) {
    newGrid.forEach((row, i) => {
        row.forEach((cell, j) => {
            const tableCell = document.querySelector(
                `td[data-row='${i}'][data-col='${j}']`
            );
            tableCell.textContent = cell.value;
        });
    });
    updateUsedNumbers();
}

// تابع کمکی: گرفتن وضعیت فعلی جدول
function getCurrentGrid() {
    const grid = [];
    for (let i = 0; i < 7; i++) {
        const row = [];
        for (let j = 0; j < 7; j++) {
            const cell = document.querySelector(
                `td[data-row='${i}'][data-col='${j}']`
            );
            row.push({
                type: cell.dataset.type,
                value: cell.textContent.trim()
            });
        }
        grid.push(row);
    }
    return grid;
}


// المنت لودینگ بساز (در HTML می‌تونی بذاری)
const loadingOverlay = document.getElementById("loadingOverlay");

// نمایش لودینگ
function showLoading() {
    loadingOverlay.style.display = "flex";
}

// مخفی کردن لودینگ
function hideLoading() {
    loadingOverlay.style.display = "none";
}

// پیام خطا
function showError(msg) {
    alert("خطا: " + msg);
}

// دکمه‌های اصلی
generateBtn.addEventListener("click", () => {
    showLoading();
    fetch("/generate")
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                updateGrid(data.grid);
            } else {
                showError(data.error);
            }
        })
        .catch(err => showError(err))
        .finally(() => hideLoading());
});

solveBtn.addEventListener("click", () => {
    const currentGrid = getCurrentGrid();
    showLoading();
    fetch("/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ grid: currentGrid })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            updateGrid(data.solution);
        } else {
            showError(data.error);
        }
    })
    .catch(err => showError(err))
    .finally(() => hideLoading());
});

designBtn.addEventListener("click", () => {
    tableCells.forEach(cell => {
        if (cell.dataset.type === "input") {
            cell.textContent = "";
        }
    });
    updateUsedNumbers();
});
