let pattern = "https://www.example.com/*";

function redirect(requestDetails) {
  console.log(`block: ${requestDetails.url}`);
  return {
    cancel: true,
  };
}


browser.webRequest.onBeforeRequest.addListener(
  redirect,
  { urls: [pattern]},
  ["blocking"],
);
