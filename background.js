const sida = 'https://sida.medu.ir'

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF"
    });
});


chrome.action.onClicked.addListener(
    async (tab) => {
        // save the state
        if (tab.url.startsWith(sida)) {
            // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
            const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
            // Next state will always be the opposite
            const nextState = prevState === 'ON' ? 'OFF' : 'ON'

            // Set the action badge to the next state
            await chrome.action.setBadgeText({
                tabId: tab.id,
                text: nextState,
            });

            // excute the script
            // chrome.scripting.executeScript({
            //     target: { tabId: tab.id, allFrames: true },
            //     files: ['scripts/script.js'],
            // }).then(
            //     () => console.log("Script Injected!")
            // );

            if (nextState === "ON") {
                // Insert the CSS file when the user turns the extension on
                await chrome.scripting.insertCSS({
                    files: ['dark.css'],
                    target: { tabId: tab.id },
                }).then(
                    () => console.log("Style Sheet Applied!")
                );
            }
            else if (nextState === "OFF") {
                // Remove the CSS file when the user turns the extension off
                await chrome.scripting.removeCSS({
                    files: ['dark.css'],
                    target: { tabId: tab.id },
                }).then(
                    () => console.log("Style Sheet Removed!")
                );
            }

        }


    }
);

