import "../scss/main.scss";
import "../index.html";
import "../../node_modules/focus-visible/dist/focus-visible";
import { VirtualKeyboard } from "./virtual-keyboard.class";

const body = document.querySelector(".body");

function renderPage() {
  return `<div class="container">
   <h1 class="title">Virtual keyboard</h1>
   <textarea name="textarea " id="text" cols="50" rows="10"></textarea>
   <div class="keyboard_wrapper">
       <div class="keyboard_keys"></div>
       </div>
       <h3 class="info-text" >Press "Alt" + "Shift" to change language</h3>
   </div>`;
}

window.addEventListener("DOMContentLoaded", () => {
  body.insertAdjacentHTML("beforeend", renderPage());
  new VirtualKeyboard(
    document.getElementsByClassName("keyboard_keys")[0],
    document.getElementById("text")
  );
});

// window.localStorage.setItem()
// console.log(GetKeys("en", "toLoweCase"));
