//-----------------SCRIPTS THAT ARE RUN ON LOADING landing.html PAGE ---------//

let dummyRes = [
    {
        name: 'meditating',
        tag: 'mental wellness',
        frequency: 3,
        datesCompleted: [],
        highestStreak: 0,
        priority: false,
        dailyCount: 2
    },
        {
            name: 'running',
            tag: 'health',
            frequency: 6,
            datesCompleted: ['30-08-2021', '31-08-2021'],
            highestStreak: 2,
            priority: true,
            dailyCount: 2
        },
        {
            name: 'jogging',
            tag: 'health',
            frequency: 2,
            datesCompleted: ['30-08-2021', '31-08-2021'],
            highestStreak: 2,
            priority: false,
            dailyCount: 2
        },
        {
            name: 'swimming',
            tag: 'sport',
            frequency: 1,
            datesCompleted: ['30-08-2021', '31-08-2021'],
            highestStreak: 5,
            priority: false,
            dailyCount: 0
        },
        {
            name: 'drinking water',
            tag: 'welness',
            frequency: 3,
            datesCompleted: ['30-08-2021', '31-08-2021'],
            highestStreak: 7,
            priority: false,
            dailyCount: 0
        }
]

// get all habits
//const allHabits = getAllHabits();

renderLandingView(dummyRes);

function renderLandingView(allHabits) {
    let priority = allHabits.filter(habit => habit.priority === true)

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

    const categories = new Set(allHabits.map(habitObj => habitObj.tag));

    [...categories].forEach((category, i) => {

        const col = makeElement('div', { class: "col-4"});
        const link = makeElement('a', {href: `./habitsView.html#${category}`})
        link.innerText = category;
        col.appendChild(link)
        const container = document.querySelector("div[class='container']")

        if (i % 3 === 0) {
            const newRow = makeElement('div', {class: "row"});
            container.appendChild(newRow);
        }
        container.lastChild.appendChild(col);
    })
}
