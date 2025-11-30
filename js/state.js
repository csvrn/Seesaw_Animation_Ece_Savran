import Stats from "./dom/stats.js";
import Physics from "./physics.js";

const State = (() => {
  let currentWeight = 0;
  let leftWeight = localStorage.getItem("leftWeight") || 0;
  let rightWeight = localStorage.getItem("rightWeight") || 0;
  let rightTorque = localStorage.getItem("rightTorque") || 0;
  let leftTorque = localStorage.getItem("leftTorque") || 0;
  let angle = 0;

  return {
    get angle() {
      return angle;
    },
    generateCurrentWeight() {
      currentWeight = Math.floor(Math.random() * 10) + 1;
      Stats.updateNextWeight(currentWeight);
      return currentWeight;
    },
    get currentWeight() {
      return currentWeight;
    },
    incrementWeight(w, direction) {
      if (direction == "left") {
        leftWeight += w;
        Stats.updateLeftWeight(leftWeight);
      } else {
        rightWeight += w;
        Stats.updateRightWeight(rightWeight);
      }
    },

    incrementTorque(torque, direction) {
      if (direction === "left") {
        leftTorque += torque;
      } else {
        rightTorque += torque;
      }
    },

    updateAngle() {
      angle = Physics.calculateAngle(leftTorque, rightTorque).toFixed(2);
      Stats.updateAngle(angle);
      return angle;
    },
    resetState() {
      currentWeight = 0;
      leftWeight = 0;
      rightWeight = 0;
      rightTorque = 0;
      leftTorque = 0;
      angle = 0;

      localStorage.removeItem("leftWeight");
      localStorage.removeItem("rightWeight");
      localStorage.removeItem("rightTorque");
      localStorage.removeItem("leftTorque");

      Stats.resetStats();
    },
  };
})();

export default State;
