// ==UserScript==
// @name         Bot for Bing & Google
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Bot for Bing & Google
// @author       Zhurbitskiy Egor
// @match        https://www.bing.com/*
// @match        https://www.google.com/*
// @match        https://dzen.ru/*
// @match        https://habr.com/*
// @match        https://discovery-russia.ru/*
// @grant        none
// ==/UserScript==

let links = document.links;
let btnB = document.getElementsByClassName("search")[0];
let btnG = document.getElementsByName("btnK")[0];
let btnNB = document.querySelector("a[title$='Следующая страница']");
let btnNG = document.getElementById('pnnext');
let input = document.getElementsByName("q")[0];
let sites = {
  "dzen.ru":["Зауроподы","ТОП-10 лучших фильмов всех времен","Корабли в советской фантастике"],
  "habr.com":["Учим три телевизора делать солнышко", "Cheetah", "Абстрактные типы данных"],
  "discovery-russia.ru":["страны и города в южной Америке", "что посмотреть в Корке", "Австралия и Океания"]
};
let searchMachines = ["https://www.bing.com/", "https://www.google.com/"];
let searchMachine = searchMachines[getRandom(0, searchMachines.length)];
let site = Object.keys(sites)[getRandom(0, Object.keys(sites).length)];
let keywords = sites[site];
let keyword = keywords[getRandom(0, keywords.length)];

if (btnB != undefined || btnG != undefined) {
  document.cookie = `site=${site}`;
} else if (location.hostname == "www.bing.com" || location.hostname == "www.google.com" ) {
  site = getCookie("site");
} else {
  site = location.hostname;
};

if (btnB != undefined) {
  let i = 0;
  let timerId = setInterval(function() {
    input.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      btnB.click();
    };
  }, 700)
  }else if (btnG != undefined) {
  let i = 0;
  let timerId = setInterval(function() {
    input.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      btnG.click();
    };
  }, 700)
  } else if (location.hostname == site) {
    console.log("Мы на целевом сайте");
    setInterval(() => {
      let index = getRandom(0, links.length); 
      if (getRandom(0, 101) >= 75) {
        location.href = searchMachine;
      };
      if (links.length == 0) {
        location.href = site;
      };
      if(links[index].href.includes(site)) {
        links[index].click();
      };
    }, getRandom(3000, 5000))
  } else {
    let nextBingPage = true;
    let nextGooglePage = true;
    for (let i = 0; i < links.length; i++) {
      if(links[i].href.indexOf(site) != -1) {
        console.log("Нашел строку " + links[i]);
        let link = links[i];
        nextBingPage = false;
        nextGooglePage = false;
        setTimeout(() => { link.click();}, getRandom(2000, 4000));
        break;
      };
    };
    let elementExist = setInterval(() => {
      let elmB = document.querySelector("a[class$='sb_pagS sb_pagS_bp b_widePag sb_bp']");
      let elmG = document.querySelector(".YyVfkd");
      if (elmB != null) {
        if (elmB.firstChild.data == '5') {
          nextBingPage = false;
          location.href = searchMachine;
        };
        clearInterval(elementExist);
      }else if (elmG != null) {
        if (elmG.innerText == "5") {
          nextGooglePage = false;
          location.href = searchMachine;
        };
        clearInterval(elementExist);
      };
    }, 100);
    if (nextBingPage) {
      setTimeout(() => {
        btnNB.click();
      }, getRandom(3500, 5500))
    };
    if (nextGooglePage) {
      setTimeout(() => {
        btnNG.click();
      }, getRandom(3500, 5500))
    };
  };
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
