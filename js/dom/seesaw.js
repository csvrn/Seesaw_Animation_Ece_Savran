const Seesaw = (() => {
  const plank = document.querySelector(".plank");
  const pivot = document.querySelector(".pivot");

  return {
    calculatePivotCenter() {
      const left = pivot.getBoundingClientRect().left;
      const center = left + pivot.offsetWidth / 2;
      return center;
    },

    rotatePlank(angle) {
      plank.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      plank.style.transition = "transform 2s";
    },
  };
})();

export default Seesaw;
