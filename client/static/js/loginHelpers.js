// get the button and input elements
const togglePassword = document.querySelectorAll('i');
const newAccountBtn = document.querySelector('#new-account-btn')
const recoveryBtn = document.querySelector('#pass-recovery-btn')
const passwordReg = document.querySelector("input[name='password-reg']");
const passwordRegRepeat = document.querySelector("input[name='password-reg-repeat']");

// attach event listeners
togglePassword.forEach(element => element.addEventListener('click', e => handleTogglePass(e)))
newAccountBtn.addEventListener('click', e => showForm(e, 'registration'))
recoveryBtn.addEventListener('click', e => showForm(e, 'recovery1'))
passwordReg.addEventListener('change', e => validatePassword(e))
passwordRegRepeat.addEventListener('change', e => validatePassword(e));

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

function showForm(e, type) {
    e.preventDefault();
    const loginSection = document.querySelector('#login-section');
    const newSection = document.querySelector(`#${type}-section`);
    loginSection.classList.add('d-none')
    newSection.classList.remove('d-none')
}

function validatePassword(e) {
    e.preventDefault()
    const passwords = document.querySelectorAll("input[name='password-reg'], input[name='password-reg-repeat']")
    let passErrors = document.querySelectorAll('#password-error, #password-error-2')
    const submitBtn = document.querySelector("input[name='submit-reg']");
    // set default error message as none and disable the submit button
    passErrors.forEach(element => element.innerText = '')
    submitBtn.disabled = false;
    // the first password is less than 8 chars
    if (passwords[0].value.length < 8) {
        passErrors[0].innerText = 'Password must be at least 8 charaters long';
        submitBtn.disabled = true;
    }
    //passwords do not match
    if (passwords[0].value !== passwords[1].value) {
        passErrors[1].innerText = 'Passwords do not match';
        submitBtn.disabled = true;
    }
}
