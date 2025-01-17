chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const tabs = await chrome.tabs.query({});
    for (const tab of tabs) {
      if (tab.url && tab.url.includes("youtube.com/watch")) {
        chrome.storage.sync.get(
          ["extensionEnabled", "autoPiPEnabled", "closePiPOnReturnEnabled"],
          (data) => {
            const extensionEnabled = data.extensionEnabled ?? true;
            const autoPiPEnabled = data.autoPiPEnabled ?? false;
            const closePiPOnReturnEnabled = data.closePiPOnReturnEnabled ?? false;

            if (!extensionEnabled) return;

            if (tab.id !== activeInfo.tabId && autoPiPEnabled) {
              chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["content.js"]
              });
            } else if (closePiPOnReturnEnabled) {
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
        );
      }
    }
  } catch (error) {
    console.error("Error handling tab activation:", error);
  }
});
