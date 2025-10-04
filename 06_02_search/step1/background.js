async function getContexts(matches) {
  let activeTabArray = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  let tabId = activeTabArray[0].id;

  let contexts = await browser.tabs.sendMessage(tabId, {
    ranges: matches.rangeData,
  });

  console.log(contexts);
}

browser.action.onClicked.addListener(() => {
  browser.find.find(
    "example", { includeRangeData: true }
  ).then(getContexts);
});