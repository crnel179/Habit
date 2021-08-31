function closeModal(e) {
    e.preventDefault();
    // get the closest section tag (i.e. modal)
    const modal = e.target.closest('section');
    modal.classList.toggle("d-none");
}

function showNewHabitModal(e) {
    e.preventDefault();
    // get the closest section tag (i.e. modal)
    const newHabitModal = document.querySelector("#add-habit-modal");
    newHabitModal.classList.remove("d-none");
    newHabitModal.classList.add("d-block");
    // attach event listener to the form
    const newHabitForm = document.querySelector('#add-habit-form');
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





    // get the new habit form
    // const editHabitForm = document.querySelector('#edit-habit-form');


    // add event listeners
    // editHabitForm.addEventListener('submit', e => handleUpdateHabit(e));

}
