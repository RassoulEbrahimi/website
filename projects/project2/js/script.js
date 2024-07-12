document.addEventListener('DOMContentLoaded', () => {
    const unitType = document.getElementById('unitType');
    const convertButton = document.getElementById('convertButton');
    const result = document.getElementById('result');

    unitType.addEventListener('change', handleUnitTypeChange);
    convertButton.addEventListener('click', handleConversion);

    function handleUnitTypeChange() {
        const unitOptions = document.querySelectorAll('.unit-options');
        unitOptions.forEach(option => option.style.display = 'none');

        const selectedUnitType = unitType.value;
        document.getElementById(`${selectedUnitType}Units`).style.display = 'block';
    }

    // Call handleUnitTypeChange once when the page loads
    handleUnitTypeChange();

    function handleConversion() {
        const inputValue = parseFloat(document.getElementById('inputValue').value);
        const selectedUnitType = unitType.value;

        let fromUnit, toUnit, convertedValue;

        switch (selectedUnitType) {
            case 'length':
                fromUnit = document.getElementById('fromLengthUnit').value;
                toUnit = document.getElementById('toLengthUnit').value;
                convertedValue = convertLength(inputValue, fromUnit, toUnit);
                break;
            case 'weight':
                fromUnit = document.getElementById('fromWeightUnit').value;
                toUnit = document.getElementById('toWeightUnit').value;
                convertedValue = convertWeight(inputValue, fromUnit, toUnit);
                break;
            case 'temperature':
                fromUnit = document.getElementById('fromTemperatureUnit').value;
                toUnit = document.getElementById('toTemperatureUnit').value;
                convertedValue = convertTemperature(inputValue, fromUnit, toUnit);
                break;
        }

        result.textContent = `Result: ${convertedValue} ${toUnit}`;
    }

    function convertLength(value, fromUnit, toUnit) {
        const conversionRates = {
            meters: 1,
            kilometers: 0.001,
            miles: 0.000621371,
            feet: 3.28084,
            inches: 39.3701
        };

        if (!conversionRates[fromUnit] || !conversionRates[toUnit]) {
            throw new Error("Invalid length units provided");
        }

        const result = (value / conversionRates[fromUnit]) * conversionRates[toUnit];
        return Number(result.toFixed(6)); // Round to 6 decimal places
    }

    function convertWeight(value, fromUnit, toUnit) {
        const conversionRates = {
            grams: 1,
            kilograms: 0.001,
            pounds: 0.00220462,
            ounces: 0.035274
        };

        if (!conversionRates[fromUnit] || !conversionRates[toUnit]) {
            throw new Error("Invalid weight units provided");
        }

        const result = (value / conversionRates[fromUnit]) * conversionRates[toUnit];
        return Number(result.toFixed(6)); // Round to 6 decimal places
    }

    function convertTemperature(value, fromUnit, toUnit) {
        let result;

        if (fromUnit === 'celsius') {
            if (toUnit === 'fahrenheit') {
                result = (value * 9/5) + 32;
            } else if (toUnit === 'kelvin') {
                result = value + 273.15;
            } else if (toUnit === 'celsius') {
                result = value;
            }

        } else if (fromUnit === 'fahrenheit') {
            if (toUnit === 'celsius') {
                result = (value - 32) * 5/9;
            } else if (toUnit === 'kelvin') {
                result = ((value - 32) * 5/9) + 273.15;
            } else if (toUnit === 'fahrenheit') {
                result = value;
            }

        } else if (fromUnit === 'kelvin') {
            if (toUnit === 'celsius') {
                result = value - 273.15;
            } else if (toUnit === 'fahrenheit') {
                result = ((value - 273.15) * 9/5) + 32;
            } else if (toUnit === 'kelvin') {
                result = value;
            } 
        } else {
            throw new Error("Invalid temperature units provided");
        }

        if (result !== undefined) {
            return Number(result.toFixed(6)); // Round to 6 decimal places
        }
        throw new Error("Conversion not possible with given units");
    }

    // Example usage
    console.log(convertLength(1000, 'meters', 'kilometers')); // 1
    console.log(convertWeight(1000, 'grams', 'kilograms')); // 1
    console.log(convertTemperature(0, 'celsius', 'fahrenheit')); // 32
});