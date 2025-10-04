function sendError() {
    browser.runtime.sendMessage("send content error");
}

sendError();