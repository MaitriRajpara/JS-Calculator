export function saveHistory(historyEntry) {
    try {
        let history = JSON.parse(localStorage.getItem('calculationHistory')) || [];
        history.push(historyEntry);
        localStorage.setItem('calculationHistory', JSON.stringify(history));
    } catch (error) {
        console.error("Failed to save history:", error);
    }
}

export function clearHistory() {
    try {
        localStorage.removeItem('calculationHistory');
        const historyList = document.getElementById('historyList');
        if (historyList) {
            historyList.innerHTML = '';
        }
    } catch (error) {
        console.error("Failed to clear history:", error);
    }
}

export function displayHistory() {
    try {
        const history = JSON.parse(localStorage.getItem('calculationHistory')) || [];
        //display hitory
        const historyList = document.getElementById('historyList');
        const historyContainer = document.getElementById('historyContainer');
        const toggleHistoryButton = document.getElementById('history-btn');

        if (!historyList || !historyContainer) {
            console.error("History list or container element not found.");
            return;
        }
        //visiblity of container
        if (historyContainer.style.display === 'block') {
            historyContainer.style.display = 'none';
            toggleHistoryButton.innerHTML = '<span><i class= " fa fa-history"</span> ';
        } else {
            historyContainer.style.display = 'block';
            toggleHistoryButton.innerHTML = '<span><i class= "fa fa-reply"></span>';
            historyList.innerHTML = '';

            const ol = document.createElement('ol');
            history.forEach((item, index) => {
                const li = document.createElement('li');
                const div = document.createElement('div');
                div.classList.add('history-item');
                div.textContent = `${index + 1}. ${item}`;
                li.appendChild(div);
                ol.appendChild(li);
            });

            historyList.appendChild(ol);

        }
    } catch (error) {
        console.error("Failed to display history:", error);
    }
}

// show/hide
export function setupHistoryToggle() {
    const toggleHistoryButton = document.getElementById('history-btn');
    if (toggleHistoryButton) {
        toggleHistoryButton.addEventListener('click', displayHistory);
    }
}