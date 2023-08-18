"use strict";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

import getBookList from "./components/getListOfBook.js";
import saveChange from "./components/submitAll.js";
import reviewBook from "./components/newBook.js";
import { getDateFromCalendar } from "./components/getDate.js";

document.addEventListener("DOMContentLoaded", () => {
  const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: "auth-app-e88b8.firebaseapp.com",
    projectId: "auth-app-e88b8",
    storageBucket: "auth-app-e88b8.appspot.com",
    messagingSenderId: "350225510939",
    appId: APP_ID,
  };

  // Initialize Firebase

  const app = initializeApp(firebaseConfig),
    auth = getAuth();

  const account = document.querySelector(".booklist-header__account");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      account.textContent = `${user.email}`;
      account.addEventListener("mouseover", (e) => {
        account.textContent = "Do you want exit?";
      });
      account.addEventListener("mouseout", (e) => {
        account.textContent = `${user.email}`;
      });
      account.addEventListener("click", (e) => {
        e.preventDefault;
        signOut(auth)
          .then(() => {
            window.location.replace("./index.html");
          })
          .catch((error) => {
            // An error happened.
          });
      });
      getDateFromCalendar();
      getBookList(user.uid);
      reviewBook(user.uid);
      saveChange(user.uid);
    } else {
      window.location.replace("./index.html");
    }
  });

  //
});
