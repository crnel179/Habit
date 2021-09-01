//---------MISCALLENAOUS FUNCTIONS ADN DATA, AVAILABLE TO MODULES-----------//

const showHabitBody = (e) => {
    e.preventDefault();
    // get the div containing the habit body
    const id = e.target.closest('article').id;
    let habitBody = document.querySelector(`article[id=${id}] > div[id='habit-body']`);
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


function renderHabitCard(habit) {
        // create article and two div tags
        const article = makeElement('article', {class: 'habit', id: `${habit.name}`})
        const headerDiv = makeElement('div', {class: "habit-header"})
        const statusDiv = habitStatusDiv(habit);
        let bodyDiv;
        // if habit is a priority one, make the body visible
        if (habit.priority === true) {
            bodyDiv = makeElement('div', {class: "d-block habit-body",  id: "habit-body"})
        } else {
            bodyDiv = makeElement('div', {class: "d-none habit-body", id: "habit-body"})
        }
        // add habit name to h1 tag and add it to habit header div
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
        // add divs to article
        article.append(headerDiv, statusDiv, bodyDiv);
        return article;
}

function habitStatusDiv(habit) {
    // create div with info about daily completion of the status
    const div = makeElement('div', {class: "status-div", type: "button"})
    // create button and add event listener
    const countBtn = makeElement('btn', {class:"count-btn"});
    countBtn.innerText = "Mark as complete";
    countBtn.addEventListener('click', e => updateCompletion(e, habit.name))
    // create span for displaying the count
    const countSpan = makeElement('span', {class: "daily-count"});
    countSpan.innerText = `${habit.dailyCount}/${habit.frequency}`;
    div.append(countBtn, countSpan);
    return div;
}

function makeElement(element, atts) {
    //cutom function for making elements and adding attributes to them
    let newElement = document.createElement(`${element}`)
    for (let key in atts) {
        newElement.setAttribute(`${key}`, `${atts[key]}`)
    }
    return newElement;
}

function logout(){
    localStorage.clear();
    // window.location =
}

function currentUser(){
    const username = localStorage.getItem('username')
    return username;
}
