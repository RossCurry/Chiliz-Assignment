/*
 * Your program must print string with the number of years and months and the total number of days between the dates.
 * Dates are provided in dd.mm.yyyy format.
 * You are not allowed to plug in JS libraries such as moment.js or date-fns directly into the code. All code need to be written in this file.
 * 
 * Result must be shown as a string in years, months and total days. If years or months are 0, then it should not be displayed in the output.
 *
 * Example:
 * Input: ['01.01.2000', '01.01.2016']
 * Output:
 * '16 years, total 5844 days'
 *
 * Example 2:
 * Input: ['01.11.2015', '01.02.2017']
 *
 * Output:
 * '1 year, 3 months, total 458 days'
*/
const dates = [
    ['01.01.2000', '01.01.2016'],
    ['01.01.2016', '01.08.2016'],
    ['01.11.2015', '01.02.2017'],
    ['17.12.2016', '16.01.2017'],
    ['01.01.2016', '01.01.2016'],
    ['28.02.2015', '13.04.2018'],
    ['28.01.2015', '28.02.2015'],
    ['17.03.2022', '17.03.2023'],
    ['17.02.2024', '17.02.2025'],
];

const months = {
    "01": 'January',
    "02": 'February',
    "03": 'March',
    "04": 'April',
    "05": 'May',
    "06": 'June',
    "07": 'July',
    "08": 'August',
    "09": 'September',
    "10": 'Octuber',
    "11": 'November',
    "12": 'December',
}

// Receive string of dates one after each other
function outputDate(dates) {
    const dateArrInMilliseconds = [];
    const dayArr = [];
    const monthArr = [];
    const yearArr = [];
    for (let i = 0; i < dates.length; i++) {
        const date = dates[i];

        const miliseconds = convertToMilliseconds(date);
        dateArrInMilliseconds.push(miliseconds);
        
        const [days, months, years] = divideDates(date);
        dayArr.push(days);
        monthArr.push(months);
        yearArr.push(years);

    }
    const differenceInMilliseconds = dateArrInMilliseconds[1] - dateArrInMilliseconds[0];
    const months = calculateMonthDifference(dayArr, monthArr, yearArr);
    const [days, years] = calculateDaysAndYears(differenceInMilliseconds);
    const yearString = years ? `${years} year${pluralOrSingular(years)}, ` : '';
    const monthString = months ? `${months} month${pluralOrSingular(months)}, ` : '';
    const dayString = days ? `${days} day${pluralOrSingular(days)}` : '0 days';
    const result = `${yearString}${monthString}total ${dayString}`;
    return result;
}

function calculateDaysAndYears(milliseconds) {
    const seconds = milliseconds/1000;
    const minutes = seconds/60;
    const hours = minutes/60;
    const days = Math.ceil(hours/24);
    const years = Math.floor(days/365);
    return [days, years, months];
}


function calculateMonthDifference(dayArr, monthArr, yearArr) {
    const dayDiff = dayArr[1] - dayArr[0];
    const yearDiff = yearArr[1] - yearArr[0];
    if (yearDiff === 0) {
        return monthArr[1] - monthArr[0];
    } else if  (yearDiff > 0 && monthArr[1] >= monthArr[0]) {
        const difference = monthArr[1] - monthArr[0];
        if (dayDiff < 0) return difference - 1;
        else return difference;
    } else if  (yearDiff > 0 && monthArr[1] < monthArr[0]) {
        const difference = monthArr[1] + 12 - monthArr[0];
        if (dayDiff < 0) return difference - 1;
        else return difference;
    }
}

// helper functions
function convertToMilliseconds(ddmmyyyy) {
    const dividedDates = ddmmyyyy.split('.');
    dividedDates[1] = months[dividedDates[1]];
    const joinedDates = dividedDates.join(' ');
    const dateObj = new Date(joinedDates);
    const dateInMillis = dateObj.valueOf();
    return dateInMillis;
}

function divideDates(date) {
    const dividedDay = date.split('.')[0];
    const dividedMonth = date.split('.')[1];
    const dividedYear = date.split('.')[2];
    return [+dividedDay, +dividedMonth, +dividedYear];
}

function pluralOrSingular(number) {
    return number > 1 ? 's' : '';
}
