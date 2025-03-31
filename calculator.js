import { saveHistory } from './history.js';
import { handleMC, handleMR, handleMS, handleMplusAndMinus } from './memory.js';

export class Calculator {
    constructor(screenId) {
        this.screen = document.getElementById(screenId);
        if (!this.screen) {
            throw new Error(`Screen element with id "${screenId}" not found.`);
        }
        this.calculationDone = false;
        this.screen.textContent = localStorage.getItem('calculationOutput') || '0';
        this.isDegreeMode = true;
        this.updateDegButton();
        this.isprimary = false;
        this.FEMode = false;

        // Constants for buttons
        const FEButton = document.getElementById("fe-btn");
        const sinBtn = document.querySelector(".sin-btn");
        const cosBtn = document.querySelector(".cos-btn");
        const tanBtn = document.querySelector(".tan-btn");

        if (!FEButton) {
            console.error('F-E Button not found!');
        }

        this.FEButton = FEButton;
        this.sinBtn = sinBtn;
        this.cosBtn = cosBtn;
        this.tanBtn = tanBtn;
    }


    appendValue(value) {
        const currentText = this.screen.textContent;
        const operators = ['+', '-', '×', '÷', '.', '!', '%'];
        const lastChar = currentText.slice(-1);

        // Check if the input exceeds the 20 character limit
        if (currentText.length >= 20) {
            alert("Cannot exceed more than 20 input values");
            return;
        }

        if (this.calculationDone) {
            this.screen.textContent = '';
            this.calculationDone = false;
        }

        if (operators.includes(lastChar) && operators.includes(value)) {
            return;
        }

        if (value === '.' && (lastChar === '.' || currentText.split(/[\+\-\*\%\!/]/).pop().includes('.'))) {
            alert("Cannot enter multiple decimal values");
            return;
        }

        if (this.screen.textContent === '0' && !operators.includes(value)) {
            this.screen.textContent = value;
        } else {
            this.screen.textContent += value;
        }
        this.screen.scrollTo(this.screen.offsetWidth, 0);
    }


    initializeMemoryFunctions() {
        // Constants for memory function buttons
        const mcBtn = document.querySelector('.mc-btn');
        const mrBtn = document.querySelector('.mr-btn');
        const msBtn = document.querySelector('.ms-btn');
        const mplusBtn = document.querySelector('.mplus-btn');
        const mminusBtn = document.querySelector('.mminus-btn');

        mcBtn.addEventListener('click', () => handleMC());
        mrBtn.addEventListener('click', () => handleMR(this.screen));
        msBtn.addEventListener('click', () =>
            handleMS(this.screen, (input) => input.textContent)
        );
        mplusBtn.addEventListener('click', (event) =>
            handleMplusAndMinus(event.target, this.screen, (input) => input.textContent)
        );
        mminusBtn.addEventListener('click', (event) =>
            handleMplusAndMinus(event.target, this.screen, (input) => input.textContent)
        );
    }

    add() {
        this.appendValue('+');
    }

    subtract() {
        this.appendValue('-');
    }

    multiply() {
        this.appendValue('×');
    }

    divide() {
        this.appendValue('÷');
    }

    addOpenParenthesis() {
        this.appendValue('(');
    }

    addCloseParenthesis() {
        this.appendValue(')');
    }

    backspace() {
        let currentValue = this.screen.textContent;
        this.screen.textContent = currentValue.slice(0, -1) || '0';
    }

    clearDisplay() {
        this.screen.textContent = '0';
    }

    tenPowerX() {
        this.appendValue('10^');
    }

    xpowery() {
        if (!this.screen.textContent.includes('^')) {
            this.appendValue('^');
        }
    };

    square() {
        if (!this.screen.textContent.includes('^')) {
            this.appendValue('^2');
        }
    };

    sqrt() {
        this.appendValue('sqrt(');
    };

    log() {
        this.screen.textContent = 'log(';
    };

    ln() {
        this.screen.textContent = 'ln(';
    };

    absoluteValue() {
        this.appendValue('abs(');
    }

    factorial(n) {
        if (n === 0 || n === 1) return 1;
        return n * this.factorial(n - 1)
    }

