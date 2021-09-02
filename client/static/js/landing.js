//-----------------SCRIPTS THAT ARE RUN ON LOADING landing.html PAGE ---------//



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

renderLandingView();

async function renderLandingView() {
    // get all habits and convert them to array
    const allHabits = await getAllHabits();
    let habitsArr = Object.values(allHabits).map(habit => habit);
    let priority = habitsArr.filter(habit => habit.priority === true)
    //display priority habit card
    priority.forEach(habit => {
        const habitCard = renderHabitCard(habit, landing=true);
        // add habit to the top if it is a priority one
        let mainSection = document.querySelector('#main');
        if (habit.priority === true) {
            mainSection.insertBefore(habitCard, mainSection.firstChild);
        } else {
            mainSection.appendChild(habitCard);
        }
    });
    renderCategories(habitsArr);
}

function renderCategories(habitsArr) {
    // get unique categories
    const categories = new Set(habitsArr.map(habitObj => habitObj.tag));
    // add ech cateogry as link in div
    [...categories].forEach((category, i) => {
        const col = makeElement('div', { class: "col-4"});
        const link = makeElement('a', {href: `./habitsView.html#${category}`})
        link.innerText = category;
        col.appendChild(link)
        const container = document.querySelector("div[class='container']")
        // every three categories, add a new row
        if (i % 3 === 0) {
            const newRow = makeElement('div', {class: "row"});
            container.appendChild(newRow);
        }
        container.lastChild.appendChild(col);
    })
}
