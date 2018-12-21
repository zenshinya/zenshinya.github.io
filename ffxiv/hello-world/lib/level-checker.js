let checkTimer = 0;

levelChecker = canvas => {
  if (chosenUserDataIndex < 0) {
    checkTimer += 1;
    return;
  }

  const userX = userData[chosenUserDataIndex].cPos.x + PLAYER_IMAGE_SIZE / 2;
  const userY = userData[chosenUserDataIndex].cPos.y + PLAYER_IMAGE_SIZE / 2;

  // Fall off arena
  const distanceFromCenter = getCircleDistanceToPlayer(
    userX,
    userY,
    canvas.width / 2,
    canvas.height / 2
  );
  if (distanceFromCenter > ARENA_RADIUS) {
    failYou("WHY YOU DROP DOWN ARENA? FAIL!");
  }

  if (chosenUserDataIndex === 0) {
    checkTank1(userX, userY, checkTimer);
  }
  if (chosenUserDataIndex === 1) {
    checkTank2(userX, userY, checkTimer);
  }
  if (chosenUserDataIndex === 2) {
    checkHealer1(userX, userY, checkTimer);
  }
  if (chosenUserDataIndex === 3) {
    checkHealer2(userX, userY, checkTimer);
  }
  if (chosenUserDataIndex === 4) {
    checkDps1(userX, userY, checkTimer);
  }
  if (chosenUserDataIndex === 5) {
    checkDps2(userX, userY, checkTimer);
  }

  if (chosenUserDataIndex === 7) {
    checkDps4(userX, userY, checkTimer);
  }

  checkTimer += 1;
};

checkDps4 = (userX, userY, checkTimer) => {
  // Get hit by first 13s
  if (checkTimer == 1139) {
    if (getCircleDistanceToPlayer(userX, userY, 245, 610) > 50) {
      failYou("Why you not at C1? FAIL!");
    }
  }
  // Move out of C1 before last stack explosion
  if (checkTimer > 1139 && checkTimer < 1801) {
    if (getCircleDistanceToPlayer(userX, userY, 245, 610) > 50) {
      failYou("Why you move out of C1? FAIL!");
    }
  }
  // 4 big explosion
  if (checkTimer === 2731) {
    if (getCircleDistanceToPlayer(userX, userY, 330, 30) > 50) {
      failYou("Why you not at A? FAIL!");
    }
  }

  if (chosenMode === 2) {
    // Move away somewhere close to middle
    if (checkTimer === 1900) {
      if (getCircleDistanceToPlayer(userX, userY, 345, 475) > 130) {
        failYou("Why you didnt move close to center? FAIL!");
      }
    }
    // Stand at middle tower
    if (checkTimer === 2251) {
      if (getCircleDistanceToPlayer(userX, userY, 350, 350) > 100) {
        failYou("Why you didnt stand in MIDDLE tower? FAIL!");
      }
    }
  }
};

checkDps2 = (userX, userY, checkTimer) => {
  // Get hit by first 13s
  if (checkTimer == 1139) {
    if (getCircleDistanceToPlayer(userX, userY, 245, 610) > 50) {
      failYou("Why you not at C1? FAIL!");
    }
  }
  // 4 big explosion
  if (checkTimer === 2731) {
    if (getCircleDistanceToPlayer(userX, userY, 70, 240) > 50) {
      failYou("Why you not at D? FAIL!");
    }
  }

  if (chosenMode === 2) {
    // Stand at C1 until go take rot
    if (checkTimer > 1139 && checkTimer < 1561) {
      if (getCircleDistanceToPlayer(userX, userY, 245, 610) > 50) {
        failYou("Why you move out of C1? FAIL!");
      }
    }
    // Go C take rot
    if (checkTimer === 1680) {
      if (getCircleDistanceToPlayer(userX, userY, 330, 670) > 70) {
        failYou("Why you didnt go C take rot? FAIL!");
      }
    }
    // Pass rot to C1
    if (checkTimer === 1770) {
      if (getCircleDistanceToPlayer(userX, userY, 245, 610) > 50) {
        failYou("Why you didnt pass rot at C1? FAIL!");
      }
    }
    // Stay at C1 until last stack explosion
    if (checkTimer > 1770 && checkTimer < 1801) {
      if (getCircleDistanceToPlayer(userX, userY, 245, 610) > 50) {
        failYou("Why you move out of C1? FAIL!");
      }
    }
    // Move away somewhere close to middle
    if (checkTimer === 1900) {
      if (getCircleDistanceToPlayer(userX, userY, 345, 475) > 130) {
        failYou("Why you didnt move close to center? FAIL!");
      }
    }
    // Stand at west tower
    if (checkTimer === 2251) {
      if (getCircleDistanceToPlayer(userX, userY, 120, 350) > 100) {
        failYou("Why you didnt stand in WEST tower? FAIL!");
      }
    }
  } else {
    // Move out of C1
    if (checkTimer > 1139 && checkTimer < 1801) {
      if (getCircleDistanceToPlayer(userX, userY, 245, 610) > 50) {
        failYou("Why you move out of C1? FAIL!");
      }
    }
  }
};

checkDps1 = (userX, userY, checkTimer) => {
  // Get hit by first 8s
  if (checkTimer === 1139) {
    if (getCircleDistanceToPlayer(userX, userY, 445, 610) > STACK_AOE) {
      failYou("Why you not at C2? FAIL!");
    }
  }
  // 4 big explosion
  if (checkTimer === 2731) {
    if (getCircleDistanceToPlayer(userX, userY, 630, 240) > 50) {
      failYou("Why you not at B? FAIL!");
    }
  }

  if (chosenMode === 2) {
    // Stand at C2 until go take rot
    if (checkTimer > 1139 && checkTimer < 1561) {
      if (getCircleDistanceToPlayer(userX, userY, 445, 610) > 50) {
        failYou("Why you move out of C2? FAIL!");
      }
    }
    // Go C take rot
    if (checkTimer === 1680) {
      if (getCircleDistanceToPlayer(userX, userY, 330, 670) > 70) {
        failYou("Why you didnt go C take rot? FAIL!");
      }
    }
    // Move away somewhere until last stack explosion
    if (checkTimer === 1801) {
      if (getCircleDistanceToPlayer(userX, userY, 345, 475) > 130) {
        failYou("Why you didnt move close to center? FAIL!");
      }
    }
    // Stand at east tower
    if (checkTimer === 2251) {
      if (getCircleDistanceToPlayer(userX, userY, 580, 350) > 100) {
        failYou("Why you didnt stand in EAST tower? FAIL!");
      }
    }
  } else {
    // Stand at C2 until last stack explosion
    if (checkTimer > 1139 && checkTimer < 1801) {
      if (getCircleDistanceToPlayer(userX, userY, 445, 610) > 50) {
        failYou("Why you move out of C2? FAIL!");
      }
    }
  }
};

checkHealer2 = (userX, userY, checkTimer) => {
  // Get hit by first explosion
  if (checkTimer === 1139) {
    if (getCircleDistanceToPlayer(userX, userY, 330, 30) > ARENA_RADIUS) {
      failYou("Why you not within explosion range? FAIL!");
    }
  }
  // Move to B
  if (checkTimer === 1561) {
    if (getCircleDistanceToPlayer(userX, userY, 630, 240) > 50) {
      failYou("Why you not at B? FAIL!");
    }
  }
  // Stand near 1
  if (checkTimer === 1960) {
    if (getCircleDistanceToPlayer(userX, userY, 100, 520) > 70) {
      failYou("Why you not beside 1? FAIL!");
    }
  }
  // 4 big explosion
  if (checkTimer === 2731) {
    if (getCircleDistanceToPlayer(userX, userY, 150, 575) > 50) {
      failYou("Why you not at 1? FAIL!");
    }
  }

  if (chosenMode === 2) {
    // HW2 take rot from tank
    if (checkTimer === 1250) {
      if (getCircleDistanceToPlayer(userX, userY, 465, 166) > 50) {
        failYou("Why you didnt take rot from tank? FAIL!");
      }
    }
  }
};

checkHealer1 = (userX, userY, checkTimer) => {
  // Get hit by first 8s
  if (checkTimer === 1139) {
    if (getCircleDistanceToPlayer(userX, userY, 445, 610) > STACK_AOE) {
      failYou("Why you not at C2? FAIL!");
    }
  }
  // Stay at C2
  if (checkTimer > 1199 && checkTimer < 2251) {
    if (getCircleDistanceToPlayer(userX, userY, 465, 630) > 50) {
      failYou("Why you move out of C2? FAIL!");
    }
  }
  // 4 big explosion
  if (checkTimer === 2731) {
    if (getCircleDistanceToPlayer(userX, userY, 550, 570) > 50) {
      failYou("Why you not at 2? FAIL!");
    }
  }
};

checkTank2 = (userX, userY, checkTimer) => {
  // Get hit by first explosion
  if (checkTimer === 1139) {
    if (getCircleDistanceToPlayer(userX, userY, 330, 30) > ARENA_RADIUS) {
      failYou("Why you not within explosion range? FAIL!");
    }
  }
  // Move to A
  if (checkTimer === 1561) {
    if (getCircleDistanceToPlayer(userX, userY, 330, 30) > 50) {
      failYou("Why you not at A? FAIL!");
    }
  }
  // Stand near 1
  if (checkTimer === 1900) {
    if (getCircleDistanceToPlayer(userX, userY, 100, 520) > 70) {
      failYou("Why you not beside 1? FAIL!");
    }
  }
  // 4 big explosion
  if (checkTimer === 2731) {
    if (getCircleDistanceToPlayer(userX, userY, 150, 575) > 50) {
      failYou("Why you not at 1? FAIL!");
    }
  }
};

checkTank1 = (userX, userY, checkTimer) => {
  // First explosion
  if (checkTimer === 1140) {
    if (getCircleDistanceToPlayer(userX, userY, 330, 30) > 50) {
      failYou("Why you not at A? FAIL!");
    }
  }
  // Move to C
  if (checkTimer === 1561) {
    if (getCircleDistanceToPlayer(userX, userY, 330, 670) > 50) {
      failYou("Why you not at C? FAIL!");
    }
  }
  // Stay at C
  if (checkTimer > 1561 && checkTimer < 2251) {
    if (getCircleDistanceToPlayer(userX, userY, 330, 670) > 50) {
      failYou("Why you move out of C? FAIL!");
    }
  }
  // 4 big explosion
  if (checkTimer === 2731) {
    if (getCircleDistanceToPlayer(userX, userY, 150, 575) > 50) {
      failYou("Why you not at 1? FAIL!");
    }
  }

  if (chosenMode === 2) {
    // HW2 pass rot to healer
    if (checkTimer === 1250) {
      if (getCircleDistanceToPlayer(userX, userY, 465, 166) > 15) {
        failYou("Why you didnt pass rot to healer? FAIL!");
      }
    }
  }
};

getCircleDistanceToPlayer = (userX, userY, xPos, yPos) => {
  const xDist = userX - xPos;
  const yDist = userY - yPos;
  return Math.sqrt(xDist * xDist + yDist * yDist);
};

failYou = message => {
  $("#failure-message").text(message);
  cancelAnimationFrame(animationFrame);
  showFailure();
  startHW = false;
};
