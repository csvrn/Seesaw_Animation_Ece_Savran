import Stats from "./dom/stats.js";
import Physics from "./physics.js";

const State = (() => {
  let currentWeight = 0;
  let leftWeight = Number(localStorage.getItem("leftWeight")) || 0;
  let rightWeight = Number(localStorage.getItem("rightWeight")) || 0;
  let rightTorque = Number(localStorage.getItem("rightTorque")) || 0;
  let leftTorque = Number(localStorage.getItem("leftTorque")) || 0;
  let angle = Number(localStorage.getItem("angle")) || 0;

  let weightList = JSON.parse(localStorage.getItem("weight-list")) || {
    left: [],
    right: [],
  };
  return {
    appendWeightList(weight, left, distance, direction) {
      weightList[direction].push([weight, left, distance]);
      const strList = JSON.stringify(weightList);
      localStorage.setItem("weight-list", strList);
    },
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
        localStorage.setItem("leftWeight", leftWeight);
        Stats.updateLeftWeight(leftWeight);
      } else {
        rightWeight += w;
        localStorage.setItem("rightWeight", rightWeight);
        Stats.updateRightWeight(rightWeight);
      }
    },

    incrementTorque(torque, direction) {
      if (direction === "left") {
        leftTorque += torque;
        localStorage.setItem("leftTorque", leftTorque);
      } else {
        rightTorque += torque;
        localStorage.setItem("rightTorque", rightTorque);
      }
    },

    updateAngle() {
      angle = Physics.calculateAngle(leftTorque, rightTorque).toFixed(2);
      Stats.updateAngle(angle);
      localStorage.setItem("angle", angle);
      return angle;
    },
    resetState() {
      currentWeight = 0;
      leftWeight = 0;
      rightWeight = 0;
      rightTorque = 0;
      leftTorque = 0;
      angle = 0;
      weightList = {
        left: [],
        right: [],
      };
      Stats.resetStats();
    },
    get weightList() {
      return weightList;
    },
    initStats() {
      Stats.updateLeftWeight(leftWeight);
      Stats.updateNextWeight(currentWeight);
      Stats.updateRightWeight(rightWeight);
      Stats.updateAngle(angle);
    },
  };
})();

export default State;
