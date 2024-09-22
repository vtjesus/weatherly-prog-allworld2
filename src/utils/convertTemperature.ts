const convertTemperature = (celsiusTemp: number, unit: "C" | "F"): number => {
  if (unit === "F") {
    const fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
    return Math.round(fahrenheitTemp); // Convert to Fahrenheit rounded
  }
  return Math.round(celsiusTemp); // Return Celsius rounded
};

export default convertTemperature;
