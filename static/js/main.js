
let selectedNumber = null;

// انتخاب عدد از پایین
document.querySelectorAll(".number").forEach(numberEl => {
    numberEl.addEventListener("click", () => {
        // اگه عدد استفاده شده باشه، دیگه انتخاب نشه
        if (numberEl.classList.contains("used")) return;

        // پاک کردن انتخاب قبلی
        document.querySelectorAll(".number").forEach(el => el.classList.remove("selected"));

        // ثبت عدد انتخاب شده
        selectedNumber = numberEl.getAttribute("data-value");
        numberEl.classList.add("selected");
    });
});

// وقتی روی سلول جدول کلیک می‌کنیم
document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener("click", () => {
        if (!selectedNumber) return; // اگه عددی انتخاب نشده، کاری نکن

        const currentValue = cell.textContent;

        if (currentValue !== "") return; // فقط روی سلول خالی بنویس

        // گذاشتن عدد در سلول
        cell.textContent = selectedNumber;
        cell.setAttribute("data-value", selectedNumber);

        // غیرفعال کردن عدد
        const numberEl = document.querySelector(`.number[data-value="${selectedNumber}"]`);
        numberEl.classList.add("used");
        numberEl.classList.remove("selected");

        selectedNumber = null;
    });

    // با دوبار کلیک روی سلول، عدد حذف میشه و به لیست پایین برمی‌گرده
    cell.addEventListener("dblclick", () => {
        const value = cell.getAttribute("data-value");
        if (!value) return;

        // پاک کردن مقدار سلول
        cell.textContent = "";
        cell.removeAttribute("data-value");

        // فعال کردن عدد پایین
        const numberEl = document.querySelector(`.number[data-value="${value}"]`);
        numberEl.classList.remove("used");
    });
});
