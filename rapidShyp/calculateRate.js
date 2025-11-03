
const { getWeightSlab, calculateCODCharges } = require('./services.js');

const excelChart = {
  "XpressBees": {
    "Surface": {
      "0.25": { "z_a": 26.45, "z_b": 29.9, "z_c": 33.35, "z_d": 35.65, "z_e": 55.2, "cod_charges": 27.6, "cod_percentage": 0.0138 },
      "0.5": { "z_a": 33.264, "z_b": 36.5, "z_c": 40.656, "z_d": 43.12, "z_e": 70, "cod_charges": 30, "cod_percentage": 0.017 },
      "1 Kgs": { "z_a": 82.8, "z_b": 82.8, "z_c": 82.8, "z_d": 82.8, "z_e": 82.8, "cod_charges": 0, "cod_percentage": 0 },
      "2 Kgs": { "z_a": 66.7, "z_b": 78.2, "z_c": 90.85, "z_d": 98.9, "z_e": 115, "cod_charges": 29.9, "cod_percentage": 0.01495 },
      "5 Kgs": { "z_a": 115, "z_b": 120.75, "z_c": 143.75, "z_d": 155.25, "z_e": 215.05, "cod_charges": 29.9, "cod_percentage": 0.01495 },
      "10 Kgs": { "z_a": 178.25, "z_b": 201.25, "z_c": 230, "z_d": 235.75, "z_e": 327.75, "cod_charges": 29.9, "cod_percentage": 0.01495,  }
    },

    "Air": {
      "0.25": { "z_a": 29.9, "z_b": 33.35, "z_c": 37.95, "z_d": 40.25, "z_e": 59.8, "cod_charges": 27.6, "cod_percentage": 0.0138 },
      "0.5": { "z_a": 33.264, "z_b": 36.96, "z_c": 54.208, "z_d": 59.136, "z_e": 77.616, "cod_charges": 29.5, "cod_percentage": 0.015 },
      "1 Kgs": { "z_a": 66.7, "z_b": 73.7, "z_c": 98.9, "z_d": 108.9, "z_e": 138, "cod_charges": 29.5, "cod_percentage": 0.015 },
      "2 Kgs": { "z_a": 98.9, "z_b": 108.9, "z_c": 138, "z_d": 155.25, "z_e": 192.05, "cod_charges": 29.5, "cod_percentage": 0.015 },
      "5 Kgs": { "z_a": 155.25, "z_b": 172.5, "z_c": 215.05, "z_d": 235.75, "z_e": 287.5, "cod_charges": 29.5, "cod_percentage": 0.015 },
      "10 Kgs": { "z_a": 235.75, "z_b": 258.5, "z_c": 313.95, "z_d": 345.35, "z_e": 420.9, "cod_charges": 29.5, "cod_percentage": 0.015 }
    }
  },
  
  "Delhivery": {
    "Surface": {
      "0.25": { "z_a": 26.45, "z_b": 28.75, "z_c": 32.2, "z_d": 33.35, "z_e": 49, "cod_charges": 29, "cod_percentage": 0.019 },
      "0.5": { "z_a": 31, "z_b": 33, "z_c": 48.216, "z_d": 53, "z_e": 67.032, "cod_charges": 40, "cod_percentage": 0.022 },
      "2 Kgs": { "z_a": 72.45, "z_b": 80.5, "z_c": 86.25, "z_d": 92, "z_e": 120.75, "cod_charges": 34.5, "cod_percentage": 0.020125 },
      "5 Kgs": { "z_a": 138, "z_b": 149.5, "z_c": 158.7, "z_d": 177.1, "z_e": 214.48, "cod_charges": 34.5, "cod_percentage": 0.020125 },
      "10 Kgs": { "z_a": 192.05, "z_b": 234.6, "z_c": 280.6, "z_d": 313.95, "z_e": 391, "cod_charges": 34.5, "cod_percentage": 0.020125 },
      "Document": { "z_a": 26.45, "z_b": 29.9, "z_c": 32.2, "z_d": 33.925, "z_e": 46, "cod_charges": 0, "cod_percentage": 0 }
    },
    "Air": {
      "0.25": { "z_a": 28.75, "z_b": 31.05, "z_c": 46, "z_d": 59.8, "z_e": 75.9, "cod_charges": 38, "cod_percentage": 0.02 },
      "0.5": { "z_a": 32, "z_b": 34.5, "z_c": 56, "z_d": 72, "z_e": 91.168, "cod_charges": 38, "cod_percentage": 0.02 },
      "1 Kgs": { "z_a": 59.8, "z_b": 64.4, "z_c": 98.9, "z_d": 120.75, "z_e": 149.5, "cod_charges": 38, "cod_percentage": 0.02 },
      "2 Kgs": { "z_a": 98.9, "z_b": 108.9, "z_c": 155.25, "z_d": 184, "z_e": 230, "cod_charges": 38, "cod_percentage": 0.02 },
      "5 Kgs": { "z_a": 155.25, "z_b": 172.5, "z_c": 230, "z_d": 276, "z_e": 345, "cod_charges": 38, "cod_percentage": 0.02 },
      "10 Kgs": { "z_a": 230, "z_b": 258.5, "z_c": 345, "z_d": 414, "z_e": 517.5, "cod_charges": 38, "cod_percentage": 0.02 }
    }
  },
  
  "DTDC": {
    "Surface": {
      "0.5": { "z_a": 28.237, "z_b": 30.899, "z_c": 37.699, "z_d": 40.36, "z_e": 60.467, "cod_charges": 20.16, "cod_percentage": 0.0168 },
      "1 Kgs": { "z_a": 57.988, "z_b": 63.452, "z_c": 77.418, "z_d": 82.883, "z_e": 124.172, "cod_charges": 20.7, "cod_percentage": 0.01725 },
      "2 Kgs": { "z_a": 78.658, "z_b": 84.173, "z_c": 100.732, "z_d": 113.167, "z_e": 158.707, "cod_charges": 20.7, "cod_percentage": 0.01725 },
      "5 Kgs": { "z_a": 165.601, "z_b": 179.402, "z_c": 206.992, "z_d": 223.551, "z_e": 281.513, "cod_charges": 20.7, "cod_percentage": 0.01725 }
    },
    "Air": {
      "0.25": { "z_a": 25.299, "z_b": 27.599, "z_c": 40.36, "z_d": 46.575, "z_e": 59.136, "cod_charges": 20.16, "cod_percentage": 0.0168 },
      "0.5": { "z_a": 28.237, "z_b": 30.899, "z_c": 45.683, "z_d": 52.483, "z_e": 67.267, "cod_charges": 20.16, "cod_percentage": 0.0168 },
      "1 Kgs": { "z_a": 52.483, "z_b": 57.988, "z_c": 82.883, "z_d": 94.392, "z_e": 120.75, "cod_charges": 20.16, "cod_percentage": 0.0168 },
      "2 Kgs": { "z_a": 82.883, "z_b": 92, "z_c": 124.172, "z_d": 143.75, "z_e": 178.25, "cod_charges": 20.16, "cod_percentage": 0.0168 },
      "5 Kgs": { "z_a": 143.75, "z_b": 161, "z_c": 206.992, "z_d": 235.75, "z_e": 287.5, "cod_charges": 20.16, "cod_percentage": 0.0168 },
      "10 Kgs": { "z_a": 235.75, "z_b": 258.5, "z_c": 316.25, "z_d": 356.5, "z_e": 420.9, "cod_charges": 20.16, "cod_percentage": 0.0168 }
    }
  },
  
  "Ecom Express": {
    "Surface": {
      "0.5": { "z_a": 27.048, "z_b": 31, "z_c": 40, "z_d": 44, "z_e": 55, "cod_charges": 28.5, "cod_percentage": 0.0155 },
      "2 Kgs": { "z_a": 45.54, "z_b": 51.865, "z_c": 63.25, "z_d": 73.37, "z_e": 89.815, "cod_charges": 26.45, "cod_percentage": 0.0115 },
      "5 Kgs": { "z_a": 88.55, "z_b": 101.2, "z_c": 120.175, "z_d": 126.5, "z_e": 170.775, "cod_charges": 26.45, "cod_percentage": 0.0115 },
      "10 Kgs": { "z_a": 189.75, "z_b": 215.05, "z_c": 227.7, "z_d": 240.35, "z_e": 271.975, "cod_charges": 26.45, "cod_percentage": 0.0115 }
    },
    "Air": {
      "0.5": { "z_a": 31, "z_b": 35.65, "z_c": 46, "z_d": 50.6, "z_e": 63.25, "cod_charges": 28.5, "cod_percentage": 0.0155 },
      "1 Kgs": { "z_a": 50.6, "z_b": 57.5, "z_c": 73.37, "z_d": 80.5, "z_e": 98.9, "cod_charges": 28.5, "cod_percentage": 0.0155 },
      "2 Kgs": { "z_a": 73.37, "z_b": 82.8, "z_c": 98.9, "z_d": 109.25, "z_e": 132.25, "cod_charges": 28.5, "cod_percentage": 0.0155 },
      "5 Kgs": { "z_a": 109.25, "z_b": 120.75, "z_c": 143.75, "z_d": 161, "z_e": 195.5, "cod_charges": 28.5, "cod_percentage": 0.0155 },
      "10 Kgs": { "z_a": 161, "z_b": 178.25, "z_c": 212.75, "z_d": 235.75, "z_e": 287.5, "cod_charges": 28.5, "cod_percentage": 0.0155 }
    }
  },
  
  "Ekart": {
    "Surface": {
      "0.5": { "z_a": 26, "z_b": 29.5, "z_c": 34.5, "z_d": 39.5, "z_e": 54, "cod_charges": 28, "cod_percentage": 0.01344 },
      "2 Kgs": { "z_a": 61.824, "z_b": 70.84, "z_c": 100.464, "z_d": 118.496, "z_e": 154.56, "cod_charges": 32.2, "cod_percentage": 0.0138 },
      "5 Kgs": { "z_a": 90.16, "z_b": 103.04, "z_c": 122.36, "z_d": 141.68, "z_e": 180.32, "cod_charges": 28.75, "cod_percentage": 0.01725 },
      "10 Kgs": { "z_a": 166.152, "z_b": 186.76, "z_c": 218.96, "z_d": 252.448, "z_e": 322, "cod_charges": 28.75, "cod_percentage": 0.01725 }
    },
    "Air": {
      "0.5": { "z_a": 29.5, "z_b": 33.35, "z_c": 39.5, "z_d": 43.7, "z_e": 54, "cod_charges": 28, "cod_percentage": 0.01344 },
      "1 Kgs": { "z_a": 43.7, "z_b": 49.45, "z_c": 59.8, "z_d": 66.7, "z_e": 82.8, "cod_charges": 28, "cod_percentage": 0.01344 },
      "2 Kgs": { "z_a": 66.7, "z_b": 75.9, "z_c": 90.85, "z_d": 103.5, "z_e": 126.5, "cod_charges": 28, "cod_percentage": 0.01344 },
      "5 Kgs": { "z_a": 103.5, "z_b": 115, "z_c": 138, "z_d": 155.25, "z_e": 195.5, "cod_charges": 28, "cod_percentage": 0.01344 },
      "10 Kgs": { "z_a": 155.25, "z_b": 172.5, "z_c": 207, "z_d": 230, "z_e": 287.5, "cod_charges": 28, "cod_percentage": 0.01344 }
    }
  },
  
  "Amazon": {
    "Surface": {
      "0.5": { "z_a": 32, "z_b": 39, "z_c": 44, "z_d": 50, "z_e": 55, "cod_charges": 22, "cod_percentage": 0.016 }
    },
    "Air": {
      "0.5": { "z_a": 36.8, "z_b": 44.85, "z_c": 50.6, "z_d": 57.5, "z_e": 63.25, "cod_charges": 22, "cod_percentage": 0.016 },
      "1 Kgs": { "z_a": 57.5, "z_b": 69, "z_c": 78.2, "z_d": 86.25, "z_e": 98.9, "cod_charges": 22, "cod_percentage": 0.016 },
      "2 Kgs": { "z_a": 86.25, "z_b": 98.9, "z_c": 115, "z_d": 132.25, "z_e": 149.5, "cod_charges": 22, "cod_percentage": 0.016 },
      "5 Kgs": { "z_a": 132.25, "z_b": 149.5, "z_c": 172.5, "z_d": 195.5, "z_e": 230, "cod_charges": 22, "cod_percentage": 0.016 },
      "10 Kgs": { "z_a": 195.5, "z_b": 218.5, "z_c": 253, "z_d": 287.5, "z_e": 333.5, "cod_charges": 22, "cod_percentage": 0.016 }
    }
  },
  
  "Shadowfax": {
    "Surface": {
      "0.5": { "z_a": 26, "z_b": 28, "z_c": 35, "z_d": 39, "z_e": 60, "cod_charges": 22, "cod_percentage": 0.014 },
      "2 Kgs": { "z_a": 43.7, "z_b": 48.3, "z_c": 59.8, "z_d": 79.35, "z_e": 102.35, "cod_charges": 43.7, "cod_percentage": 0.0207 }
    },
    "Air": {
      "0.5": { "z_a": 28, "z_b": 31, "z_c": 39, "z_d": 44, "z_e": 66, "cod_charges": 22, "cod_percentage": 0.014 },
      "1 Kgs": { "z_a": 44, "z_b": 48.3, "z_c": 59.8, "z_d": 69, "z_e": 98.9, "cod_charges": 22, "cod_percentage": 0.014 },
      "2 Kgs": { "z_a": 69, "z_b": 77.5, "z_c": 92, "z_d": 109.25, "z_e": 143.75, "cod_charges": 22, "cod_percentage": 0.014 },
      "5 Kgs": { "z_a": 109.25, "z_b": 120.75, "z_c": 143.75, "z_d": 166.75, "z_e": 218.5, "cod_charges": 22, "cod_percentage": 0.014 },
      "10 Kgs": { "z_a": 166.75, "z_b": 184, "z_c": 218.5, "z_d": 253, "z_e": 322, "cod_charges": 22, "cod_percentage": 0.014 }
    }
  },
  
  "Shree Maruti": {
    "Surface": {
      "0.5": { "z_a": 17, "z_b": 22, "z_c": 25, "z_d": 31, "z_e": 26, "cod_charges": 23, "cod_percentage": 0.0115 }
    },
    "Air": {
      "0.5": { "z_a": 29, "z_b": 33, "z_c": 43, "z_d": 54, "z_e": 67, "cod_charges": 23, "cod_percentage": 0.0115 },
      "1 Kgs": { "z_a": 43, "z_b": 49, "z_c": 63.25, "z_d": 77.5, "z_e": 98.9, "cod_charges": 23, "cod_percentage": 0.0115 },
      "2 Kgs": { "z_a": 63.25, "z_b": 71.3, "z_c": 89.815, "z_d": 109.25, "z_e": 138, "cod_charges": 23, "cod_percentage": 0.0115 },
      "5 Kgs": { "z_a": 98.9, "z_b": 109.25, "z_c": 132.25, "z_d": 155.25, "z_e": 195.5, "cod_charges": 23, "cod_percentage": 0.0115 },
      "10 Kgs": { "z_a": 155.25, "z_b": 172.5, "z_c": 207, "z_d": 241.5, "z_e": 310.5, "cod_charges": 23, "cod_percentage": 0.0115 }
    }
  },
  
  "BlueDart": {
    "Surface": {
      "0.5": { "z_a": 37.95, "z_b": 40.25, "z_c": 43.7, "z_d": 46, "z_e": 59.8, "cod_charges": 31.05, "cod_percentage": 0.01725 }
    },
    "Air": {
      "0.25": { "z_a": 36.8, "z_b": 46, "z_c": 62.1, "z_d": 70.15, "z_e": 96.6, "cod_charges": 31.05, "cod_percentage": 0.01725 },
      "0.5": { "z_a": 40.25, "z_b": 50.6, "z_c": 69, "z_d": 75.9, "z_e": 101.2, "cod_charges": 31.05, "cod_percentage": 0.01725 },
      "1 Kgs": { "z_a": 75.9, "z_b": 92, "z_c": 120.75, "z_d": 132.25, "z_e": 172.5, "cod_charges": 31.05, "cod_percentage": 0.01725 },
      "2 Kgs": { "z_a": 120.75, "z_b": 143.75, "z_c": 184, "z_d": 207, "z_e": 264.5, "cod_charges": 31.05, "cod_percentage": 0.01725 },
      "5 Kgs": { "z_a": 184, "z_b": 218.5, "z_c": 276, "z_d": 310.5, "z_e": 391, "cod_charges": 31.05, "cod_percentage": 0.01725 },
      "10 Kgs": { "z_a": 276, "z_b": 322, "z_c": 402.5, "z_d": 460, "z_e": 575, "cod_charges": 31.05, "cod_percentage": 0.01725 }
    }
  },
  
  "Professional": {
    "Surface": {
      "0.25": { "z_a": 11.5, "z_b": 13.8, "z_c": 16.1, "z_d": 18.4, "z_e": 23, "cod_charges": 0, "cod_percentage": 0 },
      "0.5": { "z_a": 16.1, "z_b": 18.4, "z_c": 21.85, "z_d": 25.3, "z_e": 28.75, "cod_charges": 0, "cod_percentage": 0 }
    },
    "Air": {
      "0.25": { "z_a": 18.4, "z_b": 21.85, "z_c": 25.3, "z_d": 28.75, "z_e": 34.5, "cod_charges": 0, "cod_percentage": 0 },
      "0.5": { "z_a": 25.3, "z_b": 28.75, "z_c": 34.5, "z_d": 40.25, "z_e": 46, "cod_charges": 0, "cod_percentage": 0 },
      "1 Kgs": { "z_a": 40.25, "z_b": 46, "z_c": 57.5, "z_d": 69, "z_e": 80.5, "cod_charges": 0, "cod_percentage": 0 },
      "2 Kgs": { "z_a": 69, "z_b": 80.5, "z_c": 98.9, "z_d": 115, "z_e": 132.25, "cod_charges": 0, "cod_percentage": 0 },
      "5 Kgs": { "z_a": 115, "z_b": 132.25, "z_c": 161, "z_d": 184, "z_e": 218.5, "cod_charges": 0, "cod_percentage": 0 },
      "10 Kgs": { "z_a": 184, "z_b": 218.5, "z_c": 264.5, "z_d": 310.5, "z_e": 368, "cod_charges": 0, "cod_percentage": 0 }
    }
  }
};

