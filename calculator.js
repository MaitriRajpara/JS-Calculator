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

    Calculator.prototype.appendValue = function (value) {
        const currentText = this.screen.textContent;

        const operators = ['+', '-', '×', '÷', '.'];
        const lastChar = currentText.slice(-1);

        if (this.calculationDone) {
            this.screen.textContent = '';
            this.calculationDone = false;
        }

        // Check for consecutive operators
        if (operators.includes(lastChar) && operators.includes(value)) {
            return;
        }

        // Prevent multiple dots in the same number
        if (value === '.' && (lastChar === '.' || currentText.split(/[\+\-\*\/]/).pop().includes('.'))) {
            alert("cannot enter multiple decimal value");
            return;
        }

        if (this.screen.textContent === '0' && !operators.includes(value)) {
            this.screen.textContent = value;
        } else {
            this.screen.textContent += value;
        }
    };

    //initialize memory buttons
    Calculator.prototype.initializeMemoryFunctions = function () {
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

    // Backspace
    Calculator.prototype.backspace = function () {
        let currentValue = this.screen.textContent;
        this.screen.textContent = currentValue.slice(0, -1) || '0';
    };

    // Clear 
    Calculator.prototype.clearDisplay = function () {
        this.screen.textContent = '0';
    };

    // Evaluate result and save to history
    Calculator.prototype.result = function () {
        let expression = this.screen.textContent
            .replace('×', '*')
            .replace('÷', '/')
            .replace('%', '%')
            .replace('^', '**')
            .replace(/π/g, Math.PI);
        try {
            // Evaluate the expression
            const evaluatedResult = eval(expression);

            // Update the screen with the result
            this.screen.textContent = evaluatedResult;
            this.calculationDone = true;
            // Save calculation to history
            saveHistory(`${expression} = ${evaluatedResult}`);
        } catch (error) {
            alert("Error");
        }
    };

    // Append the value of Pi
    Calculator.prototype.appendPi = function () {
        const piSymbol = 'π';
        if (this.screen.textContent === '0') {
            this.appendValue(piSymbol);
        } else {
            this.appendValue(`${piSymbol}`);
        }
    };

    // Math functions
    Calculator.prototype.modulus = function () {
        this.appendValue('%');
    };

    Calculator.prototype.decimal = function () {
        this.appendValue('.');
    };

    Calculator.prototype.exponent = function () {
        this.appendValue('^');
    };

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

    Calculator.prototype.log = function () {
        const num = parseFloat(this.screen.textContent);
        if (isNaN(num) || num <= 0) {
            this.screen.textContent = 'Error';
        } else {
            this.screen.textContent = Math.log10(num);
        }
    };

    Calculator.prototype.eulersFormula = function () {
        const x = parseFloat(this.screen.textContent);
        if (isNaN(x)) {
            this.screen.textContent = 'Error';
        } else {
            this.screen.textContent = Math.exp(x);
        }
    };

    Calculator.prototype.reciprocal = function () {
        const x = parseFloat(this.screen.textContent);
        if (isNaN(x) || x === 0) {
            this.screen.textContent = 'Error';
        } else {
            this.screen.textContent = (1 / x);
        }
    };

    Calculator.prototype.ln = function () {
        const x = parseFloat(this.screen.textContent);
        if (isNaN(x) || x <= 0) {
            this.screen.textContent = 'Error';
        } else {
            this.screen.textContent = Math.log(x);
        }
    };

    Calculator.prototype.absoluteValue = function () {
        const x = parseFloat(this.screen.textContent);
        if (isNaN(x)) {
            this.screen.textContent = 'Error';
        } else {
            this.screen.textContent = Math.abs(x);
        }
    };

    Calculator.prototype.square = function () {
        const num = parseFloat(this.screen.textContent);
        if (isNaN(num)) {
            this.screen.textContent = 'Error';
        } else {
            this.screen.textContent = Math.pow(num, 2);
        }
    };

    Calculator.prototype.sqrt = function () {
        const x = parseFloat(this.screen.textContent);
        if (isNaN(x) || x < 0) {
            this.screen.textContent = 'Error';
        } else {
            this.screen.textContent = Math.sqrt(x);
        }
    };

    Calculator.prototype.powerofXY = function () {
        const expression = this.screen.textContent.split('^');
        if (expression.length !== 2) {
            this.screen.textContent = 'Error';
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


    Calculator.prototype.power = function () {
        if (!this.screen.textContent.includes('^')) {
            this.appendValue('^');
        }
    };

    Calculator.prototype.tenPowerX = function () {
        const value = parseFloat(this.screen.textContent);
        if (!isNaN(value)) {
            this.screen.textContent = Math.pow(10, value);
        } else {
            this.screen.textContent = 'Error';
        }
    };

    Calculator.prototype.changeSign = function () {
        const currentValue = parseFloat(this.screen.textContent);
        if (!isNaN(currentValue)) {
            this.screen.textContent = (currentValue * -1);
        }
    };

    Calculator.prototype.setDegMode = function () {
        this.isDegreeMode = !this.isDegreeMode;
        console.log("Degree mode set to:", this.isDegreeMode);
        this.updateDegButton();
    }

    Calculator.prototype.updateDegButton = function () {
        const degButton = document.getElementById("deg-btn");
        if (degButton) {
            degButton.innerText = this.isDegreeMode ? "DEG" : "RAD";
        }
    }

    Calculator.prototype.trigometry = function (func) {
        let inputValue = parseFloat(this.screen.textContent);
        if (isNaN(inputValue)) {
            this.screen.textContent = "Error";
            return;
        }
        let angle = this.isDegreeMode ? (inputValue * Math.PI) / 180 : inputValue;
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
        const trigExpression = `${func}(${inputValue}${this.isDegreeMode ? '°' : ' rad'}) = ${result}`;
        saveHistory(trigExpression);

        console.log(`Trig function: ${func}, Input: ${inputValue}, Mode: ${this.isDegreeMode ? 'Degrees' : 'Radians'}, Result: ${result}`);
    };

    Calculator.prototype.FEMode = function () {
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

    Calculator.prototype.floor = function () {
        let value = parseFloat(this.screen.textContent);

        if (!isNaN(value)) {
            this.screen.textContent = Math.floor(value);

        } else {
            this.screen.textContent = "Error";
        }
    }

    Calculator.prototype.ceil = function () {
        let value = parseFloat(this.screen.textContent);
        if (!isNaN(value)) {
            this.screen.textContent = Math.ceil(value);
        } else {
            this.screen.textContent = "Error";
        }
    }

    return Calculator;
})();

// import { saveHistory } from './history.js';
// import { handleMC, handleMR, handleMS, handleMplusAndMinus } from './memory.js';

// export const Calculator = (function () {
//     function Calculator(screenId) {
//         this.screen = document.getElementById(screenId);
//         if (!this.screen) {
//             throw new Error(`Screen element with id "${screenId}" not found.`);
//         }
//         let storedMemory = localStorage.getItem("calculationOutput");
//         this.screen.textContent = storedMemory || '0';
//         this.isDegreeMode = true;
//         this.updateDegButton();
//     }

//     Calculator.prototype.appendValue = function (value) {
//         if (this.screen.textContent === '0') {
//             this.screen.textContent = value;
//         } else {
//             this.screen.textContent += value;
//         }
//     };

//     Calculator.prototype.result = function () {
//         let expression = this.screen.textContent
//             .replace('×', '*')
//             .replace('÷', '/')
//             .replace('%', '/100')  // Modulus is tricky; ensure it's used correctly
//             .replace('^', '**');

//         try {
//             this.screen.textContent = eval(expression);
//             saveHistory(`${expression} = ${this.screen.textContent}`);
//         } catch (error) {
//             this.screen.textContent = 'Error';
//             console.error("Error evaluating expression:", error);
//         }
//     };

//     // Convert functions to use eval where applicable
//     Calculator.prototype.factorial = function () {
//         let expression = this.screen.textContent;
//         if (!/^\d+$/.test(expression)) {
//             this.screen.textContent = 'Error';
//             return;
//         }
//         this.screen.textContent = eval([...Array(parseInt(expression, 10) + 1).keys()].slice(1).join('*') || '1');
//     };

//     Calculator.prototype.log = function () {
//         this.screen.textContent = eval(`Math.log10(${this.screen.textContent})`);
//     };

//     Calculator.prototype.eulersFormula = function () {
//         this.screen.textContent = eval(`Math.exp(${this.screen.textContent})`);
//     };

//     Calculator.prototype.reciprocal = function () {
//         this.screen.textContent = eval(`1/${this.screen.textContent}`);
//     };

//     Calculator.prototype.ln = function () {
//         this.screen.textContent = eval(`Math.log(${this.screen.textContent})`);
//     };

//     Calculator.prototype.absoluteValue = function () {
//         this.screen.textContent = eval(`Math.abs(${this.screen.textContent})`);
//     };

//     Calculator.prototype.square = function () {
//         this.screen.textContent = eval(`Math.pow(${this.screen.textContent}, 2)`);
//     };

//     Calculator.prototype.sqrt = function () {
//         this.screen.textContent = eval(`Math.sqrt(${this.screen.textContent})`);
//     };

//     Calculator.prototype.powerofXY = function () {
//         this.result();
//     };

//     Calculator.prototype.tenPowerX = function () {
//         this.screen.textContent = eval(`Math.pow(10, ${this.screen.textContent})`);
//     };

//     Calculator.prototype.changeSign = function () {
//         this.screen.textContent = eval(`${this.screen.textContent} * -1`);
//     };

//     Calculator.prototype.floor = function () {
//         this.screen.textContent = eval(`Math.floor(${this.screen.textContent})`);
//     };

//     Calculator.prototype.ceil = function () {
//         this.screen.textContent = eval(`Math.ceil(${this.screen.textContent})`);
//     };

//     return Calculator;
// })();
