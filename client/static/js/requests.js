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
        // handleError;
    }
}

// POST a new habit
async function handleCreateHabit(e) {
    e.preventDefault()

    try {
        // retrieve data from the form
        let data = Object.fromEntries(new FormData(e.target));
        date = new Date;
        data.startDate = date.toString();
        const options = {
            method: 'POST',
            headers: new Headers({'Authorization': localStorage.getItem('token')}),
            body: JSON.stringify(data)
        }
        const res = await fetch(`${url}habits`, options);
        // display confirmation message if request was successful
        //
        //
    } catch (err) {
        console.log(err);
        // handle error
    }
}

// edit a habit (PUT)
async function updateHabit(e, name) {
    e.preventDefault();

    try {
        const options = {
            method: 'PUT',
            headers: new Headers({'Authorization': localStorage.getItem('token')}),
            body: JSON.stringify(data)
        }
        const res = await fetch(`${url}habits/${name}`, options);
        const data = res.json();
        return data;
    } catch (err) {
        // handleError
        console.log(err);
    }
}

// update the daily complition (PUT)
async function updateCompletion(e, name) {
    e.preventDefault();

    try {
        const options = {
            method: 'PUT',
            headers: new Headers({'Authorization': localStorage.getItem('token')}),
            body: JSON.stringify(data)
        }
        /// endpoint ??????? and data ??????
        //const res = await fetch(`${url}habits/${name}`, options);
        // const data = res.json();
        // return data;
    } catch (err) {
        // handleError
        console.log(err);
    }
}

// DELETE a habit
async function deleteHabit(e, name) {
    e.preventDefault();

    try {
        const options = {
            method: 'DELETE',
            headers: new Headers({'Authorization': localStorage.getItem('token')})
        }
        const res = await fetch(`${url}habits/${name}`, options);
        const data = res.json();
        return data;
    } catch (err) {
        // handleError
        console.log(err);
    }
}
