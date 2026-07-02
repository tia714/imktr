const form = document.getElementById("formPeminjaman");
const hasil = document.getElementById("hasil");

form.addEventListener("submit", function(event){

    event.preventDefault();

    const nama = document.getElementById("nama")?.value || "-";
    // pinjam.html pakai select id="item" untuk pilihan ruang/peralatan
    const ruang = document.getElementById("item")?.value || "-";
    const alat = "-";

    const tanggal = document.getElementById("tanggal")?.value || "-";
    const waktuMulai = document.getElementById("waktuMulai")?.value || "-";
    const waktuSelesai = document.getElementById("waktuSelesai")?.value || "-";



    hasil.innerHTML = `
        <div class="kartu">
            <h3>Data Peminjaman</h3>

            <p><strong>Nama :</strong> ${nama}</p>

            <p><strong>Ruang :</strong> ${ruang}</p>

            <p><strong>Alat :</strong> ${alat}</p>

            <p><strong>Tanggal :</strong> ${tanggal}</p>

            <p><strong>Jam Awal :</strong> ${waktuMulai}</p>
            <p><strong>Jam Selesai :</strong> ${waktuSelesai}</p>

            <p style="color:green;">
                ✔ Peminjaman berhasil disimpan

            </p>
        </div>
    `;

    form.reset();
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


function setToggle(type) {
            const ruangBtn = document.getElementById('toggleRuang');
            const alatBtn  = document.getElementById('toggleAlat');
            const labelItem = document.getElementById('label-item');
            const iconItem  = document.getElementById('icon-item');
            const selectItem = document.getElementById('item');
            const submitText = document.getElementById('submit-text');

            const activeClass   = ['bg-primary', 'text-white', 'shadow-sm'];
            const inactiveClass = ['text-on-surface-variant', 'hover:bg-surface-container-high'];

            if (type === 'ruang') {
                ruangBtn.classList.add(...activeClass);
                ruangBtn.classList.remove(...inactiveClass);
                alatBtn.classList.remove(...activeClass);
                alatBtn.classList.add(...inactiveClass);

                labelItem.textContent = 'Pilih Ruang / Kelas';
                iconItem.textContent  = 'meeting_room';
                submitText.textContent = 'Simpan Peminjaman Ruang';

                selectItem.innerHTML = `
                    <option value="">-- Pilih Ruang --</option>
                    <optgroup label="Kelas Teori">
                        <option value="Kelas A101">Kelas A101</option>
                        <option value="Kelas A102">Kelas A102</option>
                        <option value="Kelas B201">Kelas B201</option>
                        <option value="Kelas B202">Kelas B202</option>
                        <option value="Kelas C301">Kelas C301</option>
                    </optgroup>
                    <optgroup label="Laboratorium">
                        <option value="Lab Komputer 1">Lab Komputer 1</option>
                        <option value="Lab Komputer 2">Lab Komputer 2</option>
                        <option value="Lab Jaringan">Lab Jaringan</option>
                        <option value="Lab Elektronika">Lab Elektronika</option>
                    </optgroup>
                    <optgroup label="Ruang Lain">
                        <option value="Auditorium">Auditorium</option>
                        <option value="Aula Serbaguna">Aula Serbaguna</option>
                        <option value="Ruang Seminar">Ruang Seminar</option>
                        <option value="Ruang Rapat">Ruang Rapat</option>
                    </optgroup>
                `;
            } else {
                alatBtn.classList.add(...activeClass);
                alatBtn.classList.remove(...inactiveClass);
                ruangBtn.classList.remove(...activeClass);
                ruangBtn.classList.add(...inactiveClass);

                labelItem.textContent = 'Pilih Peralatan';
                iconItem.textContent  = 'construction';
                submitText.textContent = 'Simpan Peminjaman Alat';

                selectItem.innerHTML = `
                    <option value="">-- Pilih Alat --</option>
                    <optgroup label="Audio Visual">
                        <option value="Proyektor Epson">Proyektor Epson</option>
                        <option value="Proyektor Infocus">Proyektor Infocus</option>
                        <option value="Layar Proyektor">Layar Proyektor</option>
                        <option value="Mikrofon Wireless">Mikrofon Wireless</option>
                        <option value="Mikrofon Clip-on">Mikrofon Clip-on</option>
                        <option value="Speaker Portable">Speaker Portable</option>
                    </optgroup>
                    <optgroup label="Kamera & Foto">
                        <option value="Kamera DSLR">Kamera DSLR</option>
                        <option value="Kamera Mirrorless">Kamera Mirrorless</option>
                        <option value="Tripod Kamera">Tripod Kamera</option>
                        <option value="Lensa Tambahan">Lensa Tambahan</option>
                    </optgroup>
                    <optgroup label="Peralatan Lain">
                        <option value="Extension Cord 5m">Extension Cord 5m</option>
                        <option value="Extension Cord 10m">Extension Cord 10m</option>
                        <option value="Laptop Pinjaman">Laptop Pinjaman</option>
                        <option value="Whiteboard Portable">Whiteboard Portable</option>
                    </optgroup>
                `;
            }
        }

        // Baca URL param saat halaman load untuk auto-set toggle
        window.addEventListener('DOMContentLoaded', () => {
            const params = new URLSearchParams(window.location.search);
            const tab = params.get('tab');
            if (tab === 'alat') {
                setToggle('alat');
            } else {
                setToggle('ruang');
            }
        });