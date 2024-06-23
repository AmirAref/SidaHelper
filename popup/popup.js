async function getCurrentTabId() {
  const queryOptions = {
    active: true,
    currentWindow: true,
  };
  const [tab] = await browser.tabs.query(queryOptions);
  return await tab.id;
}

async function run_helper() {
  browser.scripting.executeScript({
    target: { tabId: await getCurrentTabId() },
    files: ["../scripts/script.js"],
  });
}

document.getElementById("helper-click").addEventListener("click", run_helper);

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("link-1").addEventListener("click", () => {
    window.open("https://my.medu.ir", "_blank");
  });
  document.getElementById("link-2").addEventListener("click", () => {
    window.open("https://sida.medu.ir", "_blank");
  });
});
