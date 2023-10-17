const rateBar = document.querySelectorAll("input"),
  overallCount = document.querySelector(".overall__count"),
  overallRate = document.querySelectorAll(".rating__overall input");

function getRating() {
  let total = [];
  let overall = 0;
  let sum;
  overallRate.forEach((input) => {
    input.removeAttribute("disabled", "disabled");
  });

  function getOverallRate() {
    if (total.length > 0) {
      sum = (total.reduce((a, b) => +a + +b) / total.length).toFixed(1);
      overall = Math.round(sum * 2) / 2;
      overallCount.textContent = `${sum}`;
    }
    overallRate.forEach((input) => {
      input.removeAttribute("disabled", "disabled");
      if (input.getAttribute("data-value") == overall) {
        input.setAttribute("disabled", "disabled");
      }
    });
  }

  if (localStorage.getItem("total")) {
    let totalStore = localStorage.getItem("total");
    total = totalStore.split(",");
    rateBar.forEach((item) => {
      function restoreRate(dataAttr, index) {
        if (
          item.hasAttribute(dataAttr) &&
          total[index] == item.getAttribute("data-value")
        ) {
          item.setAttribute("checked", "checked");
        }
      }
      restoreRate("data-setting", 0);
      restoreRate("data-plot", 1);
      restoreRate("data-char", 2);
      restoreRate("data-style", 3);
      restoreRate("data-engagement", 4);
    });
    getOverallRate();
  } else {
    rateBar.forEach((bar) => bar.removeAttribute("checked"));
    overallRate.forEach((ratebar) => ratebar.removeAttribute("checked"));
  }

  rateBar.forEach((item) => {
    item.addEventListener("click", (e) => {
      console.log(1);
      const value = item.getAttribute("data-value");
      if (e.target.hasAttribute("data-setting")) {
        !total[0] ? total.push(value) : (total[0] = value);
      }

      if (e.target.hasAttribute("data-plot")) {
        !total[1] ? total.push(value) : (total[1] = value);
      }

      if (e.target.hasAttribute("data-char")) {
        !total[2] ? total.push(value) : (total[2] = value);
      }

      if (e.target.hasAttribute("data-style")) {
        !total[3] ? total.push(value) : (total[3] = value);
      }
      if (e.target.hasAttribute("data-engagement")) {
        !total[4] ? total.push(value) : (total[4] = value);
      }
      getOverallRate();
      localStorage.setItem("total", total);
      localStorage.setItem("overall", sum);
    });
  });
}

export default getRating;
