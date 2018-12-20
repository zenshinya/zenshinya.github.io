let canvas, context;

let overallTiming = 0;
let cTiming = 0;
const fps = 60;
const fpsInterval = 1000 / fps;
let thenTime;

// 1s travel 140
const sps = 110;
const spfps = sps / fps;

let bossRotation = 180;
const bossSize = 220;
let isBossMovable = false;
let bossTarget = 1;
let bossLocation;

let startHW = false;
let isMouseEventAdded = false;
let playerMousePos = {};

let step = 1;
let explosions = [];

// HW2 use
let firstPass = false;

gameStart = () => {
  console.log("game start");
  canvas = document.getElementById("hello-world");
  context = canvas.getContext("2d");

  if (!isMouseEventAdded) {
    // Set mouse event
    canvas.addEventListener(
      "mousemove",
      e => {
        playerMousePos = getMousePos(canvas, e);
      },
      false
    );
    isMouseEventAdded = true;
  }

  startHW = false;
  overallTiming = 0;
  cTiming = 0;
  bossRotation = 180;
  isBossMovable = false;
  bossTarget = 1;
  bossLocation = {
    x: canvas.width / 2,
    y: canvas.height / 2
  };
  thenTime = Date.now();

  step = 1;
  explosions = [];
  firstPass = false;

  gameLoop();
};

getMousePos = (canvas, e) => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
};

drawBoss = (canvas, context) => {
  const img = document.getElementById("boss-circle");
  let rad = bossRotation * (Math.PI / 180);

  if (isBossMovable) {
    let targetX = userData[bossTarget].cPos.x + PLAYER_IMAGE_SIZE / 2;
    let targetY = userData[bossTarget].cPos.y + PLAYER_IMAGE_SIZE / 2;

    const xDist = bossLocation.x - targetX;
    const yDist = bossLocation.y - targetY;
    const distance = Math.sqrt(xDist * xDist + yDist * yDist);
    const cRad = Math.atan(yDist / xDist);

    // Max melee range
    if (distance > (bossSize + 100) / 2) {
      if (distance > spfps) {
        const xC = Math.abs(spfps * Math.cos(cRad));
        const yC = Math.abs(spfps * Math.sin(cRad));

        if (xDist > 0) {
          bossLocation.x -= xC;
        } else if (xDist < 0) {
          bossLocation.x += xC;
        }
        if (yDist > 0) {
          bossLocation.y -= yC;
        } else if (yDist < 0) {
          bossLocation.y += yC;
        }
      } else {
        bossLocation.x = targetX;
        bossLocation.y = targetY;
      }
    }

    const nextBossRotation =
      ((2 * Math.atan(yDist / (xDist + distance)) * 180) / Math.PI - 90 + 360) %
      360;
    const ROTATE_ANGLE = 5;

    const difference = Math.abs(nextBossRotation - bossRotation);
    const anotherDiff = 360 - difference;

    if (difference < anotherDiff) {
      if (nextBossRotation < bossRotation) {
        bossRotation -= Math.min(ROTATE_ANGLE, difference);
      } else {
        bossRotation += Math.min(ROTATE_ANGLE, difference);
      }
    } else {
      if (nextBossRotation < bossRotation) {
        bossRotation += Math.min(ROTATE_ANGLE, anotherDiff);
        bossRotation = bossRotation % 360;
      } else {
        bossRotation -= Math.min(ROTATE_ANGLE, anotherDiff);
        if (bossRotation < 0) {
          bossRotation += 360;
        }
      }
    }
  }

  rotateImage(
    context,
    img,
    rad,
    bossLocation.x,
    bossLocation.y,
    bossSize / 2,
    bossSize / 2
  );
};

rotateImage = (
  context,
  image,
  angleInRad,
  positionX,
  positionY,
  axisX,
  axisY
) => {
  context.translate(positionX, positionY);
  context.rotate(angleInRad);
  context.drawImage(image, -axisX, -axisY);
  context.rotate(-angleInRad);
  context.translate(-positionX, -positionY);
};

drawCircle = (radius, context, strokeColor, hasFill, fillColor, x, y) => {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.lineWidth = 3;
  if (strokeColor) {
    context.strokeStyle = strokeColor;
    context.stroke();
  }
  if (hasFill) {
    context.fillStyle = fillColor;
    context.fill();
  }
};

