// background.js

async function getContexts(matches) {
  // get the active tab ID
  let activeTabArray = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  let tabId = activeTabArray[0].id;

  try {
    await browser.scripting.executeScript({
      target: {
        tabId: tabId,
        allFrames: true,
      },
      files: ["content.js"],
    });
  } catch (err) {
    console.error(`failed to execute script: ${err}`);
  }

  // ask the content script to get the contexts for us
  let contexts = await browser.tabs.sendMessage(tabId, {
    ranges: matches.rangeData,
  });

  // サイドバーに検索結果を送信
  browser.runtime.sendMessage({
    type: 'searchResults',
    contexts: contexts,
    indices: matches.rangeData.map((_, index) => index) // 検索結果のインデックスを送信
  });
}

// サイドバーからの検索リクエストを処理
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'performSearch') {
    browser.find.find(
      message.searchText, { includeRangeData: true, includeRectData: true }
    ).then(getContexts);
  } else if (message.type === 'focusResult') {
    // アクティブなタブを取得
    browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
      // コンテンツスクリプトにフォーカスを依頼
      browser.tabs.sendMessage(tabs[0].id, {
        type: 'focusResult',
        index: message.index
      });
    });
  }
});
