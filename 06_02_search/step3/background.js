async function getContexts(matches) {
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

  let contexts = await browser.tabs.sendMessage(tabId, {
    ranges: matches.rangeData,
  });

  browser.runtime.sendMessage({
    type: 'searchResults',
    contexts: contexts,
    indices: matches.rangeData.map((_, index) => index) // 検索結果のインデックスを送信
  });
}

browser.action.onClicked.addListener(() => {
  browser.find.find(
    "example", { includeRangeData: true }
  ).then(getContexts);
});

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'performSearch') {
    browser.find.find(
      message.searchText, { includeRangeData: true, includeRectData: true }
    ).then(getContexts);
  } else if (message.type === 'focusResult') {
    browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
      browser.tabs.sendMessage(tabs[0].id, {
        type: 'focusResult',
        index: message.index
      });
    });
  }
});
