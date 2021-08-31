function closeModal(e) {
    e.preventDefault();
    // get the closest section tag (i.e. modal)
    const modal = e.target.closest('section');
    modal.classList.toggle("d-none");
}

function showNewHabitModal(e) {
    e.preventDefault();
    // get the closest section tag (i.e. modal)
    const newHabitModal = document.querySelector("#habit-modal");
    newHabitModal.classList.remove("d-none");
    newHabitModal.classList.add("d-block");
    // attach event listener to the form
    const newHabitForm = document.querySelector('#habit-form');
    newHabitForm.addEventListener('submit', e => handleCreateHabit(e));
}

const showDeleteModal = (e) => {
    // get modal and show it by changing boostrap class
    const delModal = document.querySelector('#delete-habit-modal')
    delModal.classList.remove("d-none");
    delModal.classList.add("d-block");
    //get habit name and add display on the modal
    const name = e.target.closest('article').getAttribute('id');
    document.querySelector('#confirm-delete').innerText = name;
    // get the 'Yes' and 'No' btns and add event listeners
    const yesBtn = document.querySelector("button[name='delete-yes']")
    const noBtn = document.querySelector("button[name='delete-no']")
    yesBtn.addEventListener('click', e => deleteHabit(e, name));
    noBtn.addEventListener('click', e => closeModal(e));
}

const showEditModal = (e) => {
    e.preventDefault();
    // get the closest section tag (i.e. modal)
    const newEditHabitModal = document.querySelector("#edit-habit-modal");
    newEditHabitModal.classList.remove("d-none");
    newEditHabitModal.classList.add("d-block");
    //get habit name and original habit data
    const name = e.target.closest('article').getAttribute('id');

    // const oldHabit = getOneByName(name);
    let oldHabit = {
        name: 'running',
        tag: 'health',
        frequency: 1,
        datesCompleted: ['30-08-2021', '31-08-2021'],
        highestStreak: 2,
        priority: false
    }
    // add data for original habit as placeholders
    document.querySelector("input[name='submit-edit-habit']").value = 'Update Habit';
    document.querySelector('#edit-name').placeholder = name;
    document.querySelector("#edit-tag").placeholder = oldHabit.tag;
    document.querySelector("#edit-frequency").placeholder = oldHabit.frequency;
    if (oldHabit.priority === true) {
        document.querySelector("#edit-priority").checked;
    }
    // add event listeners
    const habitForm = document.querySelector('#edit-habit-form');
    habitForm.addEventListener('submit', e => updateHabit(e, name));
    habitForm.reset();
    document.querySelector("#edit-priority").removeAttribute('checked');
}
