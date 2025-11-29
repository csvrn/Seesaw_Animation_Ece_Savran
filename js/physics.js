const Physics = (() => {
  return {
    calculateTorque(weight, distance) {
      return weight * distance;
    },

    calculateAngle(leftTorque, rightTorque) {
      return Math.max(-30, Math.min(30, (rightTorque - leftTorque) / 10));
    },
  };
})();

export default Physics;
