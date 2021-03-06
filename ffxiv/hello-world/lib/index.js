const ROLES = {
  TANK: "TANK",
  HEALER: "HEALER",
  DPS: "DPS"
};

const MECHANICS = {
  COB: "COB",
  LD: "LD",
  CSB8: "CSB8",
  CSB13: "CSB13",
  NONE: "NONE",

  OD: "OD",
  SD: "SD",

  CLD: "CLD",
  CUB: "CUB",
  UD: "UD"
};

const TIMINGS = {
  COB: 8,
  LD: 10,
  CSB8: 8,
  CSB13: 12,

  OD: 30,
  SD: 30,

  CLD: 8,
  CUB: 15,
  UD: 30
};

const ICONS = {
  COB: "cob",
  LD: "ld",
  CSB8: "csb",
  CSB13: "csb",
  NONE: "none",

  OD: "od",
  SD: "sd",

  CUB: "cub",
  UD: "ud"
};

const mechanics = {
  [ROLES.TANK]: [MECHANICS.COB, MECHANICS.LD],
  [ROLES.HEALER]: [MECHANICS.LD, MECHANICS.NONE],
  [ROLES.DPS]: [MECHANICS.CSB8, MECHANICS.CSB13, MECHANICS.LD, MECHANICS.NONE]
};

// Initialise
let currentStep = 1;
let chosenMode = 1;
let chosenRole;
let chosenMechanics;
let chosenUserDataIndex = -1;
let displayArray = [];

$(document).ready(() => {
  // const lang = getCookie("language");
  // setCookie("language", currentLanguage);

  $(`#step-${currentStep}`).css("display", "flex");
});

setNextStep = () => {
  setStep(1);
  displayOnBar();
};

setPreviousStep = () => {
  setStep(-1);
  displayArray.pop();
  displayOnBar();
};

setStep = increment => {
  $(`#step-${currentStep}`).css("display", "none");
  currentStep += increment;
  $(`#step-${currentStep}`).css("display", "flex");
};

showSuccess = () => {
  $(`#success-screen`).css("display", "flex");
};

showFailure = () => {
  $(`#failure-screen`).css("display", "flex");
};

conditionReturn = () => {
  displayArray = [];
  clearCanvas();
  $(`#success-screen`).css("display", "none");
  $(`#failure-screen`).css("display", "none");
  $(`#step-1`).css("display", "flex");
  currentStep = 1;
  checkTimer = 0;
  userData = JSON.parse(JSON.stringify(INITIAL_USER_DATA));
  displayOnBar();
};

displayOnBar = () => {
  $("#display-mode").text(displayArray.join(" > "));
};

onClickChooseMode = mode => {
  chosenMode = mode;
  displayArray.push(`Hello World #${mode}`);
  setNextStep();
};

onClickChooseWatch = () => {
  displayArray.push('SPECTATOR MODE');
  setNextStep();
  setNextStep();
  gameStart();
  chosenRole = null;
};

onClickChooseRole = role => {
  chosenRole = ROLES[role];
  generateMechanicButtonsForRole(role);
  displayArray.push(role);
  setNextStep();
};

generateMechanicButtonsForRole = role => {
  const buttons = mechanics[ROLES[role]].map(m => {
    return generateOneMechanicButton(m);
  });
  // Add random
  buttons.unshift(generateOneMechanicButton("random", true));
  $("#mechanics-container").html(buttons);
};

getRandomMechanic = () => {
  const m = mechanics[chosenRole];
  return m[Math.floor(Math.random() * m.length)];
};

generateMechanicHint = (name, isRandom) => {
  if (isRandom) {
    return "Random";
  }

  const timing = TIMINGS[name];
  // If has timing
  if (timing) {
    return `${TIMINGS[name]}s`;
  }

  if (name === MECHANICS.NONE) {
    return "No debuff";
  }
};

generateOneMechanicButton = (name, isRandom) => {
  return `<div class="mechanic-button"><img
  class="debuff-selection-button"
  src="assets/debuff-${isRandom ? name : ICONS[MECHANICS[name]]}.png"
  onclick="onClickChooseMechanics('${isRandom ? getRandomMechanic() : name}')"
/><span>${generateMechanicHint(name, isRandom)}</span></div>`;
};

onClickChooseMechanics = mechanic => {
  chosenMechanics = mechanic;
  chosenUserDataIndex = getUserDataIndex(chosenRole, chosenMechanics);

  if (chosenUserDataIndex < 0) {
    alert("Something went wrong, please refresh the page.");
  } else {
    displayArray.push(mechanic);
    setNextStep();
    gameStart();
  }
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
