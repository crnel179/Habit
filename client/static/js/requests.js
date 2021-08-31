// GET all habits request
// async function getAllHabits() {
//
// }


// POST a new habit
async function handleHabitForm(e) {
    e.preventDefault()
    try {
        let data = Object.fromEntries(new FormData(e.target));
        data.startDate = new Date;
        const options = {
            method: 'POST',
            headers: new Headers({'Authorization': localStorage.getItem('token')}),
            body: JSON.stringify(data)
        }
        const res = await fetch(url, options);
        // display confirmation message if request was successful
        //
        //
        // e.target.reset()
    } catch (err) {
        // handle error
        console.log(err);
    }
}


// DELETE habit request
