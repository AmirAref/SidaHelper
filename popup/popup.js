async function getCurrentTab() {
  const queryOptions = {
    active: true,
    currentWindow: true,
  };
  const [tab] = await browser.tabs.query(queryOptions);
  return await tab;
}

function showError(message) {
  const errorMessageDiv = document.getElementById("error-message");
  errorMessageDiv.textContent = `Error: ${message}`;
  errorMessageDiv.style.display = "block";
}

function hideError() {
  const errorMessageDiv = document.getElementById("error-message");
  errorMessageDiv.style.display = "none";
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
  } else {
    showError("Run the helper only on sida.medu.ir wesbite !");
  }
}

document.getElementById("helper-click").addEventListener("click", run_helper);
