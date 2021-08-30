const openModalBtn = document.querySelector("#add-habit-btn");
const closeModalBtn = document.querySelector('.close-modal')
const addHabitModal = document.querySelector("#add-habit-modal");

openModalBtn.addEventListener('click', e => {
    e.preventDefault()
    addHabitModal.classList.remove("d-none");
    addHabitModal.classList.add("d-block")
    // addHabitModal.style.display = "block"
})

closeModalBtn.addEventListener('click', e => {
    e.preventDefault();
    addHabitModal.classList.add("d-none")
})

document.querySelector('#add-habit-form').addEventListener('submit', e => {
    e.preventDefault();
    console.log(e.target.freq[0].checked);
})
