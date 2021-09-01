// add event listeners for new-habit btn and for cloing the modals
const openModalBtn = document.querySelector("#add-habit-btn");
const closeModalBtn = document.querySelectorAll('.close-modal')
openModalBtn.addEventListener('click', e => showNewHabitModal(e))
closeModalBtn.forEach(btn => btn.addEventListener('click', e => closeModal(e)))


let dummyRes = [
    {
        name: 'meditating',
        tag: 'mental wellness',
        frequency: 3,
        datesCompleted: [],
        highestStreak: 0,
        priority: false
    },
        {
            name: 'running',
            tag: 'health',
            frequency: 1,
            datesCompleted: ['30-08-2021', '31-08-2021'],
            highestStreak: 2,
            priority: true
        },
        {
            name: 'jogging',
            tag: 'health',
            frequency: 1,
            datesCompleted: ['30-08-2021', '31-08-2021'],
            highestStreak: 2,
            priority: false
        },
        {
            name: 'swimming',
            tag: 'sport',
            frequency: 1,
            datesCompleted: ['30-08-2021', '31-08-2021'],
            highestStreak: 5,
            priority: false
        },
        {
            name: 'drinking water',
            tag: 'welness',
            frequency: 3,
            datesCompleted: ['30-08-2021', '31-08-2021'],
            highestStreak: 7,
            priority: false
        }
]

const category = window.location.hash.substring(1);
category ? renderHabitsView(category): renderHabitsView();

//
// renderHabitsView(dummyRes);

async function renderHabitsView(filter=null) {
    // get all habits
    //const allHabits = await getAllHabits();
    let allHabits = dummyRes;

    if (filter) {
        allHabits = dummyRes.filter(i => i.tag === `${filter}`);
    }

    allHabits.forEach(habit => {
        const habitCard = renderHabitCard(habit);
        // add habit to the top if it is a priority one
        let mainSection = document.querySelector('#main');
        if (habit.priority === true) {
            mainSection.insertBefore(habitCard, mainSection.firstChild);
        } else {
            mainSection.appendChild(habitCard);
        }
    });
}
