//-----------------SCRIPTS THAT ARE RUN ON LOADING landing.html PAGE ---------//

function getCookies() {

    const cookies = document.cookie.split('; ');
    console.log(cookies[5]);
    let n = cookies.filter(cookie => cookie.startsWith('email').split('='))
    let em = n[1]
    console.log(em);
    const email = cookies.find(row => row.startsWith('email=')).split('=')[1];
    const token = cookies.find(row => row.startsWith('token=')).split('=')[1];
    return email, token;
}

// delete cookies by changing expiry date
// document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; ";
//
// console.log(getCookies());

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
