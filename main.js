import { Operation } from './operations.js';

document.addEventListener('DOMContentLoaded', function () {
    // Initialize the calculator with the display screen
    const calculator = new Operation('screen');

    // Number buttons
    document.querySelectorAll('.num').forEach(button => {
        button.addEventListener('click', () => calculator.appendValue(button.textContent));
    });

    // Basic arithmetic operations
    document.querySelector('.add-btn').addEventListener('click', () => calculator.add());
    document.querySelector('.subtract-btn').addEventListener('click', () => calculator.subtract());
    document.querySelector('.multiply-btn').addEventListener('click', () => calculator.multiply());
    document.querySelector('.divide-btn').addEventListener('click', () => calculator.divide());
    document.querySelector('.modulus-btn').addEventListener('click', () => calculator.modulus());

    // Exponent and power functions
    document.querySelector('.exponent-btn').addEventListener('click', () => calculator.exponent());
    document.querySelector('.power-btn').addEventListener('click', () => calculator.power());
    document.querySelector('.factorial-btn').addEventListener('click', () => calculator.factorial());

    // Logarithmic functions
    document.querySelector('.log-btn').addEventListener('click', () => calculator.log());
    document.querySelector('.logn-btn').addEventListener('click', () => calculator.ln());

    // Reciprocal and absolute value functions
    document.querySelector('.reciprocal-btn').addEventListener('click', () => calculator.reciprocal());
    document.querySelector('.abs-btn').addEventListener('click', () => calculator.absoluteValue());

    // Square root and square functions
    document.querySelector('.sqrt-btn').addEventListener('click', () => calculator.sqrt());
    document.querySelector('.square-btn').addEventListener('click', () => calculator.square());

    // Power of ten and sign change functions
    document.querySelector('.ten-power-btn').addEventListener('click', () => calculator.tenPowerX());
    document.querySelector('.change-sign-btn').addEventListener('click', () => calculator.changeSign());

    // Display control
    document.querySelector('.clear-btn').addEventListener('click', () => calculator.clearDisplay());
    document.querySelector('#equals').addEventListener('click', () => calculator.result());
    document.querySelector('#backspace').addEventListener('click', () => calculator.backspace());

    // Constants
    document.querySelector('.pi-btn').addEventListener('click', () => calculator.appendPi());
    document.querySelector('.eulars-btn').addEventListener('click', () => calculator.eulersFormula());

    // Degree/Radian mode toggle
    document.querySelector('#deg-btn').addEventListener('click', () => calculator.setDegMode());

    // Scientific notation toggle
    document.querySelector('.fe-btn').addEventListener('click', () => calculator.FEMode());

    // Floor and ceiling functions
    document.querySelector('.floor-btn').addEventListener('click', () => calculator.floor());
    document.querySelector('.ceil-btn').addEventListener('click', () => calculator.ceil());

    // Trigonometry functions
    document.querySelector('.sin-btn').addEventListener('click', () => calculator.trigometry('sin'));
    document.querySelector('.cos-btn').addEventListener('click', () => calculator.trigometry('cos'));
    document.querySelector('.tan-btn').addEventListener('click', () => calculator.trigometry('tan'));

    // History functions
    document.querySelector('#toggleHistoryButton').addEventListener('click', () => {
        document.querySelector('#historyContainer').classList.toggle('visible');
    });
    document.querySelector('.clear-history-btn').addEventListener('click', () => calculator.clearHistory());

    // Memory functions
    document.querySelector('.mc-btn').addEventListener('click', () => calculator.memoryClear());
    document.querySelector('.mr-btn').addEventListener('click', () => calculator.memoryRecall());
    document.querySelector('.ms-btn').addEventListener('click', () => calculator.memoryStore());
    document.querySelector('.mplus-btn').addEventListener('click', () => calculator.memoryAdd());
    document.querySelector('.mminus-btn').addEventListener('click', () => calculator.memorySubtract());
});
