import Seesaw from "./dom/seesaw.js";
import Logs from "./dom/logs.js";
import State from "./state.js";
import Physics from "./physics.js";

function handleClick(e, center) {
  let direction = "left";
  if (center < e.clientX) {
    direction = "right";
  } else {
    direction = "left";
  }
  const distance = Math.abs(e.clientX - center);
  let currentWeight = State.generateCurrentWeight();
  updateWeightandTorque(currentWeight, distance, direction);
  const angle = State.updateAngle();
  console.log(currentWeight);
  Seesaw.rotatePlank(angle);

  Logs.addLog(currentWeight, direction, distance);

  currentWeight = State.generateCurrentWeight();
}

function updateWeightandTorque(weight, distance, direction) {
  let torque = Physics.calculateTorque(weight, distance);
  State.incrementWeight(weight, direction);
  State.incrementTorque(torque, direction);
}

function initApp() {
  const pivotCenter = Seesaw.calculatePivotCenter();
  const plankClickBox = document.querySelector(".plank-click-box");
  plankClickBox.addEventListener("click", (e) => handleClick(e, pivotCenter));
}

addEventListener("DOMContentLoaded", (event) => {
  initApp();
});
