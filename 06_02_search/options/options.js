async function saveOptions(e) {
  e.preventDefault();
  await browser.storage.sync.set({
    page_color: document.querySelector("#page_color").value
  });
}

async function restoreOptions() {
  let res = await browser.storage.sync.get('page_color');
  const pageColorInput = document.querySelector("#page_color");
  if (pageColorInput instanceof HTMLInputElement) {
    pageColorInput.value = res.page_color || '';
  }
  document.body.style.backgroundColor = res.page_color || '';
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