// const excelChart = {
//   "XpressBees": {
//     "Surface": {
//       "0.25": { "z_a": 26.45, "z_b": 29.9, "z_c": 33.35, "z_d": 35.65, "z_e": 55.2, "cod_charges": 27.6, "cod_percentage": 0.0138 },
//       "0.5": { "z_a": 33.264, "z_b": 36.5, "z_c": 40.656, "z_d": 43.12, "z_e": 70, "cod_charges": 30, "cod_percentage": 0.017 },
//       "1 Kgs": { "z_a": 82.8, "z_b": 82.8, "z_c": 82.8, "z_d": 82.8, "z_e": 82.8, "cod_charges": 0, "cod_percentage": 0 },
//       "2 Kgs": { "z_a": 66.7, "z_b": 78.2, "z_c": 90.85, "z_d": 98.9, "z_e": 115, "cod_charges": 29.9, "cod_percentage": 0.01495 },
//       "5 Kgs": { "z_a": 115, "z_b": 120.75, "z_c": 143.75, "z_d": 155.25, "z_e": 215.05, "cod_charges": 29.9, "cod_percentage": 0.01495 },
//       "10 Kgs": { "z_a": 178.25, "z_b": 201.25, "z_c": 230, "z_d": 235.75, "z_e": 327.75, "cod_charges": 29.9, "cod_percentage": 0.01495 }
//     },
//     "Air": {
//       "0.5": { "z_a": 33.264, "z_b": 36.96, "z_c": 54.208, "z_d": 59.136, "z_e": 77.616, "cod_charges": 29.5, "cod_percentage": 0.015 }
//     }
//   },
  
