//-----------FUNCTIONS FOR AUTHNETICATION REQUESTS AND HANDLING AUTH-----------//
// accessible only for index.html

const url = 'http://localhost:5000/'

async function requestLogin(e){
    e.preventDefault();
    try {
        const formData = Object.fromEntries(new FormData(e.target));
        formData.user_email = formData.email;
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }
        const res = await fetch(`${url}users/login`, options)
        const data = await res.json()
        // if (data.err){ throw Error(data.err); }
        login(data, formData.email);
    } catch (err) {
        console.log(`Error: ${err}`);
        const errElement = document.createElement('p');
        errElement.innerText = 'Login failed';
        document.querySelector('#login-section').appendChild(errElement);
    }
}

async function requestRegistration(formData) {
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }
        const res = await fetch(`${url}users`, options)
        //change forms and request email verification

        requestEmailVerification(formData);
        showEmailForm();
        localStorage.setItem('email', formData.user_email);
    } catch (err) {
        const h1 = document.querySelector("#registration-error");
        h1.innerText = err;
        console.log(err);
    }
}

async function requestEmailVerification(formData) {
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }
        await fetch(`${url}users/verify`, options)
    } catch (err) {
        console.log(err);
    }
}

async function verifyEmail(e) {
    e.preventDefault();
    console.log('verify email');
    try {
        const formData = Object.fromEntries(new FormData(e.target));
        formData.user_email = localStorage.getItem('email');
        console.log(formData);

        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }
        const res = await fetch(`${url}users/verify`, options)
        const data = await res.json()
        console.log(data);
        // window.location = './index.html'
    } catch (err) {
        console.log(`Error: ${err}`);
    }
}

function login(token, email){
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
    //     window.location = "./static/html/landing.html";
}
