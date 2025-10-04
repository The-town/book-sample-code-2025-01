'use strict';

// ボタンを作成
function createFloatingButton() {
    // 既存のボタンがある場合は削除
    const existingButton = document.getElementById('firefox-extension-button');
    if (existingButton) {
        existingButton.remove();
    }
    
    // ボタン要素を作成
    const button = document.createElement('button');
    button.id = 'firefox-extension-button';
    button.className = 'firefox-floating-button';
    button.textContent = '+';
    button.title = "button";
    
    // ボタンのクリックイベント
    button.addEventListener('click', function() {
        alert('ボタンが押されました！');
    });
    
    // ボタンをページに追加
    document.body.appendChild(button);
}

// ページ読み込み完了後にボタンを作成
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createFloatingButton);
} else {
    createFloatingButton();
}