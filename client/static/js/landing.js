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
            name: 'swimming',
            tag: 'sport',
            frequency: 1,
            datesCompleted: ['30-08-2021', '31-08-2021'],
            highestStreak: 5,
            priority: false
        }
]

// get all habits
//const allHabits = getAllHabits();

renderLandingView(dummyRes);

function renderLandingView(allHabits) {
    let priority = allHabits.filter(habit => habit.priority === true)

    priority.forEach(habit => {
        const habitCard = renderHabitCard(habit);
        // add habit to the top if it is a priority one
        let mainSection = document.querySelector('#main');
        if (habit.priority === true) {
            mainSection.insertBefore(habitCard, mainSection.firstChild);
        } else {
            mainSection.appendChild(habitCard);
        }
    });

    const cat = allHabits.map(habitObj => habitObj.tag);
    // render categories grid
    //
    //
}
