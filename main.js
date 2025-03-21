// Importing  modules
import { Calculator } from './calculator.js'; // Calculator module
import { saveHistory, clearHistory, displayHistory, setupHistoryToggle } from './history.js';
import { handleKeyPress } from './keypressHandler.js';
import { handleMC, handleMR, handleMplusAndMinus, handleMS } from './memory.js'; // Memory functions

// Initialize the calculator
const calculator = new Calculator('screen');


// connect to calculator
calculator.initializeButtons = function (buttonClass) {
    const numberButtons = document.querySelectorAll(`${buttonClass}.num`);
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            this.appendValue(button.textContent.trim());
        });
    });

    // Arithmetic operations
    document.querySelector('.add-btn').addEventListener('click', () => this.add());
    document.querySelector('.subtract-btn').addEventListener('click', () => this.subtract());
    document.querySelector('.multiply-btn').addEventListener('click', () => this.multiply());
    document.querySelector('.divide-btn').addEventListener('click', () => this.divide());

    // Parenthesis
    document.querySelector('.open-paren-btn').addEventListener('click', () => this.addOpenParenthesis());
    document.querySelector('.close-paren-btn').addEventListener('click', () => this.addCloseParenthesis());

    // Core functions
    document.querySelector('#equals').addEventListener('click', () => this.result());
    document.querySelector('#backspace').addEventListener('click', () => this.backspace());
    document.querySelector('.clear-btn').addEventListener('click', () => this.clearDisplay());
    document.querySelector('.pi-btn').addEventListener('click', () => this.appendPi());

    // Advanced math functions
    document.querySelector('.modulus-btn').addEventListener('click', () => this.modulus());
    document.querySelector('.exponent-btn').addEventListener('click', () => this.exponent());
    document.querySelector('.factorial-btn').addEventListener('click', () => this.factorial());
    document.querySelector('.log-btn').addEventListener('click', () => this.log());
    document.querySelector('.eulars-btn').addEventListener('click', () => this.eulersFormula());
    document.querySelector('.logn-btn').addEventListener('click', () => this.ln());
    document.querySelector('.reciprocal-btn').addEventListener('click', () => this.reciprocal());
    document.querySelector('.abs-btn').addEventListener('click', () => this.absoluteValue());
    document.querySelector('.square-btn').addEventListener('click', () => this.square());
    document.querySelector('.sqrt-btn').addEventListener('click', () => this.sqrt());
    document.querySelector('.power-btn').addEventListener('click', () => this.power());
    document.querySelector('.ten-power-btn').addEventListener('click', () => this.tenPowerX());
    document.querySelector('.change-sign-btn').addEventListener('click', () => this.changeSign());
    document.getElementById('deg-btn').addEventListener('click', () => {
        if (typeof calculator !== 'undefined' && calculator.setDegMode) {
            calculator.setDegMode();
        }
    });

    document.querySelector('.fe-btn').addEventListener("click", function () {
        if (typeof calculator !== "undefined" && calculator.FEMode) {
            calculator.FEMode();
        }
    });

    // Trigonometric functions
    document.querySelector('.sin-btn').addEventListener('click', () => this.trigometry('sin'));
    document.querySelector('.cos-btn').addEventListener('click', () => this.trigometry('cos'));
    document.querySelector('.tan-btn').addEventListener('click', () => this.trigometry('tan'));
    document.querySelector('.floor-btn').addEventListener('click', () => this.floor());
    document.querySelector('.ceil-btn').addEventListener('click', () => this.ceil());

    // History buttons
     document.querySelector('.clear-history-btn').addEventListener('click', () => clearHistory());
   
    // Keyboard input
    document.addEventListener('keydown', handleKeyPress.bind(calculator));
};

// Initialize buttons for the calculator
calculator.initializeButtons('.btn');
setupHistoryToggle();
calculator.initializeMemoryFunctions(); 
