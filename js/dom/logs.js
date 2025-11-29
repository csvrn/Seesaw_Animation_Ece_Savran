const Logs = (() => {
  const logContainer = document.querySelector(".log-container");

  return {
    addLog(weight, direction, distance) {
      const log = `${weight}kg dropped on ${direction} side at ${distance}px from center`;
      const div = document.createElement("div");
      div.innerText = log;
      logContainer.appendChild(div);
    },
  };
})();

export default Logs;
