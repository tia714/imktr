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

    // saat render ulang, kalau month/year-nya adalah bulan/tahun hari ini,
    // set tanggal hari ini sebagai selected
    const shouldSelectToday = (
        month === today.getMonth() &&
        year === today.getFullYear()
    );


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

    startDay = startDay === 0 ? 6 : startDay - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

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
                "font-bold",
                "selected-date",
                "bg-primary",
                "text-white"
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


const addBtn = document.getElementById('add-btn');
const addIcon = document.getElementById('add-icon');
const addMenu = document.getElementById('add-menu');
let autoCloseTimeout; // Menyimpan ID timer untuk auto-close

// Fungsi untuk membuka / menutup popup
function toggleMenu(event) {
    event.stopPropagation(); // Mencegah event click langsung menutup menu
    
    const isHidden = addMenu.classList.contains('hide');
    if (isHidden) {
        addMenu.classList.remove('hide');
        addMenu.classList.add('show');
        
        // Memutar ikon '+' menjadi tanda silang 'x'
        addIcon.style.transform = 'rotate(135deg)';

        // Atur timer untuk menutup otomatis setelah 10 detik (10000ms)
        clearTimeout(autoCloseTimeout); // Reset timer aktif sebelumnya (jika ada)
        autoCloseTimeout = setTimeout(closeMenu, 10000);
    } else {
        closeMenu();
    }
}

function closeMenu() {
    addMenu.classList.remove('show');
    addMenu.classList.add('hide');
    addIcon.style.transform = 'rotate(0deg)';
    
    // Hapus timer jika ditutup secara manual sebelum 10 detik
    clearTimeout(autoCloseTimeout);
}

addBtn.addEventListener('click', toggleMenu);

// Tutup popup secara otomatis saat klik di luar area popup
document.addEventListener('click', (event) => {
    const isClickInside = addMenu.contains(event.target) || addBtn.contains(event.target);
    if (!isClickInside) {
        closeMenu();
    }
});

// Tutup popup saat menekan tombol Escape
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeMenu();
    }
});
