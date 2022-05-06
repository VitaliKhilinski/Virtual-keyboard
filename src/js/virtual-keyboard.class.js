import { KEYBOARD_CONFIG } from "./keyboard-config";

export class VirtualKeyboard {
  constructor(node, textNode) {
    this.textNode = textNode;
    this.node = node;
    this.language = "en";
    this.shift = "toLoweCase";
    this.init();
    this.initListeners();
  }

  changeLaguage() {
    if (this.language === "en") {
      this.language = "ru";
    } else {
      this.language = "en";
    }
    this.init();
  }

  initListeners() {
    this.node.addEventListener("click", (event) => {
      //   console.log(event.target);
      if (event.target.classList.contains("key")) {
        this.textNode.value += event.target.innerHTML;
      }
    });
  }

  init() {
    this.node.innerHTML = "";
    this.node.insertAdjacentHTML("beforeend", this.renderKeys());
  }

  renderKeys() {
    const keys = KEYBOARD_CONFIG[this.language][this.shift];

    return keys
      .map((row) => {
        return `<div class="row">
          ${row.map(this.renderKey).join("")}
          </div>`;
      })
      .join("");
  }

  renderKey(key) {
    let className = "key";
    switch (key) {
      case "Backspace":
        className = className + " backspace_key";
        break;
      case "Tab":
        className = className + " tab_key";
        break;
      case "Caps Lock":
        className = className + " caps_lock_key";
        break;
      case "enter_key":
        className = className + " Enter";
        break;
      case "Shift":
        className = className + " shift_left";
        break;
    }

    return `<div class="${className}">${key}</div>`;
  }
}
