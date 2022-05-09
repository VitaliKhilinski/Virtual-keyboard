import { KEYBOARD_CONFIG } from "./keyboard-config";

export function renderKeys(language, shift) {
  const keys = KEYBOARD_CONFIG[language][shift];

  return keys
    .map((row) => {
      return `<div class="row">
    ${row.map(renderKey).join("")}
    </div>`;
    })
    .join("");
}

function renderKey(key) {
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
