chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tabs = await chrome.tabs.query({});
  for (const tab of tabs) {
    if (tab.url && tab.url.includes("youtube.com/watch")) {
      try {
        // Get the settings from storage
        chrome.storage.sync.get(["autoPiPEnabled", "closePiPOnReturnEnabled"], (data) => {
          const autoPiPEnabled = data.autoPiPEnabled ?? false;
          const closePiPOnReturnEnabled = data.closePiPOnReturnEnabled ?? false;

          if (tab.id !== activeInfo.tabId) {
            // Automatically enable PiP when switching to a YouTube tab if enabled
            if (autoPiPEnabled) {
              chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["content.js"]
              });
            }
          } else {
            // Close PiP when returning to YouTube if enabled
            if (closePiPOnReturnEnabled) {
              chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => {
                  if (document.pictureInPictureElement) {
                    document.exitPictureInPicture().catch(console.error);
                  }
                }
              });
            }
          }
        });
      } catch (error) {
        console.error("Error executing script:", error);
      }
    }
  }
});
