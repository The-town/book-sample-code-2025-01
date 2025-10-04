browser.menus.create(
    {
      id: "sample",
      title: "sample menu",
      contexts: ["page"],
    }
  );

async function clipboardWrite(data) {
    await navigator.clipboard.writeText(data);
    console.log("コピーしました：", await navigator.clipboard.readText());
}

browser.menus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "sample") {
        clipboardWrite("hogehoge");
    }
});