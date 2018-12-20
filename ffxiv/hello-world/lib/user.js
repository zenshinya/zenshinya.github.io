const INITIAL_USER_DATA = [
  {
    // 0
    role: ROLES.TANK,
    debuff: [
      {
        icon: mechanics[ROLES.TANK][0],
        timing: TIMINGS[mechanics[ROLES.TANK][0]]
      }
    ],
    cPos: {
      x: 300,
      y: 240
    },
    nPos: {
      x: 300,
      y: 240
    }
  },
  {
    // 1
    role: ROLES.TANK,
    debuff: [
      {
        icon: mechanics[ROLES.TANK][1],
        timing: TIMINGS[mechanics[ROLES.TANK][1]]
      }
    ],
    cPos: {
      x: 360,
      y: 240
    },
    nPos: {
      x: 360,
      y: 240
    }
  },
  {
    // 2
    role: ROLES.HEALER,
    debuff: [
      {
        icon: mechanics[ROLES.HEALER][0],
        timing: TIMINGS[mechanics[ROLES.HEALER][0]]
      }
    ],
    cPos: {
      x: 240,
      y: 450
    },
    nPos: {
      x: 240,
      y: 450
    }
  },
  {
    // 3
    role: ROLES.HEALER,
    debuff: [
      {
        icon: mechanics[ROLES.HEALER][1],
        timing: TIMINGS[mechanics[ROLES.HEALER][1]]
      }
    ],
    cPos: {
      x: 420,
      y: 450
    },
    nPos: {
      x: 420,
      y: 450
    }
  },
  {
    // 4
    role: ROLES.DPS,
    debuff: [
      {
        icon: mechanics[ROLES.DPS][0],
        timing: TIMINGS[mechanics[ROLES.DPS][0]]
      }
    ],
    cPos: {
      x: 220,
      y: 300
    },
    nPos: {
      x: 220,
      y: 300
    }
  },
  {
    // 5
    role: ROLES.DPS,
    debuff: [
      {
        icon: mechanics[ROLES.DPS][1],
        timing: TIMINGS[mechanics[ROLES.DPS][1]]
      }
    ],
    cPos: {
      x: 440,
      y: 300
    },
    nPos: {
      x: 440,
      y: 300
    }
  },
  {
    // 6
    role: ROLES.DPS,
    debuff: [
      {
        icon: mechanics[ROLES.DPS][2],
        timing: TIMINGS[mechanics[ROLES.DPS][2]]
      }
    ],
    cPos: {
      x: 200,
      y: 380
    },
    nPos: {
      x: 200,
      y: 380
    }
  },
  {
    // 7
    role: ROLES.DPS,
    debuff: [
      {
        icon: mechanics[ROLES.DPS][3],
        timing: TIMINGS[mechanics[ROLES.DPS][3]]
      }
    ],
    cPos: {
      x: 460,
      y: 380
    },
    nPos: {
      x: 460,
      y: 380
    }
  }
];

let userData = INITIAL_USER_DATA.slice(0);

getUserDataIndex = (chosenRole, chosenDebuff) => {
  for (let i = 0; i < userData.length; i += 1) {
    if (
      userData[i].role === chosenRole &&
      userData[i].debuff[0].icon === chosenDebuff
    ) {
      return i;
    }
  }
};
