browser.runtime.onMessage.addListener((message) => {
    if (message.type === 'searchResults') {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = ''; // 既存の結果をクリア

        if (message.contexts.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'result-item';
            noResults.textContent = '検索結果が見つかりませんでした。';
            resultsDiv.appendChild(noResults);
            return;
        }

        message.contexts.forEach((context, index) => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.textContent = context;
            resultsDiv.appendChild(resultItem);
        });
    }
}); 