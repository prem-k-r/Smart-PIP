document.addEventListener("DOMContentLoaded", () => {
  const mainToggle = document.getElementById("main-toggle");
  const autoPiPToggle = document.getElementById("auto-pip-enable-toggle");
  const closePiPToggle = document.getElementById("close-pip-return-toggle");
  const mainStatusLabel = document.getElementById("main-status");

  if (mainToggle) {
    chrome.storage.sync.get("extensionEnabled", (data) => {
      const isExtensionEnabled = data.extensionEnabled ?? false;
      mainToggle.classList.toggle("disabled", !isExtensionEnabled);
      if (mainStatusLabel) {
        mainStatusLabel.textContent = isExtensionEnabled ? "Extension: On" : "Extension: Off";
      }
    });

    mainToggle.addEventListener("click", () => {
      const isEnabled = !mainToggle.classList.contains("disabled");
      chrome.storage.sync.set({ extensionEnabled: isEnabled });
      mainToggle.classList.toggle("disabled", isEnabled);
      if (mainStatusLabel) {
        mainStatusLabel.textContent = isEnabled ? "Extension: On" : "Extension: Off";
      }
    });
  }

  if (autoPiPToggle) {
    chrome.storage.sync.get("autoPiPEnabled", (data) => {
      autoPiPToggle.classList.toggle("disabled", !data.autoPiPEnabled);
    });

    autoPiPToggle.addEventListener("click", () => {
      const isEnabled = !autoPiPToggle.classList.contains("disabled");
      chrome.storage.sync.set({ autoPiPEnabled: isEnabled });
      autoPiPToggle.classList.toggle("disabled", isEnabled);
    });
  }

  if (closePiPToggle) {
    chrome.storage.sync.get("closePiPEnabled", (data) => {
      closePiPToggle.classList.toggle("disabled", !data.closePiPEnabled);
    });

    closePiPToggle.addEventListener("click", () => {
      const isEnabled = !closePiPToggle.classList.contains("disabled");
      chrome.storage.sync.set({ closePiPEnabled: isEnabled });
      closePiPToggle.classList.toggle("disabled", isEnabled);
    });
  }
});
