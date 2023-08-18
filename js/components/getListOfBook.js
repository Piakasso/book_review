import {
  getDatabase,
  ref,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

import chooseExistBook from "./chooseBook.js";
const books = document.querySelector(".booklist__items");

function getBookList(userId) {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/${userId}/books`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let objBooks = snapshot.val();
        books.innerHTML = "";
        for (let name in objBooks) {
          let { author, overall, image } = objBooks[name];
          if (!author) {
            author = "no author";
          }
          if (overall === "undefined" || !overall) {
            overall = "...";
          }

          if (!image) {
            image =
              "http://papadesign.com.ua/images/thumbnails/1712/1400/detailed/6/krasnaja_kniga.jpg";
          }
          renderBook(name, author, overall, image);
        }
      } else {
        books.innerHTML = `
          <div class='booklist__data'>No reviews added</data>
        `;
      }
      chooseExistBook(userId);
    })
    .catch((error) => {
      console.error(error);
    });

  function renderBook(name, author, overall, image) {
    books.innerHTML += ` <div class="booklist__item" data-name='${name}'>
        <div class="item__img"><img
                src="${image}"
                alt="">
        </div>
        <div class="item__descr">
            <div class="item__title"><span>${name}</span> (${overall})</div>
            <div class="item__author">${author}</div>
        </div>
    </div>`;
  }
}

export default getBookList;
