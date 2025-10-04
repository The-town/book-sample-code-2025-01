// 検索ボタンのクリックイベントを設定
document.getElementById('searchButton').addEventListener('click', performSearch);
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// 検索を実行する関数
function performSearch() {
    const searchText = document.getElementById('searchInput').value;
    if (searchText.trim() === '') return;

    // background.jsに検索を依頼
    browser.runtime.sendMessage({
        type: 'performSearch',
        searchText: searchText
    });
}

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
            resultItem.dataset.index = message.indices[index]; // 実際の検索結果のインデックスを使用
            resultItem.style.cursor = 'pointer'; // カーソルをポインターに変更
            resultItem.addEventListener('click', () => {
                browser.runtime.sendMessage({
                    type: 'focusResult',
                    index: message.indices[index] // 実際の検索結果のインデックスを使用
                });
            });
            resultsDiv.appendChild(resultItem);
        });
    }
}); 