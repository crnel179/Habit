const url = "http://localhost:3000/";

// GET all habits
async function getAllHabits(e) {
    e.preventDefault();

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

// POST a new habit
async function handleHabitForm(e) {
    e.preventDefault()

    try {
        // retrieve data from the form
        let data = Object.fromEntries(new FormData(e.target));
        date = new Date;
        data.startDate = date.toString();
        const options = {
            method: 'POST',
            headers: new Headers({'Authorization': localStorage.getItem('token')})
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

// update a habit (PUT)
async function updateHabit(e, name, data) {
    e.preventDefault();

    try {
        const options = {
            method: 'PUT',
            headers: new Headers({'Authorization': localStorage.getItem('token')}),
            body: JSON.stringify(data);
        }
        const res = await fetch(`${url}habits/${name}`, options);
        const data = res.json();
        return data;
    } catch (err) {
        // handleError
        console.log(err);
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
