const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
];

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

currentYear = Math.min(Math.max(currentYear, 2025), 2027);

const today = new Date();

function renderCalendar(month, year) {

    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    document.getElementById("monthYear").textContent =
        `${monthNames[month]} ${year}`;

    // Monday first
    const weekdays = ["Mo","Tu","We","Th","Fr","Sa","Su"];

    weekdays.forEach(day => {
        const d = document.createElement("div");
        d.className =
            "font-semibold text-center text-sm text-gray-500";
        d.textContent = day;
        calendar.appendChild(d);
    });

    const firstDay = new Date(year, month, 1);

    let startDay = firstDay.getDay();

    // convert Sunday-first -> Monday-first
    startDay = startDay === 0 ? 6 : startDay - 1;

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // empty boxes
    for (let i = 0; i < startDay; i++) {
        calendar.appendChild(document.createElement("div"));
    }

    for (let day = 1; day <= daysInMonth; day++) {

        const btn = document.createElement("button");

        btn.textContent = day;

        btn.className =
            "aspect-square rounded-lg hover:bg-blue-100 transition";

        // Today
        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            btn.classList.add(
                "border-4",
                "border-primary",
                "font-bold"
            );
        }

        btn.onclick = () => {

            document
                .querySelectorAll(".selected-date")
                .forEach(e => {
                    e.classList.remove(
                        "selected-date",
                        "bg-primary",
                        "text-white"
                    );
                });

            btn.classList.add(
                "selected-date",
                "bg-primary",
                "text-white"
            );

            console.log(
                `${year}-${month + 1}-${day}`
            );
        };

        calendar.appendChild(btn);
    }

}

document.getElementById("prevMonth").onclick = () => {

    if (currentMonth === 0) {

        if (currentYear === 2025) return;

        currentMonth = 11;
        currentYear--;

    } else {

        currentMonth--;

    }

    renderCalendar(currentMonth, currentYear);

};

document.getElementById("nextMonth").onclick = () => {

    if (currentMonth === 11) {

        if (currentYear === 2027) return;

        currentMonth = 0;
        currentYear++;

    } else {

        currentMonth++;

    }

    renderCalendar(currentMonth, currentYear);

};

renderCalendar(currentMonth, currentYear);