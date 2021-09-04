const input = document.querySelector("input");
const sumbitButton = document.querySelector("button");
const outputDiv = document.querySelector("#output");
const loader = document.querySelector(".loader");

let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
sumbitButton.addEventListener("click", () => {
  const birthDate = input.value;

  if (birthDate !== "") {
    let dateArray = birthDate.split("-");

    let date = {
      day: Number(dateArray[2]),
      month: Number(dateArray[1]),
      year: Number(dateArray[0])
    };
    let dateString = getDateAsString(date);
    let dateList = checkPalindrome(dateString);
    let flag = false;

    dateList.forEach((date) => {
      if (date) {
        return (flag = true);
      }
    });

    if (!flag) {
      const [count1, nextDate] = nextPalindromeDate(date);
      const [count2, prevDate] = prevPalindromeDate(date);

      if (count1 > count2) {
        showLoader();
        showMessage(
          `The nearest palindrome date was on ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${count2} days.`
        );
      } else {
        showLoader();
        showMessage(
          `The nearest palindrome date will be on ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${count1} days.`
        );
      }
    } else {
      showLoader();
      showMessage(`Yay! Your birthday is a Palindrome.`);
    }
  } else {
    showMessage(`Please enter your birthdate`);
  }
});

function isStringPalindrome(date) {
  let reversedString = date.split("").reverse().join("");
  return date === reversedString;
}

function getAllDateFormats(date) {
  let ddmmyyyy = date.day + date.month + date.year;
  let mmddyyyy = date.month + date.day + date.year;
  let yyyymmdd = date.year + date.month + date.day;
  let ddmmyy = date.day + date.month + date.year.slice(-2);
  let mmddyy = date.month + date.day + date.year.slice(-2);
  let yyddmm = date.year.slice(-2) + date.day + date.month;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function checkPalindrome(date) {
  let dateFormatList = getAllDateFormats(date);
  let palindromeList = [];

  dateFormatList.forEach((dateItem) => {
    let result = isStringPalindrome(dateItem);
    palindromeList.push(result);
  });
  return palindromeList;
}

function getDateAsString(date) {
  var dateInStr = {
    day: "",
    month: "",
    year: ""
  };

  if (date.day < 10) {
    dateInStr.day = "0" + date.day;
  } else {
    dateInStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateInStr.month = "0" + date.month;
  } else {
    dateInStr.month = date.month.toString();
  }

  dateInStr.year = date.year.toString();
  return dateInStr;
}
function isLeapYear(year) {
  let yearInNum = Number(year);
  if (yearInNum % 400 === 0) return true;
  if (yearInNum % 100 === 0) return false;
  if (yearInNum % 4 === 0) return true;
  return false;
}
function getPreviousDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  if (day === 0) {
    month--;

    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    } else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = daysInMonth[month - 1];
    }
  }

  return {
    day,
    month,
    year
  };
}
function prevPalindromeDate(date) {
  let previousDate = getPreviousDate(date);
  let counter = 0;

  while (1) {
    counter++;
    var dateStr = getDateAsString(previousDate);
    var resultList = checkPalindrome(dateStr);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        console.log("prevDate", counter);
        return [counter, previousDate];
      }
    }
    previousDate = getPreviousDate(previousDate);
  }
}

function getNextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day,
    month,
    year
  };
}
function nextPalindromeDate(date) {
  let nextDate = getNextDate(date);
  let counter = 0;
  while (1) {
    counter++;
    let dateString = getDateAsString(nextDate);
    let resultList = checkPalindrome(dateString);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        console.log("nextDate", counter);
        return [counter, nextDate];
      }
    }
    nextDate = getNextDate(nextDate);
  }
}

function showLoader() {
  loader.style.display = "block";
  outputDiv.style.display = "none";
  setTimeout(() => {
    loader.style.display = "none";
    outputDiv.style.display = "block";
  }, 500);
}

function showMessage(message) {
  outputDiv.innerText = message;
}
