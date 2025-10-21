//  CONVERSION CARD ELEMENTS SELECTION
const temperatureInput = document.getElementById('entered_values');
const fromUnitSelect = document.getElementById('from_temperature');
const toUnitSelect = document.getElementById('to_temperature');
const convertButton = document.querySelector('.conversion_button');
const conversionForm = document.querySelector('.conversion_card');
const errorMessage = document.querySelector('.error_content');


// RESULT DISPLAY ELEMENTS SELECTION
const resultContainer = document.querySelector(".result_container");
const inputResultValue = document.querySelector('.input_result_value');
const inputResultUnit = document.querySelector('.input_result_unit');
const outputResultValue = document.querySelector('.output_result_value');
const outputResultUnit = document.querySelector('.output_result_unit');

// EQUIVALENT TEMPERATURE DISPLAY ELEMENTS SELECTION
const celsiusEquivalent = document.querySelector('.celsius_equivalent .equivalent_value');
const fahrenheitEquivalent = document.querySelector('.Farenheit_equivalent .equivalent_value');
const kelvinEquivalent = document.querySelector('.Kelvin_equivalent .equivalent_value');

// Hide result container initially
// resultContainer.style.display = 'none';


// FUNCTION TO VALIDATE INPUT = NOT EMPTY AND A VALID NUMBER
function isValidInput(input) {
  // Check if input is empty
  if (input.trim() === '') {
    return false;
  }
  // Check if input is a valid number
    if (isNaN(input)) {
        return false;
    }
     return true;
}

// ERROR DISPLAY HANDLING
// FUNCTION TO SHOW ERROR MESSAGE 
function showError() {
  errorMessage.style.display = 'flex';
  resultContainer.style.display = 'none';
}

// FUNCTION TO HIDE ERROR MESSAGE
function hideError() {
  errorMessage.style.display = 'none';
}


// CONVERSION FUNCTIONS
// FUNCTION TO CONVERT ANY TEMPERATURE TO CELSIUS (THE CENTRAL POINT)
function convertToCelsius(value, unit) {
  if (unit === 'Celsius') {
    return value;
  } else if (unit === 'Farenheit') {
    return (value - 32) * (5 / 9);
  } else if (unit === 'Kelvin') {
    return value - 273.15;
  }
}

// FUNCTION TO CONVERT CELSIUS TO ANY TARGET UNIT
function convertFromCelsius(celsiusValue, unit) {
  if (unit === 'Celsius') {
    return celsiusValue;
  } else if (unit === 'Farenheit') {
    return (celsiusValue * 9 / 5) + 32;
  } else if (unit === 'Kelvin') {
    return celsiusValue + 273.15;
  }
}

// FUNCTION TO ROUND TO 2 DECIMALS
function roundToTwoDecimals(number) {
  return Math.round(number * 100) / 100;
}

// FUNCTION TO PERFORM THE CONVERSION AND UPDATE THE DISPLAY
function performConversion() {
  // Get the input value
  const inputValue = temperatureInput.value;
  
  // Get the selected units
  const fromUnit = fromUnitSelect.value;
  const toUnit = toUnitSelect.value;
  
  // VALIDATE INPUT= Show error if input is invalid
  if (!isValidInput(inputValue)) {
    showError();
    return;
  }
  
  // HIDE ERROR IF INPUT IS VALID
  hideError();
  
    // CONVERTION PROCESS = 2 STEPS
    // USING FUNCTION EXPRESSIONS
  const numberValue = parseFloat(inputValue);
  
  // Step 1: CONVERTING TO CELSIUS (the central point)
  const celsiusValue = convertToCelsius(numberValue, fromUnit);
  
  // Step 2: CONVERTING FROM CELSIUS TO TARGET UNIT
  const convertedValue = convertFromCelsius(celsiusValue, toUnit);
  
  // ROUNDING  BOTH THE INPUT AND THE CONVERTED VALUES TO 2 DECIMALS
  const roundedInputValue = roundToTwoDecimals(numberValue);
  const roundedConvertedValue = roundToTwoDecimals(convertedValue);
  
  // GETTING UNIT SYMBOLS
  const fromUnitSymbol = getUnitSymbol(fromUnit);
  const toUnitSymbol = getUnitSymbol(toUnit);
  
  // UPDATING RESULT DISPLAY
  inputResultValue.textContent = roundedInputValue;
  inputResultUnit.textContent = fromUnitSymbol;
  outputResultValue.textContent = roundedConvertedValue;
  outputResultUnit.textContent = toUnitSymbol;
  
  // CALCULATING EQUIVALENT TEMPERATURES
  const celsiusEquivalentValue = roundToTwoDecimals(celsiusValue);
  const fahrenheitEquivalentValue = roundToTwoDecimals(convertFromCelsius(celsiusValue, 'Farenheit'));
  const kelvinEquivalentValue = roundToTwoDecimals(convertFromCelsius(celsiusValue, 'Kelvin'));
  
  // UPDATING EQUIVALENT TEMPERATURES DISPLAY
  celsiusEquivalent.textContent = celsiusEquivalentValue + ' °C';
  fahrenheitEquivalent.textContent = fahrenheitEquivalentValue + ' °F';
  kelvinEquivalent.textContent = kelvinEquivalentValue + ' K';
  
  // Show result container
    resultContainer.style.display = 'flex';
}  // END OF performConversion FUNCTION


// FUNCTION TO GET UNIT SYMBOL
function getUnitSymbol(unit) {
  if (unit === 'Celsius') {
    return '°C';
  } else if (unit === 'Farenheit') {
    return '°F';
  } else if (unit === 'Kelvin') {
    return 'K';
  }
}

// ADDITION OF EVENT LISTENER TO THE CONVERT BUTTON
convertButton.addEventListener('click', function(event) {
  event.preventDefault();
  performConversion();
});

// ADDITION OF EVENT LISTENER TO THE FORM SUBMISSION TO HANDLE 'ENTER' KEY PRESS 
conversionForm.addEventListener('submit', function(event) {
  event.preventDefault();
  performConversion();
});