//   "Delhivery": {
//     "Surface": {
//       "0.25": { "z_a": 26.45, "z_b": 28.75, "z_c": 32.2, "z_d": 33.35, "z_e": 49, "cod_charges": 29, "cod_percentage": 0.019 },
//       "0.5": { "z_a": 31, "z_b": 33, "z_c": 48.216, "z_d": 53, "z_e": 67.032, "cod_charges": 40, "cod_percentage": 0.022 },
//       "2 Kgs": { "z_a": 72.45, "z_b": 80.5, "z_c": 86.25, "z_d": 92, "z_e": 120.75, "cod_charges": 34.5, "cod_percentage": 0.020125 },
//       "5 Kgs": { "z_a": 138, "z_b": 149.5, "z_c": 158.7, "z_d": 177.1, "z_e": 214.48, "cod_charges": 34.5, "cod_percentage": 0.020125 },
//       "10 Kgs": { "z_a": 192.05, "z_b": 234.6, "z_c": 280.6, "z_d": 313.95, "z_e": 391, "cod_charges": 34.5, "cod_percentage": 0.020125 },
//       "Document": { "z_a": 26.45, "z_b": 29.9, "z_c": 32.2, "z_d": 33.925, "z_e": 46, "cod_charges": 0, "cod_percentage": 0 }
//     },
//     "Air": {
//       "0.5": { "z_a": 32, "z_b": 34.5, "z_c": 56, "z_d": 72, "z_e": 91.168, "cod_charges": 38, "cod_percentage": 0.02 }
//     }
//   },
  
