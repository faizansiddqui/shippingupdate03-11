 function getWeightSlab(weight) {
  if (weight <= 0.5) return "0.5";
  if (weight <= 1) return "1 Kgs"; 
  if (weight <= 2) return "2 Kgs";
  if (weight <= 5) return "5 Kgs";
  if (weight <= 10) return "10 Kgs";
  return "10 Kgs"; 
}

 function calculateCODCharges(orderValue, fixedCOD, percentageCOD) {
  if (!(orderValue || fixedCOD || percentageCOD)) {
    console.log("Can't calculate COD Charges");
    return 0;
  }

  const percentageAmount = orderValue * percentageCOD;
  return Math.max(fixedCOD, percentageAmount);
}

module.exports = {getWeightSlab,calculateCODCharges}
