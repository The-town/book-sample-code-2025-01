async function setStorage() {
  await browser.storage.local.set({"test": "testvalue"});
}

async function getStorage() {
  const storageValue = await browser.storage.local.get();
  console.log(storageValue);
}

setStorage();
getStorage();