//   "DTDC": {
//     "Surface": {
//       "0.5": { "z_a": 28.237, "z_b": 30.899, "z_c": 37.699, "z_d": 40.36, "z_e": 60.467, "cod_charges": 20.16, "cod_percentage": 0.0168 },
//       "1 Kgs": { "z_a": 57.988, "z_b": 63.452, "z_c": 77.418, "z_d": 82.883, "z_e": 124.172, "cod_charges": 20.7, "cod_percentage": 0.01725 },
//       "2 Kgs": { "z_a": 78.658, "z_b": 84.173, "z_c": 100.732, "z_d": 113.167, "z_e": 158.707, "cod_charges": 20.7, "cod_percentage": 0.01725 },
//       "5 Kgs": { "z_a": 165.601, "z_b": 179.402, "z_c": 206.992, "z_d": 223.551, "z_e": 281.513, "cod_charges": 20.7, "cod_percentage": 0.01725 }
//     },
//     "Air": {
//       "0.5": { "z_a": 28.237, "z_b": 30.899, "z_c": 45.683, "z_d": 52.483, "z_e": 67.267, "cod_charges": 20.16, "cod_percentage": 0.0168 }
//     }
//   },
  
//   "Ecom Express": {
//     "Surface": {
//       "0.5": { "z_a": 27.048, "z_b": 31, "z_c": 40, "z_d": 44, "z_e": 55, "cod_charges": 28.5, "cod_percentage": 0.0155 },
//       "2 Kgs": { "z_a": 45.54, "z_b": 51.865, "z_c": 63.25, "z_d": 73.37, "z_e": 89.815, "cod_charges": 26.45, "cod_percentage": 0.0115 },
//       "5 Kgs": { "z_a": 88.55, "z_b": 101.2, "z_c": 120.175, "z_d": 126.5, "z_e": 170.775, "cod_charges": 26.45, "cod_percentage": 0.0115 },
//       "10 Kgs": { "z_a": 189.75, "z_b": 215.05, "z_c": 227.7, "z_d": 240.35, "z_e": 271.975, "cod_charges": 26.45, "cod_percentage": 0.0115 }
//     }
//   },
  
