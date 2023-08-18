import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
  getStorage,
  uploadBytes,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: MY_KEY,
  authDomain: "auth-app-e88b8.firebaseapp.com",
  projectId: "auth-app-e88b8",
  storageBucket: "auth-app-e88b8.appspot.com",
  messagingSenderId: "350225510939",
  appId: APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
const bookCover = document.querySelector(".file-upload-label"),
  bookImg = document.querySelector(".cover__img"),
  loader = document.querySelector(".loader"),
  coverText = document.querySelector(".file-upload-text");

function uploadImg(userId) {
  if (localStorage.getItem("image")) {
    bookImg.setAttribute("src", localStorage.getItem("image"));
    bookImg.style.zIndex = 2;
    bookImg.addEventListener("mouseenter", (e) => {
      bookCover.style.zIndex = 4;
    });

    bookCover.addEventListener("mouseleave", (e) => {
      bookCover.style.zIndex = 1;
    });
  } else {
    bookCover.style.zIndex = 4;
    bookImg.setAttribute("src", "");
  }
  bookCover.addEventListener("change", (e) => {
    coverText.textContent = "";
    loader.classList.remove("_hide");
    let file = e.target.files[0];
    const bookRef = ref(storage, `${userId}/book/${file.name}`);
    uploadBytes(bookRef, file).then((snapshot) => {
      getDownloadURL(ref(storage, `${userId}/book/${file.name}`))
        .then((url) => {
          coverText.textContent = "Book cover here";
          bookCover.style.zIndex = 1;
          bookImg.style.zIndex = 2;
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
