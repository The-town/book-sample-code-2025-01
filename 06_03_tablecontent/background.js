// 拡張機能のアイコンがクリックされたときの処理
browser.action.onClicked.addListener((tab) => {
    // content.jsを実行して目次を表示
    browser.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    });
}); 