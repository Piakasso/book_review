import { getDatabase, ref, set } from "firebase/database";
import defaultPic from "../../img/BookCoverMockup01.jpg";
import getBookList from "./getListOfBook.js";

const submitButton = document.querySelector(".main-block__button"),
  bookreview = document.querySelector(".bookreview"),
  booklist = document.querySelector(".bookslist"),
  overallRate = document.querySelectorAll(".rating__overall input"),
  overallCount = document.querySelector(".overall__count"),
  chooseStartDate = document.querySelector("#start-calendar"),
  bookCover = document.querySelector(".cover__img"),
  chooseFinishDate = document.querySelector("#finish-calendar");
function saveChange(uid, title) {
  submitButton.addEventListener("click", (e) => {
    e.preventDefault;
    const db = getDatabase();
    title = localStorage.getItem("title");

    if (!localStorage.getItem("title")) {
      alert("Need fill Title of book");
      return;
    }

    set(ref(db, `users/${uid}/books/${title}`), {
      overall: localStorage.getItem("overall"),
      moment: localStorage.getItem("moment"),
      total: localStorage.getItem("total"),
      page: localStorage.getItem("page"),
      title: localStorage.getItem("title"),
      note: localStorage.getItem("note"),
      author: localStorage.getItem("author"),
      startDate: localStorage.getItem("startDate"),
      finishDate: localStorage.getItem("finishDate"),
      format: localStorage.getItem("format"),
      genre: localStorage.getItem("genre"),
      quotes: localStorage.getItem("quotes"),
      lovechar: localStorage.getItem("lovechar"),
      hatechar: localStorage.getItem("hatechar"),
      end: localStorage.getItem("end"),
      image: localStorage.getItem("image"),
    });

    getBookList(uid);
    overallRate.forEach((input) => {
      input.removeAttribute("disabled", "disabled");
    });
    overallCount.innerHTML = "0.0";

    bookCover.setAttribute("src", `${defaultPic}`);
    sessionStorage.clear();
    localStorage.clear();
    booklist.classList.remove("_hide");
    bookreview.classList.add("_hide");
    chooseStartDate.classList.add("_hide");
    chooseFinishDate.classList.add("_hide");
  });
}

export default saveChange;
