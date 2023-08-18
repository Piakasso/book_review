function clearInput(input, placeholder, localStorageName) {
  let text = placeholder;
  input.style.overflowY = "hidden";
  if (localStorage.getItem(localStorageName)) {
    input.textContent = `${localStorage.getItem(localStorageName)}`;
    input.addEventListener("focus", (e) => {
      e.preventDefault;
      input.style.overflowY = "auto";
      if (input.textContent === text) {
        input.textContent = "";
        localStorage.setItem(localStorageName, input.textContent);
      }
      localStorage.setItem(localStorageName, input.textContent);
    });
    input.addEventListener("blur", (e) => {
      input.style.overflowY = "hidden";
      if (input.textContent === "") {
        input.textContent = text;
        localStorage.setItem(localStorageName, input.textContent);
      }
      localStorage.setItem(localStorageName, input.textContent);
    });
  } else {
    input.textContent = `${text}`;
    input.addEventListener("focus", (e) => {
      e.preventDefault;
      input.style.overflowY = "auto";
      if (input.textContent === text) {
        input.textContent = "";
      }
    });
    input.addEventListener("blur", (e) => {
      input.style.overflowY = "hidden";
      if (input.textContent === "") {
        input.textContent = text;
      }
      localStorage.setItem(localStorageName, input.textContent);
    });
  }
  input.addEventListener("mouseenter", (e) => {
    input.style.overflowY = "auto";
  });
  input.addEventListener("mouseleave", (e) => {
    input.style.overflowY = "hidden";
  });
}

export default clearInput;
