browser.menus.create(
    {
      id: "sample",
      title: "sample menu",
      contexts: ["page"],
    }
  );

function createNotification() {
    browser.notifications.create({
        type: "basic",
        iconUrl: browser.runtime.getURL("icons/icon-48.png"),
        title: "Clicked!",
        message: "クリックしました",
    });
}

browser.menus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "sample") {
        createNotification();
    }
});
