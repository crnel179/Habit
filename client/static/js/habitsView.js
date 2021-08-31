let dummyHabit = {
    name: "habit",
    frequency: 1,
    priority: false,
    tag: 'health',
    startDate: '20/02/2012',
    highestStreak: 14
}

const showMoreBtn = document.querySelector("button[name='show-more-btn']")

showMoreBtn.addEventListener('click', e => showHabitBody(e))

function showHabitBody(e) {
    e.preventDefault();
    const habitBody = e.target.parentElement.nextElementSibling;
    habitBody.style.display = "block";
}

function renderHabitsView(data) {

}
