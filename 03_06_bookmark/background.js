function onGot(bookmarkItems) {
  for (item of bookmarkItems) {
    console.log(item.title);
  }
}

browser.bookmarks.search({ query: "tkinter" }, onGot);
