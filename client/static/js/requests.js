//-----------FUNCTIONS FOR MAKING API REQUESTS-----------------//

const url = "http://localhost:3030/";

// GET all habits
async function getAllHabits() {

    const options = {
        headers: new Headers({'Authorization': localStorage.getItem('token')})
    }
    try {
        const res = await fetch(`${url}habits`, options);
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
        // handleError;
    }
}

// GET a single habit by name
async function getOneByName(name) {

    const options = {
        headers: new Headers({'Authorization': localStorage.getItem('token')})
    }
    try {
        const res = await fetch(`${url}habits/${name}`, options);
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

// POST a new habit
async function handleCreateHabit(e) {
    e.preventDefault()

    try {
        // retrieve data from the form
        const data = Object.fromEntries(new FormData(e.target));
        const date = new Date;
        data.start_date = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        // data.user_email = "j@j.com";
        data.dates_completed = [];
        data.dayCount = {};
        data.highest_streak = 0;
        console.log(data);

        const options = {
            method: 'POST',
            headers: new Headers({'Authorization': localStorage.getItem('token')}),
            body: JSON.stringify(data)
        }
        const res = await fetch(`${url}habits`, options);
        closeModal();
        renderHabitsView();
    } catch (err) {
        console.log(err);
        displayModalError(e, err);
    }
}

// edit a habit (PUT)
async function updateHabit(e, name) {
    e.preventDefault();

    try {
        const formData = Object.fromEntries(new FormData(e.target));

        console.log(formData);
        const options = {
            method: 'PUT',
            headers: new Headers({'Authorization': localStorage.getItem('token')}),
            body: JSON.stringify(formData)
        }
        const res = await fetch(`${url}habits/${name}`, options);
        const data = res.json();
        return data;
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

    try {
        const options = {
            method: 'PUT',
            headers: new Headers({'Authorization': localStorage.getItem('token')}),
            body: JSON.stringify({user_email: ''})
        }

        const res = await fetch(`${url}habits/${name}/${count}`, options);
        // const data = res.json();
        span.innerText = `${count}/${split[1]}`;
        if (parseInt(split[0]) === parseInt(split[1])) {
            //disable button
        }
    } catch (err) {
        console.log(err);
    }
}

// DELETE a habit
async function deleteHabit(e, name) {
    e.preventDefault();

    try {
        const options = {
            method: 'DELETE',
            headers: new Headers({'Authorization': localStorage.getItem('token')}),
            body: JSON.stringify({user_email: ''})
        }
        console.log(name);
        const res = await fetch(`${url}habits/${name}`, options);
        const data = res.json();
        // return data;
    } catch (err) {
        console.log(err);
        displayModalError(e, err);
    }
}
