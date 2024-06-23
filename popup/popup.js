async function getCurrentTab() {
  const queryOptions = {
    active: true,
    currentWindow: true,
  };
  const [tab] = await browser.tabs.query(queryOptions);
  return await tab;
}

async function run_helper() {
  const sida = "https://sida.medu.ir/#/scoreClassTeacher";
  const tab = await getCurrentTab();

  // save the state
  if (tab.url.startsWith(sida)) {
    // excute the script
    browser.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["../scripts/script.js"],
    });
    console.log("Script Injected!");
  }
}

document.getElementById("helper-click").addEventListener("click", run_helper);
