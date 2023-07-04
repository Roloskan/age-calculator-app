'use strict'
//On window load
window.addEventListener('load', function () {
    AOS.init();
});


const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');
const button = document.getElementById('btn-calculate');
const yearText = document.getElementById('year-text');
const monthText = document.getElementById('month-text');
const dayText = document.getElementById('day-text');
const pDay = document.getElementById('day-p');
const pMonth = document.getElementById('month-p');
const pYear = document.getElementById('year-p');
const lDay = document.getElementById('day-l');
const lMonth = document.getElementById('month-l');
const lYear = document.getElementById('year-l');


day.addEventListener('input', function () {
    day.classList.remove('error');
    pDay.classList.remove('error');
    lDay.classList.remove('error');
});

month.addEventListener('input', function () {
    month.classList.remove('error');
    pMonth.classList.remove('error');
    lMonth.classList.remove('error');
});

year.addEventListener('input', function () {
    year.classList.remove('error');
    pYear.classList.remove('error');
    lYear.classList.remove('error');
});

function calculate() {
    const dayValue = day.value;
    const monthValue = month.value;
    const yearValue = year.value;
    const now = new Date();
    const date = now.toString().split(' ');
    const dayNow = date[2];
    const monthNow = date[1];
    const yearNow = date[3];
    const monthToNumber = {
        "Jan": "01",
        "Feb": "02",
        "Mar": "03",
        "Apr": "04",
        "May": "05",
        "Jun": "06",
        "Jul": "07",
        "Aug": "08",
        "Sep": "09",
        "Oct": "10",
        "Nov": "11",
        "Dec": "12"
    };
    let monthNumber = monthToNumber[monthNow];
    let ageNow = yearNow - yearValue;
    let monthAge = 0;
    let dayAge = 0;

    const userDate = new Date(`${yearValue}-${monthValue}-${dayValue}`);
    const userYear = userDate.getFullYear();
    const userMonth = userDate.getMonth();
    const userDay = userDate.getDate();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const currentDay = now.getDate();


    if (dayValue == '' || monthValue == '' || yearValue == '') {
        if (dayValue == '') {
            day.setAttribute('class', 'error');
            pDay.setAttribute('class', 'error');
            pDay.innerText = 'This field is required';
            lDay.setAttribute('class', 'error');
        }
        if (monthValue == '') {
            month.setAttribute('class', 'error');
            pMonth.setAttribute('class', 'error');
            pMonth.innerText = 'This field is required';
            lMonth.setAttribute('class', 'error');
        }
        if (yearValue == '') {
            year.setAttribute('class', 'error');
            pYear.setAttribute('class', 'error');
            pYear.innerText = 'This field is required';
            lYear.setAttribute('class', 'error');
        }
        return;
    }


    if (dayValue < 1 || dayValue > 31) {
        day.setAttribute('class', 'error');
        pDay.setAttribute('class', 'error');
        pDay.innerText = 'Must be a valid day';
        lDay.setAttribute('class', 'error');
        return;
    }
    if (monthValue < 1 || monthValue > 12) {
        month.setAttribute('class', 'error');
        pMonth.setAttribute('class', 'error');
        pMonth.innerText = 'Must be a valid month';
        lMonth.setAttribute('class', 'error');
        return;
    }
    if (yearValue > yearNow) {
        year.setAttribute('class', 'error');
        pYear.setAttribute('class', 'error');
        pYear.innerText = 'Must be in the past';
        lYear.setAttribute('class', 'error');
        return;
    }
    const dayToValidate = (day, month, year) => {
        const dayToValidate = parseInt(day, 10);
        const monthToValidate = parseInt(month, 10);
        const yearToValidate = parseInt(year, 10);
        const validate = new Date(yearToValidate, monthToValidate - 1, dayToValidate);
        return (
            validate.getFullYear() === yearToValidate &&
            validate.getMonth() === monthToValidate - 1 &&
            validate.getDate() === dayToValidate
        );
    };
    const checkDay = dayToValidate(dayValue, monthValue, yearValue);
    if (!checkDay) {
        day.setAttribute('class', 'error');
        pDay.setAttribute('class', 'error');
        pDay.innerText = 'Must be a valid day';
        lDay.setAttribute('class', 'error');
        return;
    }



    if (currentMonth < userMonth) {
        ageNow--;
        monthAge = 12 - (userMonth - currentMonth);
    } else {
        monthAge = currentMonth - userMonth;
    }

    if (currentDay < userDay) {
        monthAge--;
        const daysInPreviousMonth = new Date(currentYear, currentMonth, 0).getDate();
        dayAge = daysInPreviousMonth - (userDay - currentDay);
    } else {
        dayAge = currentDay - userDay;
    }
    yearText.innerHTML = (ageNow === 1) ? `${ageNow} <span>year</span>` : `${ageNow} <span>years</span>`;
    monthText.innerHTML = (monthAge === 1) ? `${monthAge} <span>month</span>` : `${monthAge} <span>months</span>`;
    dayText.innerHTML = (dayAge === 1) ? `${dayAge} <span>day</span>` : `${dayAge} <span>days</span>`;
}