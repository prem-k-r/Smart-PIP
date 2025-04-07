document.addEventListener("DOMContentLoaded", () => {
    const mainToggle = document.getElementById("main-toggle");
    const autoPiPToggle = document.getElementById("auto-pip-enable-toggle");
    const closePiPReturnToggle = document.getElementById("close-pip-return-toggle");

    // Retrieve the current states of all settings from chrome.storage
    chrome.storage.sync.get(["extensionEnabled", "autoPiPEnabled", "closePiPOnReturnEnabled"], (data) => {
        // Set the states based on saved preferences
        const extensionEnabled = data.extensionEnabled ?? true; // Default to enabled if undefined
        const autoPiPEnabled = data.autoPiPEnabled ?? false;
        const closePiPOnReturnEnabled = data.closePiPOnReturnEnabled ?? false;

        // Update the main toggle and other toggle buttons' state
        mainToggle.checked = extensionEnabled;
        autoPiPToggle.checked = autoPiPEnabled;
        closePiPReturnToggle.checked = closePiPOnReturnEnabled;

        // Enable or disable the other toggles based on the main toggle
        if (!extensionEnabled) {
            autoPiPToggle.disabled = true;
            closePiPReturnToggle.disabled = true;
            autoPiPToggle.parentElement.classList.add("disabled");
            closePiPReturnToggle.parentElement.classList.add("disabled");
        }
    });

    // Handle main toggle change (enable/disable extension)
    mainToggle.addEventListener("change", () => {
        const isEnabled = mainToggle.checked;
        chrome.storage.sync.set({ extensionEnabled: isEnabled });

        // Enable or disable the other toggles based on the main toggle
        if (isEnabled) {
            autoPiPToggle.disabled = false;
            closePiPReturnToggle.disabled = false;
            autoPiPToggle.parentElement.classList.remove("disabled");
            closePiPReturnToggle.parentElement.classList.remove("disabled");
        } else {
            autoPiPToggle.disabled = true;
            closePiPReturnToggle.disabled = true;
            autoPiPToggle.parentElement.classList.add("disabled");
            closePiPReturnToggle.parentElement.classList.add("disabled");
        }
    });

    // Handle auto PiP toggle change
    autoPiPToggle.addEventListener("change", () => {
        const isEnabled = autoPiPToggle.checked;
        chrome.storage.sync.set({ autoPiPEnabled: isEnabled });
    });

    // Handle close PiP on return toggle change
    closePiPReturnToggle.addEventListener("change", () => {
        const isEnabled = closePiPReturnToggle.checked;
        chrome.storage.sync.set({ closePiPOnReturnEnabled: isEnabled });
    });
});
