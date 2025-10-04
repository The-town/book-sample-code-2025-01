browser.menus.create(
  {
    id: "sample",
    title: "sample menu",
    contexts: ["page"],
  }
);

function outputConsole(data) {
  console.log(data);
}

browser.menus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sample") {
    outputConsole("output");
  }
});
