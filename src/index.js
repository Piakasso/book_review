"use strict";

import "@babel/polyfill";
import "./index.html";
import "./style.css";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
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
const database = getDatabase(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

const form = document.querySelector(".form");
const buttonSignIn = document.querySelector(".button_signin");
const buttonSignUp = document.querySelector(".button_signup");
const googleButtons = document.querySelectorAll(".google__auth");
const close = document.querySelector(".form__close");
const notice = document.querySelector(".form__notice");
const noticeSignUp = document.querySelector(".form__notice-signup");

const signUpLink = document.querySelector(".form__signup a");
const signUp = document.querySelector("._signup");
const signIn = document.querySelector("._signin");
const eyeHide = document.querySelectorAll(".eye__hide");
const eyeShow = document.querySelectorAll(".eye__show");
const buttonSignInLoader = document.querySelector(".button_signin img");
const buttonSignUpLoader = document.querySelector(".button_signup img");

//Sign In

function signInUseEmailPassword(loginEmail, loginPassword) {
  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((userCredential) => {
      window.location.href = "./book.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      notice.style.display = "block";
    })
    .finally(() => {
      buttonSignInLoader.classList.add("_hide");
    });
}

buttonSignIn.addEventListener("click", (e) => {
  e.preventDefault();
  buttonSignInLoader.classList.remove("_hide");
  notice.style.display = "none";
  const loginEmail = document.querySelector("#email").value;
  const loginPassword = document.querySelector("#password").value;
  signInUseEmailPassword(loginEmail, loginPassword);
});

//Sign Up

signUpLink.addEventListener("click", (e) => {
  e.preventDefault();
  signUp.style.display = "block";
  signIn.style.display = "none";
});
buttonSignUp.addEventListener("click", (e) => {
  e.preventDefault();
  buttonSignUpLoader.classList.remove("_hide");
  let registerEmail = document.querySelector("#email__signup").value;
  let registerPassword = document.querySelector("#password__signup").value;
  createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      writeUser(user.uid, user.email, user.email);
      signInUseEmailPassword(registerEmail, registerPassword);

      sendEmailVerification(auth.currentUser).then(() => {});
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        noticeSignUp.style.display = "block";
        noticeSignUp.innerHTML = "This account already exist";
        setTimeout(function () {
          window.location.replace("./index.html");
        }, 3000);
      } else if (errorCode === "auth/weak-password") {
        noticeSignUp.style.display = "block";
        noticeSignUp.innerHTML = "Weak password.Need more 6 characters";
      }
    })
    .finally(() => {
      buttonSignUpLoader.classList.add("_hide");
    });
});

// Hide/Show password

document.querySelectorAll(".password__title").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault;
    eyeHide.forEach((item) => {
      item.classList.toggle("_active");
      let registerPassword = document.querySelector("#password__signup");

      item.classList.contains("_active")
        ? (registerPassword.type = "text")
        : (registerPassword.type = "password");
    });
    eyeShow.forEach((item) => {
      item.classList.toggle("_active");
      let loginPassword = document.querySelector("#password");

      item.classList.contains("_active")
        ? (loginPassword.type = "text")
        : (loginPassword.type = "password");
    });
  });
});

//Close modal

close.addEventListener("click", (e) => {
  form.style.display = "none";
});

function writeUser(userId, name, email) {
  const db = getDatabase();
  const dbRef = ref(getDatabase());

  get(child(dbRef, "users"))
    .then((snapshot) => {
      console.log(snapshot.val());
      for (let key in snapshot.val()) {
        let singleUser = snapshot.val()[key];
        if (singleUser.email === email) {
          return false;
        } else {
          set(ref(db, "users/" + userId), {
            username: name,
            email: email,
            id: userId,
          });
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

//Google auth
googleButtons.forEach((google) =>
  google.addEventListener("click", (e) => {
    e.preventDefault();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        writeUser(user.uid, user.email, user.email);
        window.location.href = "./book.html";
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  })
);
