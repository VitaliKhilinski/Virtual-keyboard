import { KEYBOARD_CONFIG } from "./keyboard-config";

export class VirtualKeyboard {
  constructor(node, textNode) {
    this.textNode = textNode;
    this.node = node;
    this.language = window.localStorage.getItem("language") || "en";
    this.shift = "toLowerCase";
    this.keys = {
      KEY: null,
      SPACE_KEY: null,
      SHIFT_LEFT: null,
      SHIFT_RIGHT: null,
      CAPS_LOCK_KEY: null,
      TAB_KEY: null,
      CTRL_LEFT: null,
      CTRL_RIGHT: null,
      ALT_RIGHT: null,
      ALT_LEFT: null,
      TOP: null,
      BOT: null,
      LEFT: null,
      RIGHT: null,
    };
    this.isCapsLockActive = false;
    this.init();
    // this.replaceDublicateBtns();
    this.initListeners();
    this.activeKeyboardBtns();
  }

  keyUp = (event) => {
    if (event.altKey && event.code === "ShiftLeft") {
      this.changeLaguage();
    }
    for (let i = 0; i < this.keys.KEY.length; i++) {
      if (
        event.key === this.keys.KEY[i].getAttribute("keyname") ||
        event.key === this.keys.KEY[i].getAttribute("lowerCaseName")
      ) {
        this.keys.KEY[i].classList.remove("key_active");
        this.keys.KEY[i].classList.add("key_move");
      }
      if (event.code === "ControlRight") {
        this.keys.CTRL_RIGHT.classList.remove("key_active");
        this.keys.CTRL_RIGHT.classList.add("key_move");
      }
      if (event.code === "ControlLeft") {
        this.keys.CTRL_LEFT.classList.remove("key_active");
        this.keys.CTRL_LEFT.classList.add("key_move");
      }
      if (event.code === "Space") {
        this.keys.SPACE_KEY.classList.remove("key_active");
        this.keys.SPACE_KEY.classList.add("key_move");
      }
      if (event.code === "Tab") {
        this.textNode.value += "    ";
        this.keys.TAB_KEY.classList.remove("key_active");
      }
      if (event.code === "ShiftLeft") {
        this.keys.SHIFT_RIGHT.classList.remove("key_active");
        this.keys.SHIFT_RIGHT.classList.remove("key_move");
      }
      if (event.code === "ShiftRight") {
        this.keys.SHIFT_LEFT.classList.remove("key_active");
        this.keys.SHIFT_LEFT.classList.remove("key_move");
      }
      if (event.code === "AltLeft") {
        this.keys.ALT_RIGHT.classList.remove("key_move");
      }
      if (event.code === "AltRight") {
        this.keys.ALT_LEFT.classList.remove("key_move");
      }
      if (event.code === "ArrowLeft") {
        this.keys.LEFT.classList.remove("key_active");
        this.keys.LEFT.classList.add("key_move");
      }
      if (event.code === "ArrowRight") {
        this.keys.RIGHT.classList.remove("key_active");
        this.keys.RIGHT.classList.add("key_move");
      }
      if (event.code === "ArrowUp") {
        this.keys.TOP.classList.remove("key_active");
        this.keys.TOP.classList.add("key_move");
      }
      if (event.code === "ArrowDown") {
        this.keys.BOT.classList.remove("key_active");
        this.keys.BOT.classList.add("key_move");
      }
      setTimeout(() => {
        this.keys.KEY[i].classList.remove("key_move");
      }, 200);
    }
  };
  keyDown = (event) => {
    for (let i = 0; i < this.keys.KEY.length; i++) {
      if (
        event.key === this.keys.KEY[i].getAttribute("keyname") ||
        event.key === this.keys.KEY[i].getAttribute("lowerCaseName")
      ) {
        this.keys.KEY[i].classList.add("key_active");
      }
      if (event.code === "ControlLeft") {
        this.keys.CTRL_LEFT.classList.add("key_active");
      }
      if (event.code === "ControlRight") {
        this.keys.CTRL_RIGHT.classList.add("key_active");
      }
      if (event.code === "AltLeft") {
        this.keys.ALT_RIGHT.classList.remove("key_active");
      }
      if (event.code === "AltRight") {
        this.keys.ALT_LEFT.classList.remove("key_active");
      }
      if (event.code === "Space") {
        this.keys.SPACE_KEY.classList.add("key_active");
      }
      if (event.code === "Tab") {
        this.keys.TAB_KEY.classList.add("key_active");
        setTimeout(() => {
          this.keys.TAB_KEY.classList.remove("key_active");
        }, 100);
      }
      if (event.code === "ShiftLeft") {
        this.keys.SHIFT_RIGHT.classList.remove("key_active");
      }
      if (event.code === "ShiftRight") {
        this.keys.SHIFT_LEFT.classList.remove("key_active");
      }
      if (event.code === "CapsLock") {
        this.isCapsLockActive = !this.isCapsLockActive;
        this.changeCase();
      }
      if (event.code === "ArrowLeft") {
        this.keys.LEFT.classList.add("key_active");
      }
      if (event.code === "ArrowRight") {
        this.keys.RIGHT.classList.add("key_active");
      }
      if (event.code === "ArrowUp") {
        this.keys.TOP.classList.add("key_active");
      }
      if (event.code === "ArrowDown") {
        this.keys.BOT.classList.add("key_active");
      }
    }
  };
  changeLaguage() {
    if (this.language === "en") {
      this.language = "ru";
    } else {
      this.language = "en";
    }
    window.localStorage.setItem("language", this.language);
    this.init();
    this.activeKeyboardBtns();
  }

