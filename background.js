chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tabs = await chrome.tabs.query({});
  for (const tab of tabs) {
    if (tab.url && tab.url.includes("youtube.com/watch")) {
      try {
        if (tab.id !== activeInfo.tabId) {
          // Enter PiP mode when switching tabs
          await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"]
          });
        } else {
          // Exit PiP mode when returning to YouTube (if enabled)
          chrome.storage.sync.get("exitPiPEnabled", (data) => {
            if (data.exitPiPEnabled) {
              chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => {
                  if (document.pictureInPictureElement) {
                    document.exitPictureInPicture().catch(console.error);
                  }
                }
              });
            }
          });
        }
      } catch (error) {
        console.error("Error executing script:", error);
      }
    }
  }
});
