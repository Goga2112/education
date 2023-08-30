// ==UserScript==
// @name         Bot for Bing
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Bot for Bing
// @author       Zhurbitskiy Egor
// @match        https://www.bing.com/*
// @grant        none
// ==/UserScript==

let links = document.links;
let btnK = document.getElementsByClassName("search")[0];
let bingInput = document.getElementsByName("q")[0];
let keywords = ["Самые большие и странные: Где жили гигантские зауроподы",
                "ТОП-10 лучших фильмов всех времен по версии зрителей",
                "Как выглядят Космические Корабли в советской фантастике"];
let keyword = keywords[getRandom(0, keywords.length)];

if (btnK != undefined) {
  bingInput.value = keyword;
  btnK.click();
} else {
  for (let i = 0; i < links.length; i++) {
    if(links[i].href.indexOf("dzen.ru") != -1) {
      console.log("Нашел строку " + links[i]);
      links[i].click();
      break;
    }
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
