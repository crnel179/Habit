//get the button elements
const openModalBtn = document.querySelector("#add-habit-btn");
const closeModalBtn = document.querySelector('.close-modal')
const habitModal = document.querySelector("#add-habit-modal");

openModalBtn.addEventListener('click', e => showModal(e, true))
closeModalBtn.addEventListener('click', e => showModal(e, false))

function showModal(e, show) {
    e.preventDefault();
    if (show) {
        habitModal.classList.remove("d-none");
        habitModal.classList.add("d-block");
    } else {
        habitModal.classList.add("d-none")
    }
}
