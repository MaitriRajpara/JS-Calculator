export function handleKeyPress(event) {
    const key = event.key;

    if (!isNaN(key)) {
        this.appendValue(key); // Append number
    } else if (key === '+') {
        this.add();
    } else if (key === '-') {
        this.subtract();
    } else if (key === '*') {
        this.multiply();
    } else if (key === '/') {
        this.divide();
    } else if (key === '.') {
        this.decimal();
    } else if (key === 'Enter') {
        this.result(); // Calculate result
    } else if (key === 'Backspace') {
        this.backspace(); // Remove last entry
    } else if (key === 'Escape') {
        this.clearDisplay(); // Clear the display
    }
}
