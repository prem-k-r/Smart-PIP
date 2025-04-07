chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tabs = await chrome.tabs.query({});
    for (const tab of tabs) {
        if (tab.url && tab.url.includes("youtube.com/watch")) {
            try {
                chrome.storage.sync.get(["extensionEnabled", "autoPiPEnabled", "closePiPOnReturnEnabled"], (data) => {
                    const extensionEnabled = data.extensionEnabled ?? true;
                    const autoPiPEnabled = data.autoPiPEnabled ?? false;
                    const closePiPOnReturnEnabled = data.closePiPOnReturnEnabled ?? false;
                    const tabBool = (tab.id === activeInfo.tabId);

                    // If the extension is disabled, do nothing
                    if (!extensionEnabled) return;

                    // If the extension is enabled, execute the script
                    if (autoPiPEnabled || closePiPOnReturnEnabled) {
                        chrome.scripting.executeScript({
                            target: { tabId: tab.id },
                            func: (autoPiPEnabled, closePiPOnReturnEnabled, tabBool) => {
                                if (autoPiPEnabled && !tabBool) {
                                    var PipEnablerEvent;
                                    if (!PipEnablerEvent) {
                                        PipEnablerEvent = () => {
                                            // window.focus();
                                            const video = document.querySelector("video");
                                            if ((video) && (document.pictureInPictureElement !== video) && (!video.paused)) {
                                                video.requestPictureInPicture().catch(console.error);
                                            }
                                        }
                                        window.onblur = PipEnablerEvent;
                                    }
                                    PipEnablerEvent();
                                }
                                if (closePiPOnReturnEnabled && tabBool) {
                                    var PipDisablerEvent;
                                    if (!PipDisablerEvent) {
                                        PipDisablerEvent = () => {
                                            window.focus();
                                            if (document.pictureInPictureElement) {
                                                document.exitPictureInPicture().catch(console.error);
                                            }
                                        }
                                        window.onfocus = PipDisablerEvent;
                                    }
                                    PipDisablerEvent();
                                }
                            },
                            args: [autoPiPEnabled, closePiPOnReturnEnabled, tabBool]
                        });
                    }
                });
            } catch (error) {
                console.error("Error executing script:", error);
            }
        }
    }
});