  changeCase() {
    if (this.shift === "toLowerCase") {
      this.shift = "toUperCase";
    } else {
      this.shift = "toLowerCase";
    }
    this.init();
    this.activeKeyboardBtns();
  }

  initListeners() {
    this.node.addEventListener("click", (event) => {
      const key = event.target.classList.contains("key");
      const backspace = event.target.classList.contains("backspace_key");
      const del = event.target.classList.contains("del_key");
      const ctrl = event.target.classList.contains("ctrl");
      const tab = event.target.classList.contains("tab_key");
      const capsLock = event.target.classList.contains("caps_lock_key");
      const enter = event.target.classList.contains("enter_key");
      const alt = event.target.classList.contains("alt_key");
      const languages = event.target.classList.contains("language");
      const shift = event.target.classList.contains("shift");
      // const CAPS_LOCK_KEY = document.querySelector(".caps_lock_key");

      if (
        key &&
        !del &&
        !ctrl &&
        !tab &&
        !capsLock &&
        !enter &&
        !alt &&
        !languages &&
        !backspace &&
        !shift
      ) {
        this.textNode.value += event.target.innerHTML;
      }
      if (backspace) {
        this.textNode.value = this.textNode.value.slice(0, -1);
      }
      if (enter) {
        this.textNode.value += "\n";
      }

      if (tab) {
        this.textNode.value += "   ";
      }
      if (languages) {
        this.changeLaguage();
      }

      if (capsLock) {
        this.isCapsLockActive = !this.isCapsLockActive;
        this.changeCase();
      }
    });
    this.node.addEventListener("mousedown", (event) => {
      const shift = event.target.classList.contains("shift");
      if (shift) {
        this.changeLaguage();
      }
    });
    this.node.addEventListener("mouseup", (event) => {
      const shift = event.target.classList.contains("shift");
      if (shift) {
        this.changeLaguage();
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

  renderKey = (key) => {
    let className = "key";
    switch (key) {
      case "Backspace":
        className = className + " backspace_key";
        break;
      case "Tab":
        className = className + " tab_key";
        break;
      case "Caps Lock":
        className =
          className +
          " caps_lock_key" +
          (this.isCapsLockActive ? " key_active" : "");
        break;
      case "Shift-L":
        className = className + " shift_left" + " shift";
        break;
      case "Shift-R":
        className = className + " shift_right" + " shift";
        break;
      case "Alt-L":
        className = className + " alt_left" + " alt_key";
        break;
      case "Alt-R":
        className = className + " alt_right" + " alt_key";
        break;
      case "":
        className = className + " space_key";
        break;
      case "Ctrl-L":
        className = className + " ctrl_left" + " ctrl";
        break;
      case "Ctrl-R":
        className = className + " ctrl_right" + " ctrl";
        break;
      case "Enter":
        className = className + " enter_key";
        break;
      case "Del":
        className = className + " del_key";
        break;
      case "en":
        className = className + " language";
        break;
      case "EN":
        className = className + " language";
        break;
      case "ru":
        className = className + " language";
        break;
      case "RU":
        className = className + " language";
        break;
      case "⮝":
        className = className + " top";
        break;
      case "⮟":
        className = className + " bot";
        break;
      case "⮜":
        className = className + " left";
        break;
      case "⮞":
        className = className + " right";
        break;
    }
    if (key.includes("-R") || key.includes("-L")) {
      key = key.slice(0, -2);
    }
    return `<div class="${className}">${key}</div>`;
  };

  replaceDublicateBtns() {
    const shift = document.querySelectorAll(".shift");
    const ctrl = document.querySelectorAll(".ctrl_key");
    const alt = document.querySelectorAll(".alt_key");
    let shiftClass = ["shift_left", "shift_right"];
    let ctrlClass = ["ctrl_left", "ctrl_right"];
    let altClass = ["alt_left", "alt_right"];
    for (let i = 0; i < 2; i++) {
      shift[i].classList.add(shiftClass[i]);
      ctrl[i].classList.add(ctrlClass[i]);
      alt[i].classList.add(altClass[i]);
    }
  }

  activeKeyboardBtns() {
    this.preInitDublicats();
    window.removeEventListener("keydown", this.keyDown);
    window.removeEventListener("keyup", this.keyUp);
    window.addEventListener("keydown", this.keyDown);
    window.addEventListener("keyup", this.keyUp);
  }

  preInitDublicats() {
    this.keys.KEY = document.querySelectorAll(".key");
    this.keys.SPACE_KEY = document.querySelector(".space_key");
    this.keys.SHIFT_LEFT = document.querySelector(".shift_left");
    this.keys.SHIFT_RIGHT = document.querySelector(".shift_right");
    this.keys.CAPS_LOCK_KEY = document.querySelector(".caps_lock_key");
    this.keys.TAB_KEY = document.querySelector(".tab_key");
    this.keys.CTRL_LEFT = document.querySelector(".ctrl_left");
    this.keys.CTRL_RIGHT = document.querySelector(".ctrl_right");
    this.keys.ALT_LEFT = document.querySelector(".alt_left");
    this.keys.ALT_RIGHT = document.querySelector(".alt_right");
    this.keys.TOP = document.querySelector(".top");
    this.keys.BOT = document.querySelector(".bot");
    this.keys.LEFT = document.querySelector(".left");
    this.keys.RIGHT = document.querySelector(".right");

    for (let i = 0; i < this.keys.KEY.length; i++) {
      this.keys.KEY[i].setAttribute("keyname", this.keys.KEY[i].innerText);
      this.keys.KEY[i].setAttribute(
        "apperCase",
        this.keys.KEY[i].innerText.toUpperCase()
      );
    }
  }
}
