export function handleMC() {
    try {
        localStorage.removeItem('calculationOutput');
        console.log("Memory Cleared");
    } catch (error) {
        console.error("Error clearing memory:", error);
    }
}

// Handle Memory Recall (MR)
export function handleMR(screen) {
    try {
        const memoryValue = localStorage.getItem('calculationOutput');
        console.log(memoryValue);

        if (memoryValue) {
            screen.textContent += memoryValue;
        } else {
            console.log("No memory value stored.");
        }
    } catch (error) {
        console.error("Error recalling memory:", error);
    }
}

// Handle Memory Store (MS)
export function handleMS(screen, getValueCallback) {
    try {
        const valueToStore = getValueCallback(screen);
        localStorage.setItem('calculationOutput', valueToStore);
        console.log(`Memory Stored: ${valueToStore}`);
    } catch (error) {
        console.error("Error storing memory:", error);
    }
}

// Handle Memory Add (M+) and Subtract (M-)
export function handleMplusAndMinus(ref, screen, getValueCallback) {
    try {
        const memoryValue = parseFloat(localStorage.getItem('calculationOutput') || "0");
        const currentValue = parseFloat(getValueCallback(screen));
        let newValue;

        if (ref.className.includes('plus')) {
            newValue = memoryValue + currentValue;
            console.log(`Memory Addition: ${memoryValue} + ${currentValue}`);
        } else if (ref.className.includes('minus')) {
            newValue = memoryValue - currentValue;
            console.log(`Memory Subtraction: ${memoryValue} - ${currentValue}`);
        } else {
            throw new Error("Invalid memory operation.");
        }

        localStorage.setItem('calculationOutput', newValue.toString());
        console.log(`New Memory Value: ${newValue}`);
    } catch (error) {
        console.error("Error performing memory operation:", error);
    }
}