//   "Ekart": {
//     "Surface": {
//       "0.5": { "z_a": 26, "z_b": 29.5, "z_c": 34.5, "z_d": 39.5, "z_e": 54, "cod_charges": 28, "cod_percentage": 0.01344 },
//       "2 Kgs": { "z_a": 61.824, "z_b": 70.84, "z_c": 100.464, "z_d": 118.496, "z_e": 154.56, "cod_charges": 32.2, "cod_percentage": 0.0138 },
//       "5 Kgs": { "z_a": 90.16, "z_b": 103.04, "z_c": 122.36, "z_d": 141.68, "z_e": 180.32, "cod_charges": 28.75, "cod_percentage": 0.01725 },
//       "10 Kgs": { "z_a": 166.152, "z_b": 186.76, "z_c": 218.96, "z_d": 252.448, "z_e": 322, "cod_charges": 28.75, "cod_percentage": 0.01725 }
//     }
//   },
  
//   "Amazon": {
//     "Surface": {
//       "0.5": { "z_a": 32, "z_b": 39, "z_c": 44, "z_d": 50, "z_e": 55, "cod_charges": 22, "cod_percentage": 0.016 }
//     }
//   },
  
//   "Shadowfax": {
//     "Surface": {
//       "0.5": { "z_a": 26, "z_b": 28, "z_c": 35, "z_d": 39, "z_e": 60, "cod_charges": 22, "cod_percentage": 0.014 },
//       "2 Kgs": { "z_a": 43.7, "z_b": 48.3, "z_c": 59.8, "z_d": 79.35, "z_e": 102.35, "cod_charges": 43.7, "cod_percentage": 0.0207 }
//     }
//   },
  
