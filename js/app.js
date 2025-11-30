import Seesaw from "./dom/seesaw.js";
import Logs from "./dom/logs.js";
import State from "./state.js";
import Physics from "./physics.js";

function handleMouseEnter() {
  Seesaw.showWeightIndicator();
}
function handleMouseLeave() {
  Seesaw.hideWeightIndicator();
}
function handleClick(e, center) {
  Seesaw.playSoundEffect();
  let direction = "left";
  if (center < e.clientX) {
    direction = "right";
  } else {
    direction = "left";
  }
  const distance = Math.abs(e.clientX - center);
  let currentWeight = State.currentWeight;
  updateWeightandTorque(currentWeight, distance, direction);
  const angle = State.updateAngle();
  Seesaw.rotatePlank(angle);

  Logs.addLog(currentWeight, direction, distance);
  Seesaw.createWeight(currentWeight, e.clientX);

  currentWeight = State.generateCurrentWeight();
}

function handleHover(e, center) {
  Seesaw.moveWeightIndicator(e.clientX);
}

function updateWeightandTorque(weight, distance, direction) {
  let torque = Physics.calculateTorque(weight, distance);
  State.incrementWeight(weight, direction);
  State.incrementTorque(torque, direction);
}

function handleReset() {
  Seesaw.resetSeesaw();
}

function initApp() {
  const pivotCenter = Seesaw.calculatePivotCenter();

  State.generateCurrentWeight();

  Seesaw.weightIndicatorContainer.addEventListener("mouseenter", () => {
    handleMouseEnter();
  });

  Seesaw.weightIndicatorContainer.addEventListener("mouseleave", () => {
    handleMouseLeave();
  });

  Seesaw.weightIndicatorContainer.addEventListener("mousemove", (e) =>
    handleHover(e, pivotCenter)
  );

  Seesaw.weightIndicatorContainer.addEventListener("click", (e) =>
    handleClick(e, pivotCenter)
  );

  Seesaw.resetBtn.addEventListener("click", () => {
    handleReset();
    State.generateCurrentWeight();
  });
}

addEventListener("DOMContentLoaded", (event) => {
  initApp();
});
