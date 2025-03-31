// keyboard-handler

export function handleKeyPress(event) {
    const key = event.key;

    switch (key) {
        case '+':
            this.add();
            break;
        case '-':
            this.subtract();
            break;
        case '*':
            this.multiply();
            break;
        case '/':
            this.divide();
            break;
        case 'Enter':
            this.result();
            break;
        case 'Backspace':
            this.backspace();
            break;
        case 'Escape':
        case 'c':
            this.clearDisplay();
            break;
        default:
            if (!isNaN(key)) {
                this.appendValue(key);
            }
            break;
    }
}
