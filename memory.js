// memory-clear-btn
export function handleMC() {
    localStorage.removeItem('calculationOutput');
    console.log("Memory Cleared");
}

// memory-recall btn
export function handleMR(screen) {
    let inputvalue = screen.textContent;

    if (inputvalue === '0' || inputvalue === '') {
        inputvalue = '';
    }

    const memoryValue = localStorage.getItem('calculationOutput');
    if (memoryValue) {
        screen.textContent = inputvalue + memoryValue;
    } else {
        console.log("No memory value stored.");
    }
}

// memory-store-btn
export function handleMS(screen, getValueCallback) {
    const valueToStore = getValueCallback(screen);
    if (valueToStore !== null && valueToStore !== undefined) {
        localStorage.setItem('calculationOutput', valueToStore);
        console.log(`Memory Stored: ${valueToStore}`);
    } else {
        console.error("Error storing memory: Invalid value.");
    }
}

// memory-add/minus-btn
export function handleMplusAndMinus(ref, screen, getValueCallback) {
    const memoryValue = parseFloat(localStorage.getItem('calculationOutput') || "0");
    const currentValue = parseFloat(getValueCallback(screen));

    if (isNaN(memoryValue) || isNaN(currentValue)) {
    }
}
