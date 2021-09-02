//-----------FUNCTIONS FOR MAKING API REQUESTS-----------------//

const url = "http://localhost:3030/";

async function getAllHabits() {
    // GET all habits
    const options = {
        headers: new Headers({'Authorization': sessionStorage.getItem('token')})
    }
    try {
        const user_email = localStorage.getItem('email');
        console.log(user_email);
        const res = await fetch(`${url}habits/${user_email}`, options);
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
        // handleError;
    }
}

async function getOneByName(name) {
    // GET a single habit by name
    const options = {
        headers: new Headers({'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'})
    }
    try {
        const user_email = localStorage.getItem('email');
        const res = await fetch(`${url}habits/${user_email}/${name}`, options);
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

async function handleCreateHabit(e) {
    e.preventDefault()
    // POST a new habit
    try {
        // retrieve data from the form
        const data = Object.fromEntries(new FormData(e.target));
        const date = new Date;
        data.start_date = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        data.dates_completed = [];
        data.dayCount = {};
        data.highest_streak = 0;
        const user_email = localStorage.getItem('email');
        console.log(data);

        const options = {
            method: 'POST',
            headers: new Headers({'Authorization': localStorage.getItem('token'),
                        'Content-Type': 'application/json'}),
            body: JSON.stringify(data)
        }
        const res = await fetch(`${url}habits/${user_email}`, options);
        closeModal();
        renderHabitsView();
    } catch (err) {
        console.log(err);
        displayModalError(e, err);
    }
}

async function updateHabit(e, name) {
    e.preventDefault();
    // edit a habit (PUT)
    try {
        const formData = Object.fromEntries(new FormData(e.target));

        console.log(formData);
        const user_email = localStorage.getItem('email');

        const options = {
            method: 'PUT',
            headers: new Headers({'Authorization': localStorage.getItem('token'),
                        'Content-Type': 'application/json'}),
            body: JSON.stringify(formData)
        }
        const res = await fetch(`${url}habits/${user_email}/${name}`, options);
        const data = res.json();
        // return data;
        //if successful, close modal and refresh view
        closeModal(e);
        renderHabitsView();
    } catch (err) {
        console.log(err);
        displayModalError(e, err);
    }
}

// update the daily complition (PUT)
async function updateCompletion(e, name) {
    e.preventDefault();
    // get and increment the count
    const span = e.target.nextElementSibling;
    const split = span.innerText.split('/');
    const count = parseInt(split[0]) + 1;
    const user_email = localStorage.getItem('email');

    try {
        const options = {
            method: 'PUT',
            headers: new Headers({'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'}),
            body: JSON.stringify({user_email: ''})
        }

        const res = await fetch(`${url}habits/${user_email}/${name}/${count}`, options);
        // const data = res.json();
        span.innerText = `${count}/${split[1]}`;
        if (parseInt(split[0]) === parseInt(split[1])) {
            //disable button
        }
    } catch (err) {
        console.log(err);
    }
}

async function deleteHabit(e, name) {
    e.preventDefault();
    // DELETE a habit
    try {
        const user_email = localStorage.getItem('email');
        const options = {
            method: 'DELETE',
            headers: new Headers({'Authorization': localStorage.getItem('token'),
                        'Content-Type': 'application/json'})
        }
        console.log(name);
        const res = await fetch(`${url}habits/${user_email}/${name}`, options);
        const data = res.json();
        // return data;
    } catch (err) {
        console.log(err);
        displayModalError(e, err);
    }
}
