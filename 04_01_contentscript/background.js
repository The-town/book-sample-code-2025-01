const aScript = {
  id: "a-script",
  js: ["script.js"],
  matches: ["https://www.example.com/*"],
};

async function loadContentScript() {
  console.log("loading");
  try {
    let result = await browser.scripting.registerContentScripts([aScript]);
    console.log(result);
  } catch (err) {
    console.error(`failed to register content scripts: ${err}`);
  }
}

loadContentScript();



browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  try {
      switch (message.type) {
          case 'contentLog':
              console.log(`[Content Script] ${message.log}`);
              sendResponse(true);
              break;
      }
  } catch (error) {
    console.error('エラーが発生しました:', error);
    sendResponse(null);
}
}); 
