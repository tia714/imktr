// Micro-interaction for buttons
document.querySelectorAll("button, a").forEach((el) => {
    el.addEventListener("click", () => {
        if (window.navigator.vibrate) {
            window.navigator.vibrate(5);
        }
    });
});

const WA_CONTACTS = [
    { name: "Admin SARPRAS",       phone: "6281234567890" },
    { name: "Petugas Gedung A",    phone: "6289876543210" },
    { name: "Petugas Gedung B",    phone: "6281122334455" },
    { name: "Helpdesk FTI",        phone: "6285566778899" },
];

// Render contact list items
(function renderContacts() {
    const list = document.getElementById('wa-contact-list');
    WA_CONTACTS.forEach(function(contact) {
        const li = document.createElement('li');
        li.className = 'flex items-center justify-between px-4 py-3 hover:bg-surface-container-low';
        li.innerHTML =
            '<div class="flex items-center gap-3">' +
                '<div class="w-9 h-9 rounded-full bg-[#25D366]/15 flex items-center justify-center">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#25D366" class="w-5 h-5"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>' +
                '</div>' +
                '<span class="text-sm font-medium text-[#001221] font-[\'Outfit\']">' + contact.name + '</span>' +
            '</div>' +
            '<a href="https://wa.me/' + contact.phone + '" target="_blank" rel="noopener noreferrer" ' +
                'class="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center active:scale-90 transition-transform hover:bg-[#1ebe5d] flex-shrink-0" ' +
                'aria-label="Chat with ' + contact.name + ' on WhatsApp">' +
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
            '</a>';
        list.appendChild(li);
    });
})();

let waAutoCloseTimeout;

function toggleWaPopup() {
    const popup = document.getElementById('wa-contact-popup');
    const isOpened = popup.classList.toggle('hidden');
    
    // Hapus timeout sebelumnya jika ada aksi klik berulang
    if (waAutoCloseTimeout) {
        clearTimeout(waAutoCloseTimeout);
    }

    // Jika statusnya terbuka (tidak hidden), jalankan hitung mundur 5 detik (5000 ms)
    if (!isOpened) {
        waAutoCloseTimeout = setTimeout(function() {
            popup.classList.add('hidden');
        }, 5000);
    }
}

// Close popup when clicking outside
document.addEventListener('click', function(e) {
    const popup = document.getElementById('wa-contact-popup');
    const fab   = document.getElementById('wa-fab');
    if (!popup.classList.contains('hidden') && !popup.contains(e.target) && !fab.contains(e.target)) {
        popup.classList.add('hidden');
        if (waAutoCloseTimeout) clearTimeout(waAutoCloseTimeout);
    }
});


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