const COLORS = [0, 0, 0, 1, 1, 1];
const RADIUS = 500 / 2; // Based on arena' width|height
const ANGLE = 360 / 12;
const SPIN_RADIUS = 50;

$(document).ready(() => {
  initialise();
});

const initialise = () => {
  $("#arena").html('');
  const randomStart = Math.floor(Math.random() * COLORS.length);
  const result = COLORS.concat(COLORS).splice(randomStart, 3);

  [...Array(12)].forEach((key, i) => {
    renderSpot(i, result, randomStart);
  });

  renderLines();
};

const renderLines = () => {
  // 0
  $("#arena").append(
    `<div class="line" style="position: absolute; left:${RADIUS -
      SPIN_RADIUS}px; top: ${0}px; width: ${SPIN_RADIUS *
      2}px; height: ${RADIUS * 2}px;">&nbsp;</div>`
  );
  // 2
  $("#arena").append(
    `<div class="line" style="position: absolute; left:${RADIUS -
      SPIN_RADIUS}px; top: ${0}px; width: ${SPIN_RADIUS *
      2}px; height: ${RADIUS * 2}px; transform: rotate(60deg);">&nbsp;</div>`
  );
  // 10
  $("#arena").append(
    `<div class="line" style="position: absolute; left:${RADIUS -
      SPIN_RADIUS}px; top: ${0}px; width: ${SPIN_RADIUS *
      2}px; height: ${RADIUS * 2}px; transform: rotate(-60deg); ">&nbsp;</div>`
  );
};

const renderSpot = (pos, result, start) => {
  if (pos % 2 !== 0) {
    renderSafeSpot(pos, start);
  } else if (pos === 0 || pos === 2 || pos === 4) {
    renderArm(pos, result);
  }
};

const renderSafeSpot = (pos, start) => {
  const x = (RADIUS - SPIN_RADIUS - 10) * Math.sin(toRadians(pos * ANGLE));
  const y = -1 * (RADIUS - SPIN_RADIUS - 10) * Math.cos(toRadians(pos * ANGLE));

  const checkA = (start + Math.floor(pos/2)) % COLORS.length;
  const checkB = (checkA + 1) % COLORS.length;

  let isSafe = false;
  if (COLORS[checkA] === 0 && COLORS[checkB] === 1) {
    isSafe = true;
  }

  $("#arena").append(
    `<div class="safe-spot" style="position: absolute; left:${x +
      RADIUS -
      SPIN_RADIUS}px; top: ${y + RADIUS - SPIN_RADIUS}px; width: ${SPIN_RADIUS *
      2}px; height: ${SPIN_RADIUS *
      2}px; border: 1px solid green; border-radius: 50%; text-align: center; line-height:${SPIN_RADIUS *
      2}px" onclick="clickSafe(${isSafe})">Safe?</div>`
  );
};

const clickSafe = (isSafe) => {
  if (isSafe) {
    alert("Safe! You are correct.");
  } else {
    alert("Wrong! You die.");
  }
}

const renderArm = (pos, result) => {
  const x = RADIUS * Math.sin(toRadians(pos * ANGLE));
  const y = -1 * RADIUS * Math.cos(toRadians(pos * ANGLE));

  let color;
  if (pos === 0) {
    color = result[0];
  } else if (pos === 2) {
    color = result[1];
  } else if (pos === 4) {
    color = result[2];
  }

  $("#arena").append(
    `<div class="arm-${color}" style="position: absolute; left:${x +
      RADIUS -
      SPIN_RADIUS}px; top: ${y + RADIUS - SPIN_RADIUS}px; width: ${SPIN_RADIUS *
      2}px; height: ${SPIN_RADIUS * 2}px; border-radius: 50%;">&nbsp;</div>`
  );
};

const toRadians = angle => angle * (Math.PI / 180);

const restart = () => {
  initialise();
}
