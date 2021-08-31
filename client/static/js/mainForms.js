//get the button elements for habit forms
const openModalBtn = document.querySelector("#add-habit-btn");
const closeModalBtn = document.querySelector('.close-modal')
const habitModal = document.querySelector("#add-habit-modal");
const newHabitForm = document.querySelector('#add-habit-form');

//attach event listeners for habit forms
openModalBtn.addEventListener('click', e => showModal(e, true))
closeModalBtn.addEventListener('click', e => showModal(e, false))
newHabitForm.addEventListener('submit', e => handleHabitForm(e));

function showModal(e, show) {
    e.preventDefault();
    if (show) {
        habitModal.classList.remove("d-none");
        habitModal.classList.add("d-block");
    } else {
        habitModal.classList.add("d-none")
    }
}


let dummyHabit = {
    name: "habit",
    frequency: 1,
    priority: false,
    tag: 'health',
    startDate: '20/02/2012',
    highestStreak: 14
}
