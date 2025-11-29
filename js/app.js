function handleClick(e, center) {
  let direction = "left";
  if (center < e.clientX) {
    direction = "right";
  } else {
    direction = "left";
  }
  console.log("center-clientX: ", center, e.clientX);
  const distance = Math.abs(e.clientX - center);
  console.log("w,ds,dr: ", currentWeight, distance, direction);

  updateWeightandTorque(currentWeight, distance, direction);
  angle = calculateAngel(leftTorque, rightTorque);
  console.log(angle);
  console.log(plank.style);
  plank.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
  plank.style.transition = "transform 2s";

  addLog(currentWeight, direction, distance);
  currentWeight = generateWeight();
  nextWeightStat.innerText = `${currentWeight}kg`;
}

function addLog(weight, direction, distance) {
  const log = `${weight}kg dropped on ${direction} side at ${distance}px from center`;
  const div = document.createElement("div");
  div.innerText = log;
  logContainer.appendChild(div);
}

function updateWeightandTorque(weight, distance, direction) {
  let moment = weight * distance;
  console.log(weight, distance, moment, direction);
  if (direction == "left") {
    updateTotalWeight(weight, "left");
    leftTorque += moment;
  } else {
    updateTotalWeight(weight, "right");
    rightTorque += moment;
  }
  console;
}

function calculateAngel(leftTorque, rightTorque) {
  return Math.max(-30, Math.min(30, (rightTorque - leftTorque) / 10));
}

function calculatePivotCenter(pivot) {
  const left = pivot.getBoundingClientRect().left;
  const center = left + pivot.offsetWidth / 2;
  return center;
}

function generateWeight() {
  return Math.floor(Math.random() * 10) + 1;
}

function updateTotalWeight(weight, direction) {
  if (direction == "left") {
    leftWeight += weight;
    leftWeightStat.innerText = `${leftWeight}kg`;
  } else {
    rightWeight += weight;
    rightWeightStat.innerText = `${rightWeight}kg`;
  }
}

const plank = document.querySelector(".plank");
const plankClickBox = document.querySelector(".plank-click-box");
const pivot = document.querySelector(".pivot");
const pivotCenter = calculatePivotCenter(pivot);
const logContainer = document.querySelector(".log-container");

const leftWeightStat = document.getElementById("left-weight-val");
const nextWeightStat = document.getElementById("next-weight-val");
const rightWeightStat = document.getElementById("right-weight-val");
const angleStat = document.getElementById("angle");

let rightTorque = localStorage.getItem("rightTorque") || 0;
let leftTorque = localStorage.getItem("leftTorque") || 0;
let leftWeight = localStorage.getItem("leftWeight") || 0;
let rightWeight = localStorage.getItem("rightWeight") || 0;
let currentWeight = 0;
let angle = 0;

function initApp() {
  console.log(logContainer);
  plankClickBox.addEventListener("click", (e) => handleClick(e, pivotCenter));

  currentWeight = generateWeight();
  leftWeightStat.innerText = `${leftWeight}kg`;
  rightWeightStat.innerText = `${rightWeight}kg`;
  nextWeightStat.innerText = `${currentWeight}kg`;
  angleStat.innerText = `${angle}`;
  console.log("pivot: ", pivot);
}

addEventListener("DOMContentLoaded", (event) => {
  initApp();
});