const ARENA_RADIUS = 320;
drawArena = (canvas, context) => {
  // Draw arena
  drawCircle(
    ARENA_RADIUS,
    context,
    "white",
    true,
    "#333",
    canvas.width / 2,
    canvas.height / 2
  );
  for (let i = 0; i < 8; i += 1) {
    drawCircle(
      i * 40,
      context,
      "#444",
      false,
      "black",
      canvas.width / 2,
      canvas.height / 2
    );
  }

  // Draw center dot
  context.beginPath();
  context.arc(canvas.width / 2, canvas.height / 2, 3, 0, 2 * Math.PI);
  context.lineWidth = 5;
  context.strokeStyle = "#444";
  context.stroke();
  context.fillStyle = "#333";
  context.fill();

  // Draw markers
  const fontSize = 30;
  const markerCircleRadius = ARENA_RADIUS - fontSize + 10;
  const degreeOffSet = 21;
  drawMarker(canvas, context, fontSize, markerCircleRadius, "red", "A", 90);
  drawMarker(
    canvas,
    context,
    fontSize,
    markerCircleRadius,
    "yellow",
    "B",
    0 + degreeOffSet
  );
  drawMarker(
    canvas,
    context,
    fontSize,
    markerCircleRadius,
    "skyblue",
    "C",
    270
  );
  drawMarker(
    canvas,
    context,
    fontSize,
    markerCircleRadius,
    "magenta",
    "D",
    180 - degreeOffSet
  );

  const numDegreeOffSet = 42;
  drawMarker(
    canvas,
    context,
    fontSize,
    markerCircleRadius,
    "red",
    "1",
    270 - numDegreeOffSet,
    true
  );
  drawMarker(
    canvas,
    context,
    fontSize,
    markerCircleRadius,
    "yellow",
    "2",
    270 + numDegreeOffSet,
    true
  );
};

function AoeExplosion(context, radius, x, y) {
  this.timing = 0;
  this.x = x;
  this.y = y;
  this.context = context;
  this.maxRadius = radius;

  this.animate = () => {
    if (this.timing < 0.2 * fps) {
      drawCircle(
        this.maxRadius * (this.timing / fps) * 5,
        this.context,
        null,
        true,
        `rgba(53, 36, 96, ${0.7})`,
        this.x,
        this.y
      );
    } else if (this.timing < 0.5 * fps) {
      drawCircle(
        this.maxRadius,
        this.context,
        null,
        true,
        `rgba(53, 36, 96, ${0.7})`,
        this.x,
        this.y
      );
    } else if (this.timing < 1.2 * fps) {
      drawCircle(
        this.maxRadius,
        this.context,
        null,
        true,
        `rgba(53, 36, 96, ${0.7 - (this.timing / fps - 0.5)})`,
        this.x,
        this.y
      );
    }
    this.timing += 1;
  };
}

function Tower(context, x, y) {
  this.timing = 0;
  this.x = x;
  this.y = y;
  this.context = context;
  this.maxRadius = 100;

  this.animate = () => {
    if (this.timing < 0.2 * fps) {
      drawCircle(
        this.maxRadius * (this.timing / fps) * 5,
        this.context,
        null,
        true,
        `rgba(255, 255, 255, ${0.5})`,
        this.x,
        this.y
      );
    } else if (this.timing < 6 * fps) {
      drawCircle(
        this.maxRadius,
        this.context,
        null,
        true,
        `rgba(255, 255, 255, ${0.5})`,
        this.x,
        this.y
      );
    } else if (this.timing < 6.5 * fps) {
      drawCircle(
        this.maxRadius,
        this.context,
        null,
        true,
        `rgba(255, 255, 255, ${0.5 - (this.timing / fps - 6)}`,
        this.x,
        this.y
      );
    }
    this.timing += 1;
  };
}

drawMarker = (
  canvas,
  context,
  fontSize,
  markerCircleRadius,
  color,
  letter,
  degree,
  isSquare
) => {
  const markerRadius = 20;
  const rad = degree * (Math.PI / 180);
  const x = canvas.width / 2 + markerCircleRadius * Math.cos(rad);
  const y =
    canvas.height / 2 - markerCircleRadius * Math.sin(rad) + markerRadius / 2;

  context.font = `${fontSize}px Arial`;
  context.fillStyle = color;
  context.textAlign = "center";
  context.fillText(letter, x, y);

  if (!isSquare) {
    context.beginPath();
    context.arc(x, y - markerRadius / 2, markerRadius, 0, 2 * Math.PI);
    context.lineWidth = 2;
    context.strokeStyle = color;
    context.stroke();
  } else {
    context.beginPath();
    context.rect(
      x - markerRadius,
      y - markerRadius - fontSize / 2 + 5,
      markerRadius * 2,
      markerRadius * 2
    );
    context.strokeStyle = color;
    context.stroke();
  }
};

drawCountdown = (canvas, context, number, delay) => {
  context.beginPath();
  context.rect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "rgba(0,0,0,0.8)";
  context.fill();

  context.globalAlpha = 1;
  const fontSize = 200 - delay;
  context.font = `${fontSize}px Arial`;
  const fade = Math.max(0, 1 - delay / 50);
  context.fillStyle = `rgba(255,255,0,${fade})`;
  context.textAlign = "center";
  context.fillText(number, canvas.width / 2, canvas.height / 2 + fontSize / 2);
  context.globalAlpha = 1;
};