//   "Shree Maruti": {
//     "Surface": {
//       "0.5": { "z_a": 17, "z_b": 22, "z_c": 25, "z_d": 31, "z_e": 26, "cod_charges": 23, "cod_percentage": 0.0115 }
//     },
//     "Air": {
//       "0.5": { "z_a": 29, "z_b": 33, "z_c": 43, "z_d": 54, "z_e": 67, "cod_charges": 23, "cod_percentage": 0.0115 }
//     }
//   },
  
//   "BlueDart": {
//     "Surface": {
//       "0.5": { "z_a": 37.95, "z_b": 40.25, "z_c": 43.7, "z_d": 46, "z_e": 59.8, "cod_charges": 31.05, "cod_percentage": 0.01725 }
//     },
//     "Air": {
//       "0.5": { "z_a": 40.25, "z_b": 50.6, "z_c": 69, "z_d": 75.9, "z_e": 101.2, "cod_charges": 31.05, "cod_percentage": 0.01725 }
//     }
//   },
  
//   "Professional": {
//     "Surface": {
//       "0.25": { "z_a": 11.5, "z_b": 13.8, "z_c": 16.1, "z_d": 18.4, "z_e": 23, "cod_charges": 0, "cod_percentage": 0 },
//       "0.5": { "z_a": 16.1, "z_b": 18.4, "z_c": 21.85, "z_d": 25.3, "z_e": 28.75, "cod_charges": 0, "cod_percentage": 0 }
//     }
//   }
// };

