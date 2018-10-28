const validLanguages = {
  en: "en",
  jp: "jp"
};

const modes = {
  // 1313
  "hw1-1313": 0,
  "hw2-1313": 1,
  // 134
  "hw1-134": 2,
  "hw2-134": 3,
  // 1322
  "hw1-1322": 4,
  "hw2-1322": 5,
  // 1223
  "hw1-1223": 6,
  "hw2-1223": 7
};

let currentLanguage = validLanguages.en;
let currentMode = "hw1-1313";

$(document).ready(() => {
  setLocalisation(getLanguage());
});

const chooseLanguage = language => {
  if (Object.keys(validLanguages).indexOf(language) >= 0) {
    setCookie("language", language);
    setLocalisation(language);
  }
};

const setLocalisation = language => {
  const opts = { language, pathPrefix: "texts" };
  $("[data-localize]").localize("labels", opts);
};

const getLanguage = () => {
  const lang = getCookie("language");
  // If language is saved in cookies, return language
  if (!!lang && Object.keys(validLanguages).indexOf(lang) >= 0) {
    currentLanguage = lang;
    return lang;
  }
  // Return current language
  setCookie("language", currentLanguage);
  return currentLanguage;
};

const setCookie = (key, value) => {
  document.cookie = key + "=" + value + ";";
};

const getCookie = key => {
  const name = key + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
