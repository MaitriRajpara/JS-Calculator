import { saveHistory } from './history.js';
import { handleMC, handleMR, handleMS, handleMplusAndMinus } from './memory.js';

export const Operation = (function () {
    function Operation(screenId) {
        this.screen = document.getElementById(screenId);
        if (!this.screen) {
            throw new Error(`Screen element with id "${screenId}" not found.`);
        }
        let storedMemory = localStorage.getItem("calculationOutput");
        this.screen.textContent = storedMemory || '0';
        this.isDegreeMode = true;
        this.updateDegButton();
    }

    Operation.prototype.appendValue = function (value) {
        if (this.screen.textContent === '0') {
            this.screen.textContent = value;
        } else {
            this.screen.textContent += value;
        }
    };

    //initialize memory buttons
    Operation.prototype.initializeMemoryFunctions = function () {
        const screen = this.screen;

        // Bind memory functions
        document.querySelector('.mc-btn').addEventListener('click', () => handleMC());
        document.querySelector('.mr-btn').addEventListener('click', () => handleMR(screen));
        document.querySelector('.ms-btn').addEventListener('click', () =>
            handleMS(screen, (input) => input.textContent)
        );
        document.querySelector('.mplus-btn').addEventListener('click', (event) =>
            handleMplusAndMinus(event.target, screen, (input) => input.textContent)
        );
        document.querySelector('.mminus-btn').addEventListener('click', (event) =>
            handleMplusAndMinus(event.target, screen, (input) => input.textContent)
        );
    };


    // Basic arithmetic operations
    Operation.prototype.add = function () {
        this.appendValue('+');
    };

    Operation.prototype.subtract = function () {
        this.appendValue('-');
    };

    Operation.prototype.multiply = function () {
        this.appendValue('×');
    };

    Operation.prototype.divide = function () {
        this.appendValue('÷');
    };

    Operation.prototype.addOpenParenthesis = function () {
        this.appendValue('(');
    };

    Operation.prototype.addCloseParenthesis = function () {
        this.appendValue(')');
    };

    // Backspace
    Operation.prototype.backspace = function () {
        let currentValue = this.screen.textContent;
        this.screen.textContent = currentValue.slice(0, -1) || '0';
    };

    // Clear 
    Operation.prototype.clearDisplay = function () {
        this.screen.textContent = '0';
    };

    // Evaluate result and save to history
    Operation.prototype.result = function () {
        let expression = this.screen.textContent
            .replace('×', '*')
            .replace('÷', '/')
            .replace('%', '%')
            .replace('^', '**');

        try {
            // Evaluate the expression
            const evaluatedResult = eval(expression);

            // Update the screen with the result
            this.screen.textContent = evaluatedResult;

            // Save calculation to history
            saveHistory(`${expression} = ${evaluatedResult}`);
        } catch (error) {
            this.screen.textContent = 'Error';
            console.error("Error evaluating expression:", error);
        }
    };

    // Append the value of Pi
    Operation.prototype.appendPi = function () {
        const pi = Math.PI.toFixed(8);
        if (this.screen.textContent === '0') {
            this.appendValue(pi);
        } else {
            this.appendValue(`*${pi}`);
        }
    };

    // Math functions
    Operation.prototype.modulus = function () {
        this.appendValue('%');
    };

    // Adds an exponentiation operator (^) to the screen
    Operation.prototype.exponent = function () {
        this.appendValue('^');
    };

    // Computes the factorial of the displayed number
    Operation.prototype.factorial = function () {
        const num = parseInt(this.screen.textContent, 10);
        if (isNaN(num) || num < 0) {
            this.screen.textContent = 'Error'; // Factorial is only defined for non-negative integers
        } else {
            let fact = 1;
            for (let i = 2; i <= num; i++) {
                fact *= i;
            }
            this.screen.textContent = fact;
        }
    };

    // Computes the base-10 logarithm of the displayed number
    Operation.prototype.log = function () {
        const num = parseFloat(this.screen.textContent);
        if (isNaN(num) || num <= 0) {
            this.screen.textContent = 'Error'; // Logarithm is undefined for non-positive numbers
        } else {
            this.screen.textContent = Math.log10(num);
        }
    };

    // Computes Euler’s number (e) raised to the power of the displayed number
    Operation.prototype.eulersFormula = function () {
        const x = parseFloat(this.screen.textContent);
        if (isNaN(x)) {
            this.screen.textContent = 'Error';
        } else {
            this.screen.textContent = Math.exp(x);
        }
    };

    // Computes the reciprocal (1/x) of the displayed number
    Operation.prototype.reciprocal = function () {
        const x = parseFloat(this.screen.textContent);
        if (isNaN(x) || x === 0) {
            this.screen.textContent = 'Error'; // Division by zero is undefined
        } else {
            this.screen.textContent = (1 / x);
        }
    };

    // Computes the natural logarithm (ln) of the displayed number
    Operation.prototype.ln = function () {
        const x = parseFloat(this.screen.textContent);
        if (isNaN(x) || x <= 0) {
            this.screen.textContent = 'Error'; // ln(x) is undefined for non-positive numbers
        } else {
            this.screen.textContent = Math.log(x);
        }
    };

    // Computes the absolute value of the displayed number
    Operation.prototype.absoluteValue = function () {
        const x = parseFloat(this.screen.textContent);
        if (isNaN(x)) {
            this.screen.textContent = 'Error';
        } else {
            this.screen.textContent = Math.abs(x);
        }
    };

    // Squares the displayed number
    Operation.prototype.square = function () {
        const num = parseFloat(this.screen.textContent);
        if (isNaN(num)) {
            this.screen.textContent = 'Error';
        } else {
            this.screen.textContent = Math.pow(num, 2);
        }
    };

    // Computes the square root of the displayed number
    Operation.prototype.sqrt = function () {
        const x = parseFloat(this.screen.textContent);
        if (isNaN(x) || x < 0) {
            this.screen.textContent = 'Error'; // Square root is undefined for negative numbers
        } else {
            this.screen.textContent = Math.sqrt(x);
        }
    };

    // Computes the power of a number in the format "x^y"
    Operation.prototype.powerofXY = function () {
        const expression = this.screen.textContent.split('^');
        if (expression.length !== 2) {
            this.screen.textContent = 'Error'; // Ensures proper input format
            return;
        }

        const base = parseFloat(expression[0]);
        const exponent = parseFloat(expression[1]);

        if (isNaN(base) || isNaN(exponent)) {
            this.screen.textContent = 'Error';
        } else {
            this.screen.textContent = Math.pow(base, exponent);
        }
    };

    // Inserts the exponentiation symbol (^) if not already present
    Operation.prototype.power = function () {
        if (!this.screen.textContent.includes('^')) {
            this.appendValue('^');
        }
    };

    // Computes 10 raised to the power of the displayed number
    Operation.prototype.tenPowerX = function () {
        const value = parseFloat(this.screen.textContent);
        if (!isNaN(value)) {
            this.screen.textContent = Math.pow(10, value);
        } else {
            this.screen.textContent = 'Error';
        }
    };

    // Changes the sign of the displayed number (positive to negative or vice versa)
    Operation.prototype.changeSign = function () {
        const currentValue = parseFloat(this.screen.textContent);
        if (!isNaN(currentValue)) {
            this.screen.textContent = (currentValue * -1);
        }
    };

    // Toggles between degrees and radians mode for trigonometric functions
    Operation.prototype.setDegMode = function () {
        this.isDegreeMode = !this.isDegreeMode;
        console.log("Degree mode set to:", this.isDegreeMode);
        this.updateDegButton();
    };

    // Updates the display button text to indicate DEG or RAD mode
    Operation.prototype.updateDegButton = function () {
        const degButton = document.getElementById("deg-btn");
        if (degButton) {
            degButton.innerText = this.isDegreeMode ? "DEG" : "RAD";
        }
    };

    // Computes trigonometric functions (sin, cos, tan) based on the current mode (degrees or radians)
    Operation.prototype.trigometry = function (func) {
        let inputValue = parseFloat(this.screen.textContent);
        if (isNaN(inputValue)) {
            this.screen.textContent = "Error";
            return;
        }

        let angle = this.isDegreeMode ? (inputValue * Math.PI) / 180 : inputValue; // Convert degrees to radians if needed
        let result;

        switch (func) {
            case "sin":
                result = Math.sin(angle);
                break;
            case "cos":
                result = Math.cos(angle);
                break;
            case "tan":
                result = Math.tan(angle);
                break;
            default:
                this.display.value = "Error";
                return;
        }

        this.screen.textContent = result;

        // Saves calculation in history
        const trigExpression = `${func}(${inputValue}${this.isDegreeMode ? '°' : ' rad'}) = ${result}`;
        saveHistory(trigExpression);

        console.log(`Trig function: ${func}, Input: ${inputValue}, Mode: ${this.isDegreeMode ? 'Degrees' : 'Radians'}, Result: ${result}`);
    };

    // Converts number into exponential notation (scientific format)
    Operation.prototype.FEMode = function () {
        let inputStr = this.screen.textContent;
        if (!inputStr || isNaN(Number(inputStr))) return;

        let num = Number(inputStr);
        this.isExponentialMode = !this.isExponentialMode;

        if (this.isExponentialMode) {
            let exponent = num.toExponential().split("e");
            let updatedInputStr = `${exponent[0]}*10**${Number(exponent[1])}`;
            let updatedDisplayStr = `${exponent[0]}*10^${Number(exponent[1])}`;
            this.screen.textContent = updatedDisplayStr;
            this.isExponentialMode = false;
        } else {
            this.display.value = num.toString();
        }
    };

    // Rounds the displayed number down to the nearest integer
    Operation.prototype.floor = function () {
        let value = parseFloat(this.screen.textContent);
        if (!isNaN(value)) {
            this.screen.textContent = Math.floor(value);
        } else {
            this.screen.textContent = "Error";
        }
    };

    // Rounds the displayed number up to the nearest integer
    Operation.prototype.ceil = function () {
        let value = parseFloat(this.screen.textContent);
        if (!isNaN(value)) {
            this.screen.textContent = Math.ceil(value);
        } else {
            this.screen.textContent = "Error";
        }
    };


    return Operation;
})();
