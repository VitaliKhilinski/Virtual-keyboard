import { getLetter } from "../js/languages";

function renderKeys(language) {
  return `<div class="key">${language}</div>`;
}

function GetKeys(language, keyCase) {
  const KEYBOARD_KEYS = document.querySelector(".keyboard_keys");
  const ROW = document.querySelectorAll(".row");
  document.ROW.innerHTML = "";
  const keysData = getLetter(language).keyCase.forEach((element) => {
    KEYBOARD_KEYS.insertAdjacentHTML("beforeend", renderKeys(element));
  });
}
// function GetKeys(en[toUperCase])
export { GetKeys };
