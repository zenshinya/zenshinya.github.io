const RADIUS = 500 / 2; // Based on arena' width|height
const ANGLE = 360 / 12;
const SPIN_RADIUS = 30;
const LINE_RADIUS = 60;
const SPIN_COLOR_RADIUS = 130;

$(document).ready(() => {
  initialise();
});

const initialise = () => {
  $("#arena").html("");

  const randomSpin = Math.round(Math.random() * 1);

  [...Array(12)].forEach((key, i) => {
    renderSpot(i, randomSpin);
  });

  renderLines();

  renderArm(randomSpin);

  renderBoss();

  const rotation = Math.round(Math.random() * 6) * 60; // multiple of 60
  $(".arena").css("transform", `rotate(${rotation}deg)`);
  $(".safe-spot").css("transform", `rotate(${-rotation}deg)`);
};

const renderBoss = () => {
  $("#arena").append(
    `<img src="assets/boss-circle.png" class="boss-circle" />`
  );
};

const renderLines = () => {
  // 2
  $("#arena").append(
    `<div class="line" style="position: absolute; left:${RADIUS -
      LINE_RADIUS}px; top: ${0}px; width: ${LINE_RADIUS *
      2}px; height: ${RADIUS * 2}px; transform: rotate(60deg);">&nbsp;</div>`
  );
};

const renderSpot = (pos, start) => {
  if (pos % 2 !== 0) {
    renderSafeSpot(pos, start);
  }
};

const renderSafeSpot = (pos, color) => {
  const x = (RADIUS - SPIN_RADIUS - 10) * Math.sin(toRadians(pos * ANGLE));
  const y = -1 * (RADIUS - SPIN_RADIUS - 10) * Math.cos(toRadians(pos * ANGLE));

  const isSafe = (color === 0 && pos === 1) || (color === 1 && pos === 3);

  $("#arena").append(
    `<div class="safe-spot" style="position: absolute; left:${x +
      RADIUS -
      SPIN_RADIUS}px; top: ${y + RADIUS - SPIN_RADIUS}px; width: ${SPIN_RADIUS *
      2}px; height: ${SPIN_RADIUS *
      2}px; border: 1px solid green; border-radius: 50%; text-align: center; line-height:${SPIN_RADIUS *
      2}px" onclick="clickSafe(${isSafe})">Safe?</div>`
  );
};

const clickSafe = isSafe => {
  if (isSafe) {
    alert("Safe! You are correct.");
  } else {
    alert("Wrong! You die.");
  }
};

const renderArm = color => {
  const x = 0;
  const y = 0;

  $("#arena").append(
    `<div class="arm-${color}" style="position: absolute; left:${x +
      RADIUS -
      SPIN_COLOR_RADIUS}px; top: ${y +
      RADIUS -
      SPIN_COLOR_RADIUS}px; width: ${SPIN_COLOR_RADIUS *
      2}px; height: ${SPIN_COLOR_RADIUS *
      2}px; border-radius: 50%;">&nbsp;</div>`
  );
};

const toRadians = angle => angle * (Math.PI / 180);

const restart = () => {
  initialise();
};
