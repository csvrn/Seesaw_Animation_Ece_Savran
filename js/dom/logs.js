const Logs = (() => {
  const logContainer = document.querySelector(".log-container");

  return {
    addLog(weight, direction, distance) {
      const log = `${weight}kg dropped on ${direction} side at ${distance.toFixed(
        0
      )}px from center`;
      const div = document.createElement("div");
      div.classList.add("log");
      div.innerText = log;
      logContainer.appendChild(div);
    },
    resetLogs() {
      logContainer.innerHTML = "";
    },
  };
})();

export default Logs;