    result() {
        let expression = this.screen.textContent;

        expression = expression.replace('×', '*')
            .replace('÷', '/')
            .replace('%', '%')
            .replace('/π/g', 'Math.PI')
            .replace('10^', '10**')
            .replace('^', '**')
            .replace('log', 'Math.log10')
            .replace('ln', 'Math.log')
            .replace('abs', 'Math.abs')
            .replace(/\be\b/g, "Math.E")
            .replace('sqrt', 'Math.sqrt')
            .replace(/\bfloor\(/g, "Math.floor(")
            .replace(/(\d+)!/g, "this.factorial($1)")
            .replace(/\bceil\(/g, "Math.ceil(")
        console.log(expression)
        if (!this.isDegreeMode) {
            expression = expression.replace('sin', 'Math.sin')
                .replace('cos', 'Math.cos')
                .replace('tan', 'Math.tan')
                .replace('asin', 'Math.asin')
                .replace('acos', 'Math.acos')
                .replace('atan', 'Math.atan')
        }
        else {
            Math.sindeg = (x) => Math.sin((Math.PI / 180) * x);
            Math.cosdeg = (x) => Math.cos((Math.PI / 180) * x);
            Math.tandeg = (x) => Math.tan((Math.PI / 180) * x);
            expression = expression.replace(/\bsin\(/g, "Math.sindeg(");
            expression = expression.replace(/\bcos\(/g, "Math.cosdeg(");
            expression = expression.replace(/\btan\(/g, "Math.tandeg(");

            Math.asindeg = (x) => (180 / Math.PI) * Math.asin(x);
            Math.acosdeg = (x) => (180 / Math.PI) * Math.acos(x);
            Math.atandeg = (x) => (180 / Math.PI) * Math.atan(x);
            expression = expression.replace(/\basin\(/g, "Math.asin(");
            expression = expression.replace(/\bacos\(/g, "Math.acos(");
            expression = expression.replace(/\batan\(/g, "Math.atan(");
        }

        try {
            console.log(eval(expression))

            const evaluatedResult = eval(expression);
            console.log(evaluatedResult)
            this.screen.textContent = evaluatedResult;
            this.calculationDone = true;
            saveHistory(`${expression} = ${evaluatedResult}`);
        } catch (error) {
            alert('Error');
        }
    }

    appendPi() {
        const piSymbol = 'π';
        if (this.screen.textContent === '0') {
            this.appendValue(piSymbol);
        } else {
            this.appendValue(`${piSymbol}`);
        }
    }

    reciprocal() {
        let currentinput = this.screen.textContent
        if (currentinput == "0") {
            this.screen.textContent = "1/"
            return
        }
        this.screen.textContent = currentinput.concat("1/");
    };

    setupDropdown(btnId, menuId) {
        const dropdownBtn = document.getElementById(btnId);
        const dropdownMenu = document.getElementById(menuId);

        if (!dropdownBtn || !dropdownMenu) {
            console.error('Dropdown button or menu not found!');
            return;
        }

        dropdownBtn.addEventListener("click", (event) => {
            console.log("dropdown")
            event.stopPropagation();
            dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block"; // Toggle visibility
        });

        // Hide dropdown
        document.addEventListener("click", () => {
            dropdownMenu.style.display = "none";
        });

        // Prevent closing the dropdown when clicking inside the menu
        dropdownMenu.addEventListener("click", (event) => {
            event.stopPropagation();
        });
    }

    Femode() {
        const isFeMode = this.FEMode;
        this.FEMode = !isFeMode;
        this.FEButton.ariaLabel = this.FEMode ? "Scientific Notation Mode" : "Default Notation Mode";
        this.FEButton.value = this.FEMode ? "ex" : "f-e";
        this.FEButton.textContent = this.FEMode ? "E" : "F-E";

        this.updateDisplay();
    }

    updateDisplay() {
        const currentValue = parseFloat(this.screen.textContent);
        if (isNaN(currentValue)) {
            return;
        }

        if (this.FEMode) {
            this.screen.textContent = this.convertToEngineeringNotation(currentValue);
        } else {
            this.screen.textContent = this.convertToScientificNotation(currentValue);
        }
    }

    convertToEngineeringNotation(value) {
        const exponent = Math.floor(Math.log10(Math.abs(value)) / 3) * 3;
        const exponentvalue = value / Math.pow(10, exponent);
        return exponentvalue.toFixed(3) + " × 10^" + exponent;
    }

    convertToScientificNotation(value) {
        const exponent = Math.floor(Math.log10(Math.abs(value)));
        const exponentvalue = value / Math.pow(10, exponent);
        return exponentvalue.toFixed(3) + " × 10^" + exponent;
    }

    toggleSign() {
        const currentValue = parseFloat(this.screen.textContent);
        if (isNaN(currentValue)) {
            this.screen.textContent = 'Error';
        } else {
            this.screen.textContent = (currentValue * -1).toString();
        }
    };

    eulersFormula() {
        const x = parseFloat(this.screen.textContent);
        if (isNaN(x)) {
            this.screen.textContent = 'Error';
        } else {
            this.screen.textContent = Math.exp(x);
        }
    };

    toggleSecondPrimary(button) {
        this.isSecondPrimary = !this.isSecondPrimary;

        // Toggle the button text
        button.textContent = this.isSecondPrimary ? "Primary" : "2nd";

        // Define primary and secondary functions
        const trigFunctions = [
            { btn: this.sinBtn, primary: "sin(", secondary: "asin(" },
            { btn: this.cosBtn, primary: "cos(", secondary: "acos(" },
            { btn: this.tanBtn, primary: "tan(", secondary: "atan(" }
        ];

        // Update button text and event listeners
        trigFunctions.forEach(({ btn, primary, secondary }) => {
            if (btn) {
                const functionText = this.isSecondPrimary ? secondary : primary;

                // Update button text
                btn.textContent = functionText.replace("(", ""); // Display without parentheses

                // Remove all previous event listeners
                const newBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(newBtn, btn);

                // Set the new button reference
                if (btn.classList.contains("sin-btn")) this.sinBtn = newBtn;
                if (btn.classList.contains("cos-btn")) this.cosBtn = newBtn;
                if (btn.classList.contains("tan-btn")) this.tanBtn = newBtn;

                // Add new event listener
                newBtn.addEventListener("click", () => {
                    this.appendValue(functionText);
                });
            }
        });
    }
    trigonometry(func) {
        let inputText = this.screen.textContent.trim();

        // Extract numeric value
        let inputMatch = inputText.match(/-?\d+(\.\d+)?/);
        let inputValue = inputMatch ? parseFloat(inputMatch[0]) : NaN; // Extract number safely

        if (isNaN(inputValue)) {
            this.screen.textContent = "Error";
            return;
        }

        let result;

        switch (func) {
            case "asin":
                if (inputValue < -1 || inputValue > 1) {
                    this.screen.textContent = "Error"; // asin is only defined for -1 ≤ x ≤ 1
                    return;
                }
                result = Math.asin(inputValue);
                break;
            case "acos":
                if (inputValue < -1 || inputValue > 1) {
                    this.screen.textContent = "Error"; // acos is only defined for -1 ≤ x ≤ 1
                    return;
                }
                result = Math.acos(inputValue);
                break;
            case "atan":
                result = Math.atan(inputValue);
                break;
            case "sin":
                result = Math.sin(this.isDegreeMode ? inputValue * (Math.PI / 180) : inputValue);
                break;
            case "cos":
                result = Math.cos(this.isDegreeMode ? inputValue * (Math.PI / 180) : inputValue);
                break;
            case "tan":
                result = Math.tan(this.isDegreeMode ? inputValue * (Math.PI / 180) : inputValue);
                break;
            default:
                this.screen.textContent = "Error";
                return;
        }

        // Convert radians to degrees if DEG mode is active
        if (this.isDegreeMode && ["asin", "acos", "atan"].includes(func)) {
            result = result * (180 / Math.PI);
        }

        // Display the result with up to 6 decimal places
        this.screen.textContent = result.toFixed(6);
        saveHistory(`${func}(${inputValue}${this.isDegreeMode ? "°" : " rad"}) = ${result.toFixed(6)}`);
    }


    setDegMode() {
        this.isDegreeMode = !this.isDegreeMode;
        this.updateDegButton();
    }

    updateDegButton() {
        const degButton = document.getElementById("deg-btn");
        if (degButton) {
            degButton.innerText = this.isDegreeMode ? "DEG" : "RAD";
        }
        !this.isDegreeMode;
    }

    floor() {
        this.screen.textContent = "floor("
    }

    ceil() {
        this.screen.textContent = "ceil("
    }
}


