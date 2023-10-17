import { initializeApp } from "firebase/app";
import {
  getStorage,
  uploadBytes,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import "dotenv/config";

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
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
const bookCover = document.querySelector(".file-upload-label"),
  bookImg = document.querySelector(".cover__img"),
  loader = document.querySelector(".loader");

function uploadImg(userId) {
  if (localStorage.getItem("image")) {
    bookImg.setAttribute("src", localStorage.getItem("image"));
  }
  bookCover.addEventListener("change", (e) => {
    loader.classList.remove("_hide");
    let file = e.target.files[0];
    const bookRef = ref(storage, `${userId}/book/${file}`);
    uploadBytes(bookRef, file).then((snapshot) => {
      getDownloadURL(ref(storage, `${userId}/book/${file}`))
        .then((url) => {
          bookImg.setAttribute("src", url);
          localStorage.setItem("image", url);
          loader.classList.add("_hide");
        })
        .catch((error) => {
          switch (error.code) {
            case "storage/object-not-found":
              break;
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
          }
        });
    });
  });
}

export default uploadImg;
