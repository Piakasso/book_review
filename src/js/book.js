"use strict";

import "@babel/polyfill";
import "../book.html";
import "../styles/book.scss";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import getBookList from "./components/getListOfBook.js";
import saveChange from "./components/submitAll.js";
import reviewBook from "./components/newBook.js";
import { getDateFromCalendar } from "./components/getDate.js";
import "dotenv/config";

document.addEventListener("DOMContentLoaded", () => {
  const apiKey = process.env.API_KEY;
  const firebaseConfig = {
    apiKey: apiKey,
    authDomain: "auth-app-e88b8.firebaseapp.com",
    databaseURL: "https://auth-app-e88b8-default-rtdb.firebaseio.com",
    projectId: "auth-app-e88b8",
    storageBucket: "auth-app-e88b8.appspot.com",
    messagingSenderId: "350225510939",
    appId: "1:350225510939:web:6648f84f6704f7c8d73ebe",
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