drawHWCastBar = (canvas, context, timing, HW_CASTING_TIME, givenText) => {
  const castBarWidth = 240;
  const castBarHeight = 10;

  // Inner
  context.beginPath();
  context.rect(
    (canvas.width - castBarWidth) / 2,
    (canvas.height - castBarHeight) / 2,
    (timing / (HW_CASTING_TIME * fps)) * castBarWidth,
    castBarHeight
  );
  context.fillStyle = "white";
  context.fill();

  // Outline
  context.beginPath();
  context.rect(
    (canvas.width - castBarWidth) / 2,
    (canvas.height - castBarHeight) / 2,
    castBarWidth,
    castBarHeight
  );
  context.strokeStyle = "#897e29";
  context.stroke();

  // Hello, World text
  const txtX = canvas.width / 2 + 50;
  const txtY = canvas.height / 2;
  const text = givenText;
  context.font = "24px Arial";
  context.strokeStyle = "897e29";
  context.lineWidth = 3;
  context.strokeText(text, txtX, txtY);
  context.fillStyle = "white";
  context.fillText(text, txtX, txtY);
};

const PLAYER_IMAGE_SIZE = 40;
drawPlayers = context => {
  // TODO TEMP REMOVE USER CONTROL
  chosenUserDataIndex = -1;

  let userImageToDraw = null;

  userData.forEach((player, idx) => {
    const img = document.getElementById(`${player.role}-image`);

    let nextX = player.nPos.x;
    let nextY = player.nPos.y;

    // If is user, check with cursor position
    if (chosenUserDataIndex === idx) {
      nextX = playerMousePos.x - PLAYER_IMAGE_SIZE / 2 || nextX;
      nextY = playerMousePos.y - PLAYER_IMAGE_SIZE / 2 || nextY;
    }

    if (player.cPos.x !== nextX || player.cPos.y !== nextY) {
      const xDist = player.cPos.x - nextX;
      const yDist = player.cPos.y - nextY;

      const distance = Math.sqrt(xDist * xDist + yDist * yDist);
      const dDegree = Math.atan(yDist / xDist);

      if (distance > spfps) {
        const xC = Math.abs(spfps * Math.cos(dDegree));
        const yC = Math.abs(spfps * Math.sin(dDegree));

        if (xDist > 0) {
          player.cPos.x -= xC;
        } else if (xDist < 0) {
          player.cPos.x += xC;
        }
        if (yDist > 0) {
          player.cPos.y -= yC;
        } else if (yDist < 0) {
          player.cPos.y += yC;
        }
      } else {
        player.cPos.x = nextX;
        player.cPos.y = nextY;
      }
    }

    if (chosenUserDataIndex !== idx) {
      context.drawImage(
        img,
        player.cPos.x,
        player.cPos.y,
        PLAYER_IMAGE_SIZE,
        PLAYER_IMAGE_SIZE
      );
    } else {
      userImageToDraw = {
        img,
        x: player.cPos.x,
        y: player.cPos.y
      };
    }
  });

  // Draw user image last
  if (userImageToDraw) {
    context.shadowBlur = 20;
    context.shadowColor = "white";
    context.drawImage(
      userImageToDraw.img,
      userImageToDraw.x,
      userImageToDraw.y,
      PLAYER_IMAGE_SIZE,
      PLAYER_IMAGE_SIZE
    );
    context.shadowColor = "transparent";
  }
};

drawDebuff = (context, timing) => {
  const second = Math.floor(timing / fps);
  let updateTiming = false;
  if (cTiming != Math.floor(timing / fps)) {
    cTiming = second;
    updateTiming = true;
  }
  userData.forEach((player, i) => {
    let dbmY = 0;
    player.debuff.forEach(dbm => {
      if (dbm.timing) {
        const img = document.getElementById(`debuff-${dbm.icon}`);
        const x = i * 30;
        const y = dbmY * 60;
        context.drawImage(img, x, y);
        context.font = "12px Arial";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText(`${dbm.timing}s`, x + 10, y + 40);
        if (updateTiming) {
          dbm.timing -= 1;
        }
        dbmY += 1;
      }
    });
  });
};

gameLoop = () => {
  requestAnimFrame(gameLoop);

  const elapsed = Date.now() - thenTime;

  // Real fps loop
  if (elapsed > fpsInterval) {
    thenTime = Date.now() - (elapsed % fpsInterval);

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawArena(canvas, context);
    drawBoss(canvas, context);
    drawPlayers(context);

    gameLogic(canvas, context, overallTiming);

    if (startHW) {
      drawDebuff(context, overallTiming);
    }

    overallTiming += 1;
  }
};

