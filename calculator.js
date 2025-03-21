import { saveHistory } from './history.js';
import { handleMC, handleMR, handleMS, handleMplusAndMinus } from './memory.js';

export const Calculator = (function () {
    function Calculator(screenId) {
        this.screen = document.getElementById(screenId);
        if (!this.screen) {
            throw new Error(`Screen element with id "${screenId}" not found.`);
        }
        let storedMemory = localStorage.getItem("calculationOutput");
        this.screen.textContent = storedMemory || '0';
        this.isDegreeMode = true;
        this.updateDegButton();
    }

    // Append a value (number/operator) to the calculator screen
    Calculator.prototype.appendValue = function (value) {
        const currentText = this.screen.textContent;
        const operators = ['+', '-', '×', '÷', '.'];
        const lastChar = currentText.slice(-1);

        if (this.calculationDone) {
            this.screen.textContent = '';
            this.calculationDone = false;
        }

        // Prevent consecutive operators
        if (operators.includes(lastChar) && operators.includes(value)) {
            return;
        }

        // Prevent multiple decimal points in a single number
        if (value === '.' && (lastChar === '.' || currentText.split(/[\+\-\*\/]/).pop().includes('.'))) {
            alert("Cannot enter multiple decimal values");
            return;
        }

        if (this.screen.textContent === '0' && !operators.includes(value)) {
            this.screen.textContent = value;
        } else {
            this.screen.textContent += value;
        }
    };

    // Initialize memory function buttons
    Calculator.prototype.initializeMemoryFunctions = function () {
        const screen = this.screen;

        // Bind memory functions to respective buttons
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
    Calculator.prototype.add = function () {
        this.appendValue('+');
    };

    Calculator.prototype.subtract = function () {
        this.appendValue('-');
    };

    Calculator.prototype.multiply = function () {
        this.appendValue('×');
    };

    Calculator.prototype.divide = function () {
        this.appendValue('÷');
    };

    Calculator.prototype.addOpenParenthesis = function () {
        this.appendValue('(');
    };

    Calculator.prototype.addCloseParenthesis = function () {
        this.appendValue(')');
    };

    // Remove the last character (Backspace functionality)
    Calculator.prototype.backspace = function () {
        let currentValue = this.screen.textContent;
        this.screen.textContent = currentValue.slice(0, -1) || '0';
    };

    // Clear the calculator display
    Calculator.prototype.clearDisplay = function () {
        this.screen.textContent = '0';
    };

    // Evaluate the mathematical expression
    Calculator.prototype.result = function () {
        let expression = this.screen.textContent
            .replace('×', '*')
            .replace('÷', '/')
            .replace('%', '%')
            .replace('^', '**')
            .replace(/π/g, Math.PI);

        try {
            // Compute the result
            const evaluatedResult = eval(expression);

            // Display result on the screen
            this.screen.textContent = evaluatedResult;
            this.calculationDone = true;

            // Save calculation history
            saveHistory(`${expression} = ${evaluatedResult}`);
        } catch (error) {
            alert("Error");
        }
    };

    // Insert the value of Pi
    Calculator.prototype.appendPi = function () {
        const piSymbol = 'π';
        if (this.screen.textContent === '0') {
            this.appendValue(piSymbol);
        } else {
            this.appendValue(`${piSymbol}`);
        }
    };

    // Mathematical functions
    Calculator.prototype.modulus = function () {
        this.appendValue('%');
    };

    Calculator.prototype.decimal = function () {
        this.appendValue('.');
    };

    Calculator.prototype.exponent = function () {
        this.appendValue('^');
    };

    // Compute factorial of a number
    Calculator.prototype.factorial = function () {
        const num = parseInt(this.screen.textContent, 10);
        if (isNaN(num) || num < 0) {
            this.screen.textContent = 'Error';
        } else {
            let fact = 1;
            for (let i = 2; i <= num; i++) {
                fact *= i;
            }
            this.screen.textContent = fact;
        }
    };

    // Compute logarithm (base 10)
    Calculator.prototype.log = function () {
        const num = parseFloat(this.screen.textContent);
        if (isNaN(num) || num <= 0) {
            this.screen.textContent = 'Error';
        } else {
            this.screen.textContent = Math.log10(num);
        }
    };

    // Compute e^x
    Calculator.prototype.eulersFormula = function () {
        const x = parseFloat(this.screen.textContent);
        if (isNaN(x)) {
            this.screen.textContent = 'Error';
        } else {
            this.screen.textContent = Math.exp(x);
        }
    };

    // Compute reciprocal (1/x)
    Calculator.prototype.reciprocal = function () {
        const x = parseFloat(this.screen.textContent);
        if (isNaN(x) || x === 0) {
            this.screen.textContent = 'Error';
        } else {
            this.screen.textContent = (1 / x);
        }
    };

    // Compute natural logarithm (ln)
    Calculator.prototype.ln = function () {
        const x = parseFloat(this.screen.textContent);
        if (isNaN(x) || x <= 0) {
            this.screen.textContent = 'Error';
        } else {
            this.screen.textContent = Math.log(x);
        }
    };

    // Compute absolute value
    Calculator.prototype.absoluteValue = function () {
        const x = parseFloat(this.screen.textContent);
        if (isNaN(x)) {
            this.screen.textContent = 'Error';
        } else {
            this.screen.textContent = Math.abs(x);
        }
    };

    // Compute square (x²)
    Calculator.prototype.square = function () {
        const num = parseFloat(this.screen.textContent);
        if (isNaN(num)) {
            this.screen.textContent = 'Error';
        } else {
            this.screen.textContent = Math.pow(num, 2);
        }
    };

    // Compute square root (√x)
    Calculator.prototype.sqrt = function () {
        const x = parseFloat(this.screen.textContent);
        if (isNaN(x) || x < 0) {
            this.screen.textContent = 'Error';
        } else {
            this.screen.textContent = Math.sqrt(x);
        }
    };

    // Toggle between Degree and Radian modes
    Calculator.prototype.setDegMode = function () {
        this.isDegreeMode = !this.isDegreeMode;
        console.log("Degree mode set to:", this.isDegreeMode);
        this.updateDegButton();
    }

    // Update the DEG/RAD button text
    Calculator.prototype.updateDegButton = function () {
        const degButton = document.getElementById("deg-btn");
        if (degButton) {
            degButton.innerText = this.isDegreeMode ? "DEG" : "RAD";
        }
    }

    return Calculator;
})();
