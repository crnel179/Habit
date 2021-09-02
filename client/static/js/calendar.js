// navigation through months (keeps track of the selected month)
let nav = 0;
// the day clicked on
let clicked = null;
// places events into local storage before trying to parse it out
// CHANGE TO DATABASE
let habits = localStorage.getItem("habits")
    ? JSON.parse(localStorage.getItem("habits"))
    : [];

const calendar = document.querySelector("#calendar");
const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

function load() {
    const date = new Date();

    // sets the value of the month (to be displayed) according to nav
    if (nav !== 0) {
        date.setMonth(new Date().getMonth() + nav);
    }

    // get the data out of the Date object
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    // storing the first day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    // storing the last day of the previous month
    const monthDays = new Date(year, month + 1, 0).getDate();
    // storing the UK date format to display the current day and date
    const dateString = firstDayOfMonth.toLocaleDateString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });

    // calculating padding days by calculating the current day of the week
    const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);
    // displays the long name of the month
    document.querySelector(
        "#displayMonth"
    ).textContent = `${date.toLocaleDateString("en-GB", {
        month: "long",
    })} ${year}`;

    // resets the calendar
    calendar.textContent = "";

    for (let i = 1; i <= paddingDays + monthDays; i++) {
        // create the box for the day
        const dayBox = document.createElement("div");
        dayBox.classList.add("day");

        // runs a day square if greater than padding days and padding square if less or equal than padding days
        if (i > paddingDays) {
            // display the date within the day square
            dayBox.textContent = i - paddingDays;
        } else {
            // differentiates the style compared to day squares in the css
            dayBox.classList.add("padding");
        }

        calendar.appendChild(dayBox);
    }
}

function buttons() {
    // on click event listener for the next button to display the next month
    document.querySelector("#nextBtn").addEventListener("click", () => {
        nav++;
        load();
    });

    // on click event listener for the back button to display the previous month
    document.querySelector("#backBtn").addEventListener("click", () => {
        nav--;
        load();
    });
}

buttons();
load();


// function makeElement(element, atts) {
//     //cutom function for making elements and adding attributes to them
//     let newElement = document.createElement(`${element}`)
//     for (let key in atts) {
//         newElement.setAttribute(`${key}`, `${atts[key]}`)
//     }
//     return newElement;
// }