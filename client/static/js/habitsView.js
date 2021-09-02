//------------SCRIPTS THAT ARE RUN ON LOADING THE habitView.html PAGE -------------//

// add event listeners for new-habit btn and for cloing the modals
const openModalBtn = document.querySelector("#add-habit-btn");
const closeModalBtn = document.querySelectorAll('.close-modal')
openModalBtn.addEventListener('click', e => showNewHabitModal(e))
closeModalBtn.forEach(btn => btn.addEventListener('click', e => closeModal(e)))

localStorage.setItem('email', 'jon@snow.com')

//
// let dummyRes = [
//     {
//         name: 'meditating',
//         tag: 'mental wellness',
//         frequency: 3,
//         datesCompleted: [],
//         highestStreak: 0,
//         priority: false,
//         dailyCount: 2
//     },
//         {
//             name: 'running',
//             tag: 'health',
//             frequency: 6,
//             datesCompleted: ['30-08-2021', '31-08-2021'],
//             highestStreak: 2,
//             priority: true,
//             dailyCount: 2
//         },
//         {
//             name: 'jogging',
//             tag: 'health',
//             frequency: 2,
//             datesCompleted: ['30-08-2021', '31-08-2021'],
//             highestStreak: 2,
//             priority: false,
//             dailyCount: 2
//         },
//         {
//             name: 'swimming',
//             tag: 'sport',
//             frequency: 1,
//             datesCompleted: ['30-08-2021', '31-08-2021'],
//             highestStreak: 5,
//             priority: false,
//             dailyCount: 0
//         },
//         {
//             name: 'drinking water',
//             tag: 'welness',
//             frequency: 3,
//             datesCompleted: ['30-08-2021', '31-08-2021'],
//             highestStreak: 7,
//             priority: false,
//             dailyCount: 0
//         }
// ]

// get the category of habits to be displayed and replace '%20' with spaces
const category = window.location.hash.substring(1);
let correctCat = category.replace(/%20/g, ' ');
correctCat ? renderHabitsView(correctCat): renderHabitsView();

async function renderHabitsView(filter=null) {
    // get all habits and convert them to array
    const allHabits = await getAllHabits();
    let habitsArr = Object.values(allHabits).map(habit => habit);
    // if filter is truthy get only habits with a specified tag
    if (filter) {
        habitsArr = dummyRes.filter(i => i.tag === `${filter}`);
    }
    // render a card for each habit
    habitsArr.forEach(habit => {
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
