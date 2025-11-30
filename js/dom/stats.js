const Stats = (() => {
  const leftWeightStat = document.getElementById("left-weight-val");
  const nextWeightStat = document.getElementById("next-weight-val");
  const rightWeightStat = document.getElementById("right-weight-val");
  const angleStat = document.getElementById("angle");

  return {
    updateLeftWeight(w) {
      leftWeightStat.innerText = `${w}kg`;
    },

    updateNextWeight(w) {
      nextWeightStat.innerText = `${w}kg`;
    },

    updateRightWeight(w) {
      rightWeightStat.innerText = `${w}kg`;
    },

    updateAngle(a) {
      angleStat.innerHTML = `${a}&deg;`;
    },
  };
})();

export default Stats;
