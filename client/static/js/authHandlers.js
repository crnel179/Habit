//-----------FUNCTIONS FOR AUTHNETICATION REQUESTS AND HANDLING AUTH-----------//
// accessible only for index.html

const url = 'http://localhost:3000/'

async function requestLogin(e){
    e.preventDefault();
    try {
        const formData = Object.fromEntries(new FormData(e.target));
        console.log(formData);
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }
        const res = await fetch(`${url}users/login`, options)
        const data = await res.json()
        if (data.err){ throw Error(data.err); }
        login(data);
    } catch (err) {
        console.warn(`Error: ${err}`);
    }
}

async function requestRegistration(e) {
    e.preventDefault();
    try {
        const formData = Object.fromEntries(new FormData(e.target));
        console.log(formData);
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }
        const r = await fetch(`${url}users/register`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err) }
        requestLogin(e);
    } catch (err) {
        console.warn(err);
    }
}

function login(data){
    localStorage.setItem('username', data.user);
    //     window.location = "./static/html/landing.html";
}
