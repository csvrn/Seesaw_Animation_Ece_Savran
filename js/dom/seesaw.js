import State from "../state.js";
import Logs from "./logs.js";
const Seesaw = (() => {
  const plank = document.querySelector(".plank");
  const pivot = document.querySelector(".pivot");
  const plankClickBox = document.querySelector(".plank-click-box");
  const weightIndicatorContainer = document.querySelector(
    ".weight-indicator-container"
  );
  const weightIndicator = document.querySelector(".weight-indicator");
  const resetBtn = document.getElementById("reset-btn");
  const soundEffect = document.getElementById("sound");

  let currentBorder = plank.getBoundingClientRect().left;
  let plankWidth = plank.getBoundingClientRect().width;
  let plankHeight = plank.getBoundingClientRect().height;

  plank.addEventListener("transitionend", () => {
    const newLeft = plank.getBoundingClientRect().left;
    const b = plankHeight * Math.sin((Math.abs(State.angle) * Math.PI) / 180);
    let newWidth = 0;
    const rad = 90 - Math.abs(State.angle);
    if (State.angle > 0) {
      newWidth = plankWidth * Math.sin((rad * Math.PI) / 180);
      weightIndicatorContainer.style.left = `${b / 2}px`;
    } else if (State.angle < 0) {
      newWidth = plankWidth * Math.sin((rad * Math.PI) / 180);
      weightIndicatorContainer.style.left = `${-b / 2}px`;
    } else {
      newWidth = plankWidth;
      weightIndicatorContainer.style.left = "0px";
    }
    weightIndicatorContainer.style.width = `${newWidth}px`;
  });

  const colors = {
    red: "#FF6B6B",
    turqoise: "#4ECDC4",
    dark_blue: "dark-blue",
    lime_yellow: "#C7F464",
    orange: "#FFA500",
  };

  return {
    get resetBtn() {
      return resetBtn;
    },
    resetSeesaw() {
      State.resetState();
      Logs.resetLogs();

      currentBorder = 0;
      weightIndicatorContainer.style.width = plankWidth;
      this.rotatePlank(0);
      plankClickBox.innerHTML = "";
      localStorage.clear();
    },
    set currentBorder(left) {
      currentBorder = left;
    },
    calculatePivotCenter() {
      const left = plank.getBoundingClientRect().left;
      const center = left + plank.offsetWidth / 2;
      return center;
    },

    rotatePlank(angle) {
      plank.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      plank.style.transition = "transform 2s 0.6s";
    },

    initLocalStorage() {
      for (const [w, x, d] of State.weightList["left"]) {
        this.createWeight(w, x, d, "left", true);
        Logs.addLog(w, "left", d);
      }
      for (const [w, x, d] of State.weightList["right"]) {
        this.createWeight(w, x, d, "right", true);
        Logs.addLog(w, "right", d);
      }
      this.rotatePlank(State.angle);
    },
    createWeight(weight, x, distance, direction, init) {
      const randIndex = Math.floor(Math.random() * 5);
      const weightElement = document.createElement("div");
      weightElement.classList.add("weight");
      weightElement.style.height = `${40 + weight * 3}px`;
      weightElement.style.width = `${40 + weight * 3}px`;
      weightElement.innerText = `${weight}kg`;
      weightElement.style.top = `${40 - weight * 3}px`;

      let left = x;
      if (!init) {
        left = x - plank.getBoundingClientRect().left;
      }
      weightElement.style.left = `${left}px`;
      weightElement.style.backgroundColor = Object.values(colors)[randIndex];
      weightElement.addEventListener("animationend", () => {
        plankClickBox.appendChild(weightElement);
        weightElement.style.transform = "";
        weightElement.style.animation = "none";
      });

      weightIndicatorContainer.appendChild(weightElement);
      if (!init) {
        State.appendWeightList(weight, left, distance, direction);
      }
    },
    showWeightIndicator() {
      weightIndicator.style.display = "flex";
    },

    hideWeightIndicator() {
      weightIndicator.style.display = "none";
    },

    moveWeightIndicator(x) {
      const weight = State.currentWeight;
      weightIndicator.style.height = `${40 + weight * 3}px`;
      weightIndicator.style.width = `${40 + weight * 3}px`;
      weightIndicator.innerText = `${weight}kg`;
      weightIndicator.style.left = `${
        x - plank.getBoundingClientRect().left - (40 + weight * 3) / 2
      }px`;
    },
    get weightIndicatorContainer() {
      return weightIndicatorContainer;
    },
    playSoundEffect() {
      soundEffect.currentTime = 0.8;
      soundEffect.play();
    },
  };
})();

export default Seesaw;
