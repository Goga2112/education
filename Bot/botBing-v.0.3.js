// ==UserScript==
// @name         Bot for Bing
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Bot for Bing
// @author       Zhurbitskiy Egor
// @match        https://www.bing.com/*
// @match        https://dzen.ru/*
// @match        https://habr.com/*
// @match        https://discovery-russia.ru/*
// @grant        none
// ==/UserScript==

let links = document.links;
let btnK = document.getElementsByClassName("search")[0];
let btnN = document.querySelector("a[title$='Следующая страница']");
let bingInput = document.getElementsByName("q")[0];
let sites = {
  "dzen.ru":["зауроподы","ТОП-10 лучших фильмов всех времен","Корабли в советской фантастике"],
  "habr.com":["Учим три телевизора делать солнышко", "Cheetah", "Абстрактные типы данных"],
  "discovery-russia.ru":["СТРАНЫ И ГОРОДА В ЮЖНОЙ АМЕРИКЕ", "ЧТО ПОСМОТРЕТЬ В КОРКЕ", "АВСТРАЛИЯ И ОКЕАНИЯ"]
}
let site = Object.keys(sites)[getRandom(0, Object.keys(sites).length)];
let keywords = sites[site];
let keyword = keywords[getRandom(0, keywords.length)];

if (btnK != undefined) {
  document.cookie = `site=${site}`;
} else if (location.hostname == "www.bing.com") {
  site = getCookie("site");
} else {
  site = location.hostname;
};

if (btnK != undefined) {
  let i = 0;
  let timerId = setInterval(function() {
    bingInput.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      btnK.click();
    };
  }, 700)
  } else if (location.hostname == site) {
    console.log("Мы на целевом сайте");
    setInterval(() => {
      let index = getRandom(0, links.length); 
      if (getRandom(0, 101) >= 75) {
        location.href = "https://www.bing.com/";
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
    for (let i = 0; i < links.length; i++) {
      if(links[i].href.indexOf(site) != -1) {
        console.log("Нашел строку " + links[i]);
        let link = links[i];
        nextBingPage = false;
        setTimeout(() => { link.click();}, getRandom(2000, 4000));
        break;
      };
    };
    let elementExist = setInterval(() => {
      let elm = document.querySelector("a[class$='sb_pagS sb_pagS_bp b_widePag sb_bp']");
      if (elm != null) {

        if (elm.firstChild.data == '5') {
          nextBingPage = false;
          location.href = "https://www.bing.com/";
        };
        clearInterval(elementExist);
      };
    }, 100)

    if (nextBingPage) {
      setTimeout(() => {
        btnN.click();
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
