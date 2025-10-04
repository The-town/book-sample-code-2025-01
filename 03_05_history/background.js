async function searchHistory() {
  let searching = await browser.history.search(
    {text: "mozilla"}
  );

  for (const item of searching) {
    console.log(item.url, item.title);
  }  
}

async function getVisits() {
  let getting = await browser.history.getVisits(
    {url: "https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/history/getVisits"}
  );
  console.log(getting);
}

async function deleteRangeHistory() {
  let deletingRange = browser.history.deleteRange(
    { startTime: new Date("2025-04-25 00:00:00.000"), endTime: new Date("2025-04-25 20:00:00.000")}
  );
}


// searchHistory();
// getVisits();

deleteRangeHistory();
searchHistory();
