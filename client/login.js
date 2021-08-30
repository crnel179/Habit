const togglePassword = document.querySelectorAll('i');
const newAccountBtn = document.querySelector('#new-account-btn')
const recoveryBtn = document.querySelector('#pass-recovery-btn')
const passwordReg = document.querySelector("input[name='password-reg']");
const passwordRegRepeat = document.querySelector("input[name='password-reg-repeat']");

togglePassword.forEach(element => element.addEventListener('click', e => handleTogglePass(e)))
newAccountBtn.addEventListener('click', e => showRegisterForm(e))
recoveryBtn.addEventListener('click', e => showRecoveryForm(e))
passwordReg.addEventListener('change', e => validatePassword(e))
passwordRegRepeat.addEventListener('change', e => comparePassword(e));

function handleTogglePass(e) {
    e.preventDefault();

    const inputPassword = document.querySelectorAll(".password");
    const type = inputPassword[0].getAttribute('type');
    // change password visibility and icon
    if (type === 'password') {
        inputPassword.forEach(input => input.setAttribute('type', 'text'))
        togglePassword.forEach(toggle => toggle.classList.add('bi-eye'))
    } else {
        inputPassword.forEach(input => input.setAttribute('type', 'password'))
        togglePassword.forEach(toggle => toggle.classList.remove('bi-eye'))
    }
}

function showRegisterForm(e) {
    e.preventDefault();
    const loginSection = document.querySelector('#login-section');
    const registerSection = document.querySelector('#registration-section');
    loginSection.classList.add('d-none')
    registerSection.classList.remove('d-none')
}

function showRecoveryForm(e) {
    e.preventDefault();
    const loginSection = document.querySelector('#login-section');
    const recoverySection = document.querySelector('#recovery-section');
    loginSection.classList.add('d-none')
    recoverySection.classList.remove('d-none')
}

function validatePassword(e) {
    e.preventDefault()
    const password = e.target.value;
    let err = e.target.parentElement.nextElementSibling;
    if (password.length < 8) {
        err.innerText = 'Password must be at least 8 charaters long'
    } else {
        err.innerText = ''
    }
}

function comparePassword(e) {
    e.preventDefault();
    const password1 = passwordReg.value;
    const password2 = e.target.value;
    let err = e.target.parentElement.nextElementSibling;
    if (password1 !== password2) {
        err.innerText = 'Passwords do not match'
    } else {
        err.innerText = ''
    }
}
