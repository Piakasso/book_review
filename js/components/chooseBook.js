import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

import { addDates } from "./getDate.js";
import getRating from "./getRating.js";
import clearInput from "./clearField.js";
import uploadImg from "./uploadCover.js";

const bookreview = document.querySelector(".bookreview"),
  booklist = document.querySelector(".bookslist");
const note = document.querySelector(".note__text"),
  title = document.querySelector(".bookreview-header__title"),
  author = document.querySelector(".bookreview-header__account"),
  format = document.querySelector(".format__select"),
  genre = document.querySelector(".genre__type"),
  quotes = document.querySelector(".quotes__text"),
  moment = document.querySelector(".moment__text"),
  lovechar = document.querySelector(".lovechar__text"),
  hatechar = document.querySelector(".hatechar__text"),
  end = document.querySelector(".ending__text"),
  page = document.querySelector(".moment-page__number");

function chooseExistBook(userId) {
  const books = document.querySelectorAll(".booklist__item");
  books.forEach((book) => {
    book.addEventListener("click", (e) => {
      sessionStorage.setItem("isObserving", true);
      const bookname = book.getAttribute("data-name");
      const db = getDatabase();
      const bookList = ref(db, `users/${userId}/books/${bookname}`);
      onValue(bookList, (snapshot) => {
        const data = snapshot.val();
        for (let key in data) {
          localStorage.setItem(key, data[key]);
        }
        clearInput(note, "....", "note");
        clearInput(title, "Title", "title");
        clearInput(author, "Author", "author");
        clearInput(
          format,
          "ex. Ebook, Hardcover, Softcover, Audiobook",
          "format"
        );
        clearInput(
          genre,
          "ex. Mystery, Thriller, Contemporary, Adult,Humor, Romance",
          "genre"
        );
        clearInput(
          quotes,
          "ex. I've waited a long time to show these flowers how pretty you are.",
          "quotes"
        );
        clearInput(moment, "....", "moments");
        clearInput(page, "##", "page");

        clearInput(lovechar, "....", "lovechar");
        clearInput(hatechar, "....", "hatechar");
        clearInput(
          end,
          "Liked it? Why? Why not? How should it have ended?",
          "end"
        );
        getRating();
        uploadImg(userId);
        addDates();
        booklist.classList.add("_hide");
        bookreview.classList.remove("_hide");
      });
    });
  });
}

export default chooseExistBook;
