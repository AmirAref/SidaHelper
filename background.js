const sida = 'https://sida.medu.ir'

chrome.action.onClicked.addListener(
    async (tab) => {
        // save the state
        if (tab.url.startsWith(sida)) {

            // excute the script
            chrome.scripting.executeScript({
                target: { tabId: tab.id, allFrames: true },
                files: ['scripts/script.js'],
            }).then(
                () => console.log("Script Injected!")
            );


        }
    }
);

