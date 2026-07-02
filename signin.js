const signin = document.getElementById("signin");
const signup = document.getElementById("signup");

function showSignup() {
    signin.classList.add("hidden");
    signup.classList.remove("hidden");
}

function showSignin() {
    signup.classList.add("hidden");
    signin.classList.remove("hidden");
}

function login() {
    // sesuai request: tombol Sign In langsung menuju home.html (tanpa validasi backend)
    if (!signin.reportValidity()) return;

    // const email = document.getElementById("email").value;
    // const password = document.getElementById("password").value;

    window.location.href = "home.html";
}

function register() {
    // sesuai request: tombol Sign Up langsung menuju home.html
    if (!signup.reportValidity()) return;

    // (demo) skip proses register backend
    window.location.href = "home.html";
}

// ── Forgot Password (demo) ───────────────────────────────────────────────
function showForgotPassword() {
    const modal = document.getElementById("forgotModal");
    if (!modal) return;

    const emailInput = document.getElementById("forgotEmail");
    const msgEl = document.getElementById("forgotMessage");

    if (emailInput) emailInput.value = "";
    if (msgEl) msgEl.textContent = "";
    modal.classList.remove("hidden");
}

function closeForgotModal() {
    const modal = document.getElementById("forgotModal");
    if (!modal) return;
    modal.classList.add("hidden");
}

function sendResetLink() {
    const emailInput = document.getElementById("forgotEmail");
    const msgEl = document.getElementById("forgotMessage");
    if (!emailInput) return;

    if (!emailInput.reportValidity()) return;

    // Demo: belum ada backend reset password.
    if (msgEl) {
        msgEl.textContent = "Reset link dikirim (simulasi). Cek email kamu!";
    }
}


// expose ke inline onclick di HTML (jaga-jaga kalau modul) 
window.showForgotPassword = showForgotPassword;
window.closeForgotModal = closeForgotModal;
window.sendResetLink = sendResetLink;
