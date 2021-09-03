//--------FUNCTIONS FOR HANDLING MODALS, AVAILABLE TO ALL MODULES------------//

function closeModal(e) {
    e.preventDefault();
    // get the closest section tag (i.e. modal) and change bootstrap class
    const modal = e.target.closest('section');
    const form = e.target.closest('div').nextElementSibling;
    modal.classList.toggle("d-none");
    // if modal has a form, reset it
    if (form.nodeName === "FORM") { form.reset() }
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

const showEditModal = async (e) => {
    e.preventDefault();
    // get the closest section tag (i.e. modal)
    const newEditHabitModal = document.querySelector("#edit-habit-modal");
    newEditHabitModal.classList.remove("d-none");
    newEditHabitModal.classList.add("d-block");
    //get habit name and original habit data
    const name = e.target.closest('article').getAttribute('id');
    const oldHabit = await getOneByName(name);

    document.querySelector("input[name='submit-edit-habit']").value = 'Update Habit';
    document.querySelector('#edit-name').value = name;
    document.querySelector("#edit-tag").value = oldHabit.tag;
    document.querySelector("#edit-frequency").value = oldHabit.frequency;
    if (oldHabit.priority === true) {
        document.querySelector("#edit-priority").checked;
    }
    // add event listeners
    const habitForm = document.querySelector('#edit-habit-form');
    habitForm.addEventListener('submit', e => updateHabit(e, name));
    habitForm.reset();
    document.querySelector("#edit-priority").removeAttribute('checked');
}

function displayModalError(e, err) {
    const modal = e.target.closest('section');
    console.log(modal);
    const errorSpan = makeElement('span', { class: "error-msg" });
    errorSpan.innerText = err;
    modal.firstElementChild.append(errorSpan);
}