const START_COUNTDOWN_TIME = 5;
const HW_CASTING_TIME = 6;
const STACK_AOE = 90;
gameLogic = (canvas, context, timing) => {
  // console.log(playerMousePos);

  if (step === 13) {
    console.log("success!");
  } else if (step === 12) {
    if (timing === 1) {
      userData.forEach(p => {
        p.nPos.x = 345 + (Math.floor(Math.random() * 30) - 15);
        p.nPos.y = 500 + (Math.floor(Math.random() * 30) - 15);
      });
    }
    if (timing < HW_CASTING_TIME * fps) {
      isBossMovable = false;
      drawHWCastBar(canvas, context, timing, HW_CASTING_TIME, "Ion Efflux");
    } else {
      step += 1;
      overallTiming = 0;
    }
  }
  // 4 explosions
  else if (step === 11) {
    if (timing === 1) {
      // HEALER 1 gets OD
      userData[2].debuff.push({
        icon: MECHANICS.OD,
        timing: TIMINGS[MECHANICS.OD]
      });
      // DPS 1 gets OD
      userData[4].debuff.push({
        icon: MECHANICS.OD,
        timing: TIMINGS[MECHANICS.OD]
      });
      // DPS 2 gets OD
      userData[5].debuff.push({
        icon: MECHANICS.OD,
        timing: TIMINGS[MECHANICS.OD]
      });
      // DPS 4 gets OD
      userData[7].debuff.push({
        icon: MECHANICS.OD,
        timing: TIMINGS[MECHANICS.OD]
      });

      explosions = [];

      // COB explosion
      const newCob1 = new AoeExplosion(
        context,
        ARENA_RADIUS,
        userData[2].cPos.x + PLAYER_IMAGE_SIZE / 2,
        userData[2].cPos.y + PLAYER_IMAGE_SIZE / 2
      );

      // COB explosion
      const newCob2 = new AoeExplosion(
        context,
        ARENA_RADIUS,
        userData[4].cPos.x + PLAYER_IMAGE_SIZE / 2,
        userData[4].cPos.y + PLAYER_IMAGE_SIZE / 2
      );

      // COB explosion
      const newCob3 = new AoeExplosion(
        context,
        ARENA_RADIUS,
        userData[5].cPos.x + PLAYER_IMAGE_SIZE / 2,
        userData[5].cPos.y + PLAYER_IMAGE_SIZE / 2
      );

      // COB explosion
      const newCob4 = new AoeExplosion(
        context,
        ARENA_RADIUS,
        userData[7].cPos.x + PLAYER_IMAGE_SIZE / 2,
        userData[7].cPos.y + PLAYER_IMAGE_SIZE / 2
      );

      explosions.push(newCob1);
      explosions.push(newCob2);
      explosions.push(newCob3);
      explosions.push(newCob4);
    }

    if (timing === 2 * fps) {
      step += 1;
      overallTiming = 0;
    }

    explosions.forEach(aoe => {
      aoe.animate();
    });
  } else if (step === 10) {
    if (timing === 1) {
      // TANK 1 move
      userData[0].nPos.x = 150 - PLAYER_IMAGE_SIZE / 2;
      userData[0].nPos.y = 575 - PLAYER_IMAGE_SIZE / 2;
      // TANK 2 move
      userData[1].nPos.x = 145 - PLAYER_IMAGE_SIZE / 2;
      userData[1].nPos.y = 570 - PLAYER_IMAGE_SIZE / 2;
      // Healer 1 move
      userData[2].nPos.x = 550 - PLAYER_IMAGE_SIZE / 2;
      userData[2].nPos.y = 570 - PLAYER_IMAGE_SIZE / 2;
      // HEALER 2 move
      userData[3].nPos.x = 155 - PLAYER_IMAGE_SIZE / 2;
      userData[3].nPos.y = 570 - PLAYER_IMAGE_SIZE / 2;
      // DPS 1 move
      userData[4].nPos.x = 630 - PLAYER_IMAGE_SIZE / 2;
      userData[4].nPos.y = 245 - PLAYER_IMAGE_SIZE / 2;
      // DPS 2 move
      userData[5].nPos.x = 70 - PLAYER_IMAGE_SIZE / 2;
      userData[5].nPos.y = 245 - PLAYER_IMAGE_SIZE / 2;
      // DPS 3 move
      userData[6].nPos.x = 140 - PLAYER_IMAGE_SIZE / 2;
      userData[6].nPos.y = 575 - PLAYER_IMAGE_SIZE / 2;
      // DPS 4 move
      userData[7].nPos.x = 350 - PLAYER_IMAGE_SIZE / 2;
      userData[7].nPos.y = 50 - PLAYER_IMAGE_SIZE / 2;
    }

    if (chosenMode === 2) {
      if (timing === 1 * fps) {
        // CUB explosion
        const newCUB1 = new AoeExplosion(
          context,
          STACK_AOE,
          userData[4].cPos.x + PLAYER_IMAGE_SIZE / 2,
          userData[4].cPos.y + PLAYER_IMAGE_SIZE / 2
        );
        // CUB explosion
        const newCUB2 = new AoeExplosion(
          context,
          STACK_AOE,
          userData[5].cPos.x + PLAYER_IMAGE_SIZE / 2,
          userData[5].cPos.y + PLAYER_IMAGE_SIZE / 2
        );
        explosions.push(newCUB1);
        explosions.push(newCUB2);

        // Remove CLD from DPS 1,2
        userData[4].debuff.map(d => {
          if (d.icon === MECHANICS.CLD) {
            d.timing = 0;
          }
          return d;
        });
        userData[5].debuff.map(d => {
          if (d.icon === MECHANICS.CLD) {
            d.timing = 0;
          }
          return d;
        });

        userData[4].debuff.push({
          icon: MECHANICS.UD,
          timing: TIMINGS[MECHANICS.UD]
        });
        userData[5].debuff.push({
          icon: MECHANICS.UD,
          timing: TIMINGS[MECHANICS.UD]
        });
      }

      if (timing === 2 * fps) {
        // CUB explosion
        const newCUB3 = new AoeExplosion(
          context,
          STACK_AOE,
          userData[7].cPos.x + PLAYER_IMAGE_SIZE / 2,
          userData[7].cPos.y + PLAYER_IMAGE_SIZE / 2
        );
        explosions.push(newCUB3);

        // Remove CLD from DPS 4
        userData[7].debuff.map(d => {
          if (d.icon === MECHANICS.CLD) {
            d.timing = 0;
          }
          return d;
        });

        userData[7].debuff.push({
          icon: MECHANICS.UD,
          timing: TIMINGS[MECHANICS.UD]
        });
      }
    }

    if (timing === 5 * fps) {
      step += 1;
      overallTiming = 0;
    }

    // HW 2 TOWERS
    if (chosenMode === 2) {
      explosions.forEach(aoe => {
        aoe.animate();
      });
    }
  }
  // Critical Error
  else if (step === 9) {
    if (timing === 1) {
      // HEALER 1 gets COB
      userData[2].debuff.push({
        icon: MECHANICS.COB,
        timing: TIMINGS[MECHANICS.COB]
      });
      // DPS 1 gets COB
      userData[4].debuff.push({
        icon: MECHANICS.COB,
        timing: TIMINGS[MECHANICS.COB]
      });
      // DPS 2 gets COB
      userData[5].debuff.push({
        icon: MECHANICS.COB,
        timing: TIMINGS[MECHANICS.COB]
      });
      // DPS 4 gets COB
      userData[7].debuff.push({
        icon: MECHANICS.COB,
        timing: TIMINGS[MECHANICS.COB]
      });
    }

    if (timing < 1 * fps) {
      const radius = timing * 20;
      context.beginPath();
      context.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
      context.rect(canvas.width, 0, -canvas.width, canvas.height);
      context.fillStyle = "rgba(103, 49, 137, 0.5)";
      context.fill();
    }

    if (timing === 3 * fps) {
      step += 1;
      overallTiming = 0;
    }

    // HW 2 TOWERS
    if (chosenMode === 2) {
      if (timing === 1 * fps) {
        // DPS 1 gets CLD
        userData[4].debuff.push({
          icon: MECHANICS.CLD,
          timing: TIMINGS[MECHANICS.CLD]
        });
        // DPS 2 gets CLD
        userData[5].debuff.push({
          icon: MECHANICS.CLD,
          timing: TIMINGS[MECHANICS.CLD]
        });
        // DPS 4 gets CLD
        userData[7].debuff.push({
          icon: MECHANICS.CLD,
          timing: TIMINGS[MECHANICS.CLD]
        });
      }

      explosions.forEach(aoe => {
        aoe.animate();
      });
    }
  }
  // Starting Critical error cast
  else if (step === 8) {
    if (timing < HW_CASTING_TIME * fps) {
      isBossMovable = false;
      drawHWCastBar(canvas, context, timing, HW_CASTING_TIME, "Critical Error");
    } else {
      step += 1;
      overallTiming = 0;
      isBossMovable = true;
    }

    // HW 2 CUB
    if (chosenMode === 2) {
      if (timing === 1 * fps) {
        explosions = [];

        // Towers
        const newTower1 = new Tower(
          context,
          canvas.width / 2,
          canvas.height / 2
        );
        const newTower2 = new Tower(
          context,
          canvas.width / 2 + 230,
          canvas.height / 2
        );
        const newTower3 = new Tower(
          context,
          canvas.width / 2 - 230,
          canvas.height / 2
        );
        explosions.push(newTower1, newTower2, newTower3);
      }

      if (timing === 2 * fps) {
        // DPS 1 move to right tower
        userData[4].nPos.x = canvas.width / 2 + 230 - PLAYER_IMAGE_SIZE / 2;
        userData[4].nPos.y = canvas.height / 2 - PLAYER_IMAGE_SIZE / 2;

        // DPS 2 move to left tower
        userData[5].nPos.x = canvas.width / 2 - 230 - PLAYER_IMAGE_SIZE / 2;
        userData[5].nPos.y = canvas.height / 2 - PLAYER_IMAGE_SIZE / 2;

        // DPS 4 move to center tower
        userData[7].nPos.x = canvas.width / 2 - PLAYER_IMAGE_SIZE / 2;
        userData[7].nPos.y = canvas.height / 2 - PLAYER_IMAGE_SIZE / 2;
      }

      if (timing === 3 * fps + 1) {
        // CUB explosion
        const newCUB = new AoeExplosion(
          context,
          STACK_AOE,
          userData[0].cPos.x + PLAYER_IMAGE_SIZE / 2,
          userData[0].cPos.y + PLAYER_IMAGE_SIZE / 2
        );
        explosions.push(newCUB);

        userData[0].debuff.push({
          icon: MECHANICS.UD,
          timing: TIMINGS[MECHANICS.UD]
        });
      }

      explosions.forEach(aoe => {
        aoe.animate();
      });
    }
  } else if (step === 7) {
    if (timing === 1) {
      // DPS 1 move
      userData[4].nPos.x = 335 - PLAYER_IMAGE_SIZE / 2;
      userData[4].nPos.y = 470 - PLAYER_IMAGE_SIZE / 2;

      // DPS 2 move
      userData[5].nPos.x = 345 - PLAYER_IMAGE_SIZE / 2;
      userData[5].nPos.y = 480 - PLAYER_IMAGE_SIZE / 2;

      // DPS 4 remove 8s
      userData[7].debuff[0] = {
        icon: MECHANICS.SD,
        timing: TIMINGS[MECHANICS.SD]
      };
      userData[7].nPos.x = 355 - PLAYER_IMAGE_SIZE / 2;
      userData[7].nPos.y = 470 - PLAYER_IMAGE_SIZE / 2;

      explosions = [];

      // 8s explosion
      const new8s = new AoeExplosion(
        context,
        STACK_AOE,
        userData[7].cPos.x + PLAYER_IMAGE_SIZE / 2,
        userData[7].cPos.y + PLAYER_IMAGE_SIZE / 2
      );

      explosions.push(new8s);
    }

    if (timing === 1.5 * fps) {
      step += 1;
      overallTiming = 0;
    }

    explosions.forEach(aoe => {
      aoe.animate();
    });
  } else if (step === 6) {
    if (timing === 1) {
      // Tank 2 from COB to OD
      userData[1].debuff[0] = {
        icon: MECHANICS.OD,
        timing: TIMINGS[MECHANICS.OD]
      };
      userData[1].nPos.x = 100 - PLAYER_IMAGE_SIZE / 2;
      userData[1].nPos.y = 520 - PLAYER_IMAGE_SIZE / 2;
      // Healer 1 remove 8s
      userData[2].debuff[0] = {
        icon: MECHANICS.SD,
        timing: TIMINGS[MECHANICS.SD]
      };
      // Healer 2 from COB to OD
      userData[3].debuff[0] = {
        icon: MECHANICS.OD,
        timing: TIMINGS[MECHANICS.OD]
      };
      userData[3].nPos.x = 90 - PLAYER_IMAGE_SIZE / 2;
      userData[3].nPos.y = 510 - PLAYER_IMAGE_SIZE / 2;
      // HW 2 Healer 2
      if (chosenMode === 2) {
        userData[3].debuff.push({
          icon: MECHANICS.UD,
          timing: TIMINGS[MECHANICS.UD]
        });
      }
      // DPS 3 from COB to OD
      userData[6].debuff[0] = {
        icon: MECHANICS.OD,
        timing: TIMINGS[MECHANICS.OD]
      };
      userData[6].nPos.x = 80 - PLAYER_IMAGE_SIZE / 2;
      userData[6].nPos.y = 500 - PLAYER_IMAGE_SIZE / 2;

      explosions = [];

      // COB explosion
      const newCob1 = new AoeExplosion(
        context,
        ARENA_RADIUS,
        userData[1].cPos.x + PLAYER_IMAGE_SIZE / 2,
        userData[1].cPos.y + PLAYER_IMAGE_SIZE / 2
      );

      // COB explosion
      const newCob2 = new AoeExplosion(
        context,
        ARENA_RADIUS,
        userData[3].cPos.x + PLAYER_IMAGE_SIZE / 2,
        userData[3].cPos.y + PLAYER_IMAGE_SIZE / 2
      );

      // COB explosion
      const newCob3 = new AoeExplosion(
        context,
        ARENA_RADIUS,
        userData[6].cPos.x + PLAYER_IMAGE_SIZE / 2,
        userData[6].cPos.y + PLAYER_IMAGE_SIZE / 2
      );

      // 8s explosion
      const new8s = new AoeExplosion(
        context,
        STACK_AOE,
        userData[2].cPos.x + PLAYER_IMAGE_SIZE / 2,
        userData[2].cPos.y + PLAYER_IMAGE_SIZE / 2
      );

      // HW 2 CUB
      if (chosenMode === 2) {
        // CUB explosion
        const newCUB = new AoeExplosion(
          context,
          STACK_AOE,
          userData[3].cPos.x + PLAYER_IMAGE_SIZE / 2,
          userData[3].cPos.y + PLAYER_IMAGE_SIZE / 2
        );
        explosions.push(newCUB);
      }

      explosions.push(newCob1);
      explosions.push(newCob2);
      explosions.push(newCob3);
      explosions.push(new8s);
    }

    // HW2, DPS special movement
    if (chosenMode === 2 && timing === 1) {
      userData[4].nPos.x = 345 - PLAYER_IMAGE_SIZE / 2;
      userData[4].nPos.y = 650 - PLAYER_IMAGE_SIZE / 2;
      userData[5].nPos.x = 345 - PLAYER_IMAGE_SIZE / 2;
      userData[5].nPos.y = 650 - PLAYER_IMAGE_SIZE / 2;
    }

    // HW2 dps received rot
    if (chosenMode === 2 && timing === 2 * fps) {
      userData[4].nPos.x = 365 - PLAYER_IMAGE_SIZE / 2;
      userData[4].nPos.y = 550 - PLAYER_IMAGE_SIZE / 2;
      userData[5].nPos.x = 245 - PLAYER_IMAGE_SIZE / 2;
      userData[5].nPos.y = 625 - PLAYER_IMAGE_SIZE / 2;

      userData[4].debuff.push({
        icon: MECHANICS.CUB,
        timing: TIMINGS[MECHANICS.CUB]
      });
      userData[5].debuff.push({
        icon: MECHANICS.CUB,
        timing: TIMINGS[MECHANICS.CUB]
      });
    }

    // HW2 dps received rot
    if (chosenMode === 2 && timing === 2.5 * fps) {
      userData[7].debuff.push({
        icon: MECHANICS.CUB,
        timing: TIMINGS[MECHANICS.CUB]
      });
    }

    if (timing === 4 * fps) {
      step += 1;
      overallTiming = 0;
    }

    explosions.forEach(aoe => {
      aoe.animate();
    });
  } else if (step === 5) {
    if (timing === 1) {
      // DPS 2 remove 12s
      userData[5].debuff[0] = {
        icon: MECHANICS.SD,
        timing: TIMINGS[MECHANICS.SD]
      };
      // DPS 4 to 8s
      userData[7].debuff[0] = {
        icon: MECHANICS.CSB8,
        timing: TIMINGS[MECHANICS.CSB8]
      };

      // 12s explosion
      const new12s = new AoeExplosion(
        context,
        STACK_AOE,
        userData[5].cPos.x + PLAYER_IMAGE_SIZE / 2,
        userData[5].cPos.y + PLAYER_IMAGE_SIZE / 2
      );
      explosions.push(new12s);
    }

    if (timing === 3 * fps) {
      step += 1;
      overallTiming = 0;
    }

    explosions.forEach(aoe => {
      aoe.animate();
    });
  } else if (step === 4) {
    // Update players' debuff
    if (timing === 3 * fps) {
      // Boss target TANK 1
      bossTarget = 0;

      // Tank 1 from COB to OD
      userData[0].debuff[0] = {
        icon: MECHANICS.OD,
        timing: TIMINGS[MECHANICS.OD]
      };
      // If HW1, move
      if (chosenMode === 1) {
        userData[0].nPos.y = 650 - PLAYER_IMAGE_SIZE / 2;
      }
      // Tank 2 from LD to OD
      userData[1].debuff[0] = {
        icon: MECHANICS.COB,
        timing: TIMINGS[MECHANICS.COB]
      };
      userData[1].nPos.y = 50 - PLAYER_IMAGE_SIZE / 2;
      // HEALER 1 from LD to 8s
      userData[2].debuff[0] = {
        icon: MECHANICS.CSB8,
        timing: TIMINGS[MECHANICS.CSB8]
      };
      // HEALER 2 from None to COB
      userData[3].debuff.push({
        icon: MECHANICS.COB,
        timing: TIMINGS[MECHANICS.COB]
      });
      // If HW1, move else HW2 stay
      if (chosenMode === 1) {
        userData[3].nPos.x = 630 - PLAYER_IMAGE_SIZE / 2;
        userData[3].nPos.y = 245 - PLAYER_IMAGE_SIZE / 2;
      }
      // DPS 1 remove 8s
      userData[4].debuff[0] = {
        icon: MECHANICS.SD,
        timing: TIMINGS[MECHANICS.SD]
      };
      // DPS 3 from LD to COB
      userData[6].debuff[0] = {
        icon: MECHANICS.COB,
        timing: TIMINGS[MECHANICS.COB]
      };
      userData[6].nPos.x = 70 - PLAYER_IMAGE_SIZE / 2;
      userData[6].nPos.y = 245 - PLAYER_IMAGE_SIZE / 2;

      // COB explosion
      const newCob = new AoeExplosion(
        context,
        ARENA_RADIUS,
        userData[0].cPos.x + PLAYER_IMAGE_SIZE / 2,
        userData[0].cPos.y + PLAYER_IMAGE_SIZE / 2
      );
      explosions.push(newCob);

      // 8s explosion
      const new8s = new AoeExplosion(
        context,
        STACK_AOE,
        userData[4].cPos.x + PLAYER_IMAGE_SIZE / 2,
        userData[4].cPos.y + PLAYER_IMAGE_SIZE / 2
      );
      explosions.push(new8s);
    }

    // HW2 special tank and healer movement
    if (chosenMode === 2 && timing >= 3 * fps && timing < 5 * fps) {
      // TANK move to healer
      if (!firstPass) {
        userData[0].nPos.x = 485 - PLAYER_IMAGE_SIZE / 2;
        userData[0].nPos.y = 175 - PLAYER_IMAGE_SIZE / 2;
      } else {
        // Tank move
        userData[0].nPos.x = 330;
        userData[0].nPos.y = 650 - PLAYER_IMAGE_SIZE / 2;
        // Healer move
        userData[3].nPos.x = 630 - PLAYER_IMAGE_SIZE / 2;
        userData[3].nPos.y = 245 - PLAYER_IMAGE_SIZE / 2;
      }

      if (
        !firstPass &&
        Math.abs(userData[0].cPos.x - userData[0].nPos.x) <= 5 &&
        Math.abs(userData[0].cPos.y - userData[0].nPos.y) <= 5
      ) {
        firstPass = true;

        userData[0].debuff.push({
          icon: MECHANICS.CUB,
          timing: TIMINGS[MECHANICS.CUB]
        });
      }
    }

    if (timing === 7 * fps) {
      step += 1;
      overallTiming = 0;
    }

    explosions.forEach(aoe => {
      aoe.animate();
    });
  }
  // Transition
  else if (step === 3) {
    // Initialise positions
    if (timing === 1) {
      // Tank 1 - COB
      userData[0].nPos.x = 350 - PLAYER_IMAGE_SIZE / 2;
      userData[0].nPos.y = 50 - PLAYER_IMAGE_SIZE / 2;

      // Tank 2 - LD
      userData[1].nPos.x = 350 - PLAYER_IMAGE_SIZE / 2;
      userData[1].nPos.y = 230 - PLAYER_IMAGE_SIZE / 2;

      // Healer 1 - LD
      userData[2].nPos.x = 460 - PLAYER_IMAGE_SIZE / 2;
      userData[2].nPos.y = 625 - PLAYER_IMAGE_SIZE / 2;

      // Healer 2 - None
      userData[3].nPos.x = 485 - PLAYER_IMAGE_SIZE / 2;
      userData[3].nPos.y = 175 - PLAYER_IMAGE_SIZE / 2;

      // DPS 1 - 8s
      userData[4].nPos.x = 445 - PLAYER_IMAGE_SIZE / 2;
      userData[4].nPos.y = 610 - PLAYER_IMAGE_SIZE / 2;

      // DPS 2 - 13s
      userData[5].nPos.x = 245 - PLAYER_IMAGE_SIZE / 2;
      userData[5].nPos.y = 625 - PLAYER_IMAGE_SIZE / 2;

      // DPS 3 - LD
      userData[6].nPos.x = 210 - PLAYER_IMAGE_SIZE / 2;
      userData[6].nPos.y = 175 - PLAYER_IMAGE_SIZE / 2;

      // DPS 4 - None
      userData[7].nPos.x = 260 - PLAYER_IMAGE_SIZE / 2;
      userData[7].nPos.y = 610 - PLAYER_IMAGE_SIZE / 2;
    }

    if (timing < 0.8 * fps) {
      const radius = 960 - timing * 20;
      context.beginPath();
      context.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
      context.rect(canvas.width, 0, -canvas.width, canvas.height);
      context.fillStyle = "rgba(61, 9, 94, 0.5)";
      context.fill();
    } else if (timing < 1.6 * fps) {
      const radius = (timing - 0.8 * fps) * 20;
      context.beginPath();
      context.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
      context.rect(canvas.width, 0, -canvas.width, canvas.height);
      context.fillStyle = "rgba(103, 49, 137, 0.5)";
      context.fill();
    } else if (timing > 2.5 * fps && timing < 3.5 * fps) {
      context.beginPath();
      context.rect(0, 0, canvas.width, canvas.height);
      context.fillStyle = `rgba(255,255,255,${(timing - 2.5 * fps) / 60}`;
      context.fill();
    } else if (timing >= 3.5 * fps && timing < 4 * fps) {
      context.beginPath();
      context.rect(0, 0, canvas.width, canvas.height);
      context.fillStyle = `rgba(255,255,255,${1 - (timing - 3.5 * fps) / 30}`;
      context.fill();
    } else if (timing >= 5 * fps) {
      step += 1;
      overallTiming = 0;
      isBossMovable = true;
    }
  }
  // Starting Hello World cast bar
  else if (step === 2) {
    if (timing < HW_CASTING_TIME * fps) {
      drawHWCastBar(canvas, context, timing, HW_CASTING_TIME, "Hello, World");
    } else {
      step += 1;
      overallTiming = 0;
      startHW = true;

      // HW2 = HEALER 2 : CUB
      if (chosenMode === 2) {
        userData[3].debuff.push({
          icon: MECHANICS.CUB,
          timing: TIMINGS[MECHANICS.CUB]
        });
      }
    }
  }
  // Starting 5s
  else if (step === 1) {
    if (timing < START_COUNTDOWN_TIME * fps) {
      drawCountdown(
        canvas,
        context,
        START_COUNTDOWN_TIME - Math.floor(timing / fps),
        timing % fps
      );
    } else {
      step += 1;
      overallTiming = 0;
    }
  }
};

window.requestAnimFrame = (() => {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(/* function */ callback, /* DOMElement */ element) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();