// Courier name mapping from external API to your chart names
const courierMapping = {
  "XpressBees Surface": "Xpressbees",
  "XpressBees Surface 5 Kg": "Xpressbees", 
  "XpressBees Surface 2 Kg": "Xpressbees",
  "XpressBees Surface 1 Kg": "Xpressbees",
  "XpressBees Air": "Xpressbees",
  
  "Delhivery Surface": "Delhivery",
  "Delhivery Surface 2 Kg": "Delhivery",
  "Delhivery Surface 5 Kg": "Delhivery",
  "Delhivery Air": "Delhivery",
  "Delhivery Document": "Delhivery",
  
  "DTDC Surface": "DTDC",
  "DTDC Air": "DTDC",
  
  "Ecom Express Surface": "Ecom Express",
  
  "Ekart Surface": "Ekart",
  
  "Amazon Surface": "Amazon",
  
  "Shadowfax Surface": "Shadowfax",
  "Shadowfax Surface 2 Kg": "Shadowfax",
  
  "Shree Maruti Surface": "Shree Maruti",
  "Shree Maruti Air": "Shree Maruti",
  
  "BlueDart Express": "Bluedart 500 gms",
  "Bluedart 500 gms Surface": "Bluedart 500 gms",
  "Bluedart 500 gms Air": "Bluedart 500 gms",
  
  "Professional Surface": "Professional"
};



async function calculateShippingPrice(availableCouriers, zone, weight, orderValue, isCOD) {
  const results = [];
  let temp = zone;
  let GST=0;
  let total_price=0

  availableCouriers.forEach(courier=> {
    // Step 1: Map external courier name to Excel chart name
    // const excelCourierName = courierMapping[courier.courier_name];
    const excelCourierName = courier.parent_courier_name;
    
    // Step 2: Get weight slab
    const weightSlab = getWeightSlab(weight);
    // console.log(weightSlab);

    // console.log(`type:${courier.freight_mode}`);
    
    
    
    // Step 3: Find price from Excel chart
    const chartData = excelChart[excelCourierName]?.[courier.freight_mode]?.[weightSlab];
      // console.log(chartData);
      
    if (chartData) {
      let totalFreight = chartData[temp] + 20;
      // console.log(`price -----${totalFreight}`);
      
      // Step 4: Add COD charges if applicable
      if (isCOD) {
        const codCharges = calculateCODCharges(
          orderValue, 
          chartData.cod_charges, 
          chartData.cod_percentage
        );
        totalFreight += codCharges;
      }

       GST = Math.ceil(totalFreight * 0.18);
       total_price= totalFreight + GST;
      
      // Step 5: Prepare final object
      results.push({
        courier_code: courier.courier_code,
        courier_name: courier.courier_name,
        parent_courier_name: courier.parent_courier_name,
        cutoff_time: courier.cutoff_time,
        freight_mode: courier.freight_mode,
        max_weight: courier.max_weight,
        min_weight: courier.min_weight,
        total_freight: Math.ceil( totalFreight ) , 
        GST:GST,
        total_Price_GST_Included: total_price,
        edd: courier.edd,
        epd: null
      });
      totalFreight = 0;
      GST=0;
      total_price=0
    }
  });
  
  return results;
}

module.exports = calculateShippingPrice;