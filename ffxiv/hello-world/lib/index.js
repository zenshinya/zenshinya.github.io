const validLanguages = {
  en: "en",
  jp: "jp"
};

const modes = {
  // 1313
  "HW1-1313": "HW1-1313",
  "HW2-1313": "HW2-1313",
  // 134
  "HW1-134": "HW1-134",
  "HW2-134": "HW2-134",
  // 1322
  "HW1-1322": "HW1-1322",
  "HW2-1322": "HW2-1322",
  // 1223
  "HW1-1223": "HW1-1223",
  "HW2-1223": "HW2-1223"
};

let currentLanguage = validLanguages.en;
let currentMode = Object.keys(modes)[0];

$(document).ready(() => {
  setLocalisation(getLanguage());
  getMode();
});

const getMode = () => {
  const query = location.search.split("mode=")[1];
  if (!!query) {
    const mode = query.split("&")[0];
    if (!!mode && Object.keys(modes).indexOf(mode) >= 0) {
      currentMode = mode;
    }
  }
  renderHWTypeDisplay();
};

const renderHWTypeDisplay = () => {
  const labels = currentMode.split("-");
  $("#current-mode-hw-display").attr("data-localize", `LABEL_${labels[0]}`);
  $("#current-mode-type-display").attr(
    "data-localize",
    `LABEL_HW_${labels[1]}`
  );
};

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
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
