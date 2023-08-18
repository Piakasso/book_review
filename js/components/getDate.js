const bookDates = document.querySelector(".book__date"),
  startDateButton = document.querySelector(".startdate__date"),
  finishDateButton = document.querySelector(".finishdate__date"),
  chooseStartDate = document.querySelector("#start-calendar"),
  chooseFinishDate = document.querySelector("#finish-calendar");

export function addDates() {
  let finishDate = Date.now();
  let startDate = finishDate - 604800000;

  if (localStorage.getItem("startDate")) {
    startDateButton.textContent = `${makeDotDate(
      localStorage.getItem("startDate")
    )}`;
  } else {
    startDateButton.textContent = `${calcDate(startDate)}`;
  }

  if (localStorage.getItem("finishDate")) {
    finishDateButton.textContent = `${makeDotDate(
      localStorage.getItem("finishDate")
    )}`;
  } else {
    finishDateButton.textContent = `${calcDate(finishDate)}`;
  }

  function makeDotDate(str) {
    let arr = str.split("-");
    let strDate = `${arr[2]}.${arr[1]}.${arr[0]}`;
    return strDate;
  }

  function calcDate(data) {
    let date = new Date(data);
    let year = date.getFullYear(),
      month =
        +date.getMonth() + 1 <= 9
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1,
      day = date.getDate() <= 9 ? "0" + date.getDate() : date.getDate();
    return `${day}.${month}.${year}`;
  }
}

export function getDateFromCalendar() {
  let finishDate = Date.now();
  let startDate = finishDate - 604800000;

  function calcDate(data) {
    let date = new Date(data);
    let year = date.getFullYear(),
      month =
        +date.getMonth() + 1 <= 9
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1,
      day = date.getDate() <= 9 ? "0" + date.getDate() : date.getDate();
    return `${day}.${month}.${year}`;
  }

  function countMillisec(strDate) {
    let arr = strDate.split("."),
      newArr = [arr[1], arr[0], arr[2]];
    newArr = new Date(newArr).getTime();
    return newArr;
  }

  //Choose dates

  const options = {
    actions: {
      clickDay(e, dates) {
        chooseStartDate.classList.add("_hide");
        startDateButton.textContent = `${calcDate(new Date(dates))}`;
        localStorage.setItem("startDate", dates);
      },
    },
    settings: {
      visibility: {
        theme: "dark",
      },
    },
  };
  const startCalendar = new VanillaCalendar("#start-calendar", options);
  startCalendar.init();

  const finishOptions = {
    actions: {
      clickDay(e, dates) {
        chooseFinishDate.classList.add("_hide");
        finishDateButton.textContent = `${calcDate(new Date(dates))}`;
        localStorage.setItem("finishDate", dates);
        if (
          countMillisec(startDateButton.textContent) >
          countMillisec(finishDateButton.textContent)
        ) {
          startDateButton.textContent = `${calcDate(startDate)}`;
          finishDateButton.textContent = `${calcDate(finishDate)}`;
          localStorage.removeItem("startDate");
          localStorage.removeItem("finishDate");
        }
      },
    },
    settings: {
      visibility: {
        theme: "dark",
      },
    },
  };

  const finishCalendar = new VanillaCalendar("#finish-calendar", finishOptions);
  finishCalendar.init();

  bookDates.addEventListener("click", (event) => {
    console.log(2);
    if (event.target === startDateButton) {
      chooseStartDate.classList.toggle("_hide");
    }

    if (event.target === finishDateButton) {
      chooseFinishDate.classList.toggle("_hide");
    }
  });
}
