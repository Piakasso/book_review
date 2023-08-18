import { addDates } from "./getDate.js";
import getRating from "./getRating.js";
import clearInput from "./clearField.js";
import uploadImg from "./uploadCover.js";

const addNewReviewButton = document.querySelector(".booklist__button"),
  listBook = document.querySelector(".bookslist"),
  reviewPage = document.querySelector(".bookreview");
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

function reviewBook(userId) {
  if (sessionStorage.getItem("isObserving")) {
    listBook.classList.add("_hide");
    reviewPage.classList.remove("_hide");
    clearInput(note, "....", "note");
    clearInput(title, "Title", "title");
    clearInput(author, "Author", "author");
    clearInput(format, "ex. Ebook, Hardcover, Softcover, Audiobook", "format");
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
    clearInput(end, "Liked it? Why? Why not? How should it have ended?", "end");
    uploadImg(userId);
    addDates();
    getRating();
  }
  addNewReviewButton.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.setItem("isObserving", true);
    clearInput(note, "....", "note");
    clearInput(title, "Title", "title");
    clearInput(author, "Author", "author");
    clearInput(format, "ex. Ebook, Hardcover, Softcover, Audiobook", "format");
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
    clearInput(end, "Liked it? Why? Why not? How should it have ended?", "end");

    addDates();
    getRating();
    uploadImg(userId);
    listBook.classList.add("_hide");
    reviewPage.classList.remove("_hide");
  });
}

export default reviewBook;
