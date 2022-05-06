import "../scss/main.scss";
import "../index.html";
import "../../node_modules/focus-visible/dist/focus-visible";
import "../js/render-keys";
import { GetKeys } from "./render-keys";

const KEY = document.querySelectorAll(".key");
const SPACE_KEY = document.querySelector(".space_key");
const SHIFT_LEFT = document.querySelector(".shift_left");
const SHIFT_RIGHT = document.querySelector(".shift_right");
const CAPS_LOCK_KEY = document.querySelector(".caps_lock_key");
const TEXT_INPUT = document.getElementById("text");

for (let i = 0; i < KEY.length; i++) {
  KEY[i].setAttribute("keyname", KEY[i].innerText);
  KEY[i].setAttribute("lowerCaseName", KEY[i].innerText.toLowerCase());
}

window.addEventListener("keydown", function (event) {
  for (let i = 0; i < KEY.length; i++) {
    if (
      event.key === KEY[i].getAttribute("keyname") ||
      event.key === KEY[i].getAttribute("lowerCaseName")
    ) {
      KEY[i].classList.add("key_active");
    }
    if (event.code === "Space") {
      SPACE_KEY.classList.add("key_active");
    }
    if (event.code === "ShiftLeft") {
      SHIFT_RIGHT.classList.remove("key_active");
    }
    if (event.code === "ShiftRight") {
      SHIFT_LEFT.classList.remove("key_active");
    }
    if (event.code === "CapsLock") {
      CAPS_LOCK_KEY.classList.toggle("key_active");
    }
  }
});
window.addEventListener("keyup", function (event) {
  for (let i = 0; i < KEY.length; i++) {
    if (
      event.key === KEY[i].getAttribute("keyname") ||
      event.key === KEY[i].getAttribute("lowerCaseName")
    ) {
      KEY[i].classList.remove("key_active");
      KEY[i].classList.add("key_move");
    }
    if (event.code === "Space") {
      SPACE_KEY.classList.remove("key_active");
      SPACE_KEY.classList.add("key_move");
    }
    if (event.code === "ShiftLeft") {
      SHIFT_RIGHT.classList.remove("key_active");
      SHIFT_RIGHT.classList.remove("key_move");
    }
    if (event.code === "ShiftRight") {
      SHIFT_LEFT.classList.remove("key_active");
      SHIFT_LEFT.classList.remove("key_move");
    }
    setTimeout(() => {
      KEY[i].classList.remove("key_move");
    }, 200);
  }
});
GetKeys("en", "toLoweCase");
// console.log(GetKeys("en", "toLoweCase"));
