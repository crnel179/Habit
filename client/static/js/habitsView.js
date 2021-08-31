// add event listenrs for new-habit btn and for cloing the modals
const openModalBtn = document.querySelector("#add-habit-btn");
const closeModalBtn = document.querySelectorAll('.close-modal')
openModalBtn.addEventListener('click', e => showNewHabitModal(e))
closeModalBtn.forEach(btn => btn.addEventListener('click', e => closeModal(e)))

let dummyRes = [
        {
            name: 'running',
            tag: 'health',
            frequency: 1,
            datesCompleted: ['30-08-2021', '31-08-2021'],
            highestStreak: 2,
            priority: true
        },
    {
            name: 'meditating',
            tag: 'mental wellness',
            frequency: 3,
            datesCompleted: [],
            highestStreak: 0,
            priority: false
    }
]

const showHabitBody = (e) => {
    e.preventDefault();
    // get the div containing the habit body
    let habitBody = e.target.parentElement.nextElementSibling;
    // change bootstrap classes (d-none and d-block)
    if (habitBody.classList.contains('d-none')) {
        habitBody.classList.remove("d-none");
        habitBody.classList.add("d-block");
    } else {
        habitBody.classList.add("d-none")
    }
}

// data for rendering buttons on habit card
const btnFields = [
    ["show-more-btn", "bi-caret-down-fill", showHabitBody],
    ["edit-habit-btn", "bi-pencil", showEditModal],
    ["delete-habit-btn", "bi-trash", showDeleteModal]
]

// data for rendering p tags with habit info
const pFields = [
    ['tag', "Tag:"],
    ['startDate', "Start Date:"],
    ['priority', "Priority:"],
    ['frequency', "Frequency (times per day):"],
    ['highestStreak', "Highest streak:"]
]

// get all habits
//const allHabits = getAllHabits();

renderHabitsView(dummyRes);

function renderHabitsView(allHabits) {

    allHabits.forEach(habit => {
        // create article and two div tags
        const article = makeElement('article', {class: 'habit', id: `${habit.name}`})
        const headerDiv = makeElement('div', {class: "habit-header"})
        const bodyDiv = makeElement('div', {class: "d-none habit-body"})
        // add habit name to h1 tag and add it habit header div
        const h1 = document.createElement('h1');
        h1.innerText = `${habit.name}`;
        headerDiv.appendChild(h1);
        // create buttons and add them to habit header div
        btnFields.forEach(item => {
            let btn = makeElement('button', {type: 'button', class: `${item[1]}`, name: `${item[0]}`});
            btn.addEventListener('click', e => item[2](e))
            headerDiv.appendChild(btn);
        })
        // create p tags and add habit info
        pFields.forEach(item => {
            let p = document.createElement('p');
            p.innerText = `${item[1]} ${habit[item[0]]}`;
            bodyDiv.appendChild(p);
        });
        // add divs too article and article to the main section
        article.append(headerDiv, bodyDiv);
        let mainSection = document.querySelector('#main')
        mainSection.appendChild(article)
    })
}

function makeElement(element, atts) {
    //cutom function for making elements and adding attributes to them
    let newElement = document.createElement(`${element}`)
    for (let key in atts) {
        newElement.setAttribute(`${key}`, `${atts[key]}`)
    }
    return newElement;
}
