// script.js
function logMessage(message) {
    browser.runtime.sendMessage({
        type: 'contentLog',
        log: message
    });
}

function changeH1Color() {
  // h1要素を取得
  logMessage("changeH1");
  const h1Elements = document.getElementsByTagName('h1');

  // h1要素のスタイルを赤色に変更
  for (let i = 0; i < h1Elements.length; i++) {
   h1Elements[i].style.color = 'red';
  }
 }

 // DOMContentLoaded イベントで changeH1Color 関数を実行
changeH1Color();


