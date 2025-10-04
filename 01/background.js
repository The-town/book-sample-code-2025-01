browser.runtime.onMessage.addListener(getMessage);

function getMessage(message) {
    console.log(message);
}