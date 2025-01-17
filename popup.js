document.addEventListener("DOMContentLoaded", () => {
    const mainToggle = document.getElementById("main-toggle");
    const autoPiPToggle = document.getElementById("auto-pip-enable-toggle");
    const closePiPToggle = document.getElementById("close-pip-return-toggle");
    
    const mainStatusLabel = document.getElementById("main-status");
  
    // Set default state for main toggle
    chrome.storage.sync.get("extensionEnabled", (data) => {
      const isExtensionEnabled = data.extensionEnabled ?? false;
      mainToggle.classList.toggle("disabled", !isExtensionEnabled);
      mainStatusLabel.textContent = isExtensionEnabled ? "Extension: On" : "Extension: Off";
    });
  
    // Toggle main extension
    mainToggle.addEventListener("click", () => {
      const isEnabled = !mainToggle.classList.contains("disabled");
      chrome.storage.sync.set({ extensionEnabled: isEnabled });
      mainToggle.classList.toggle("disabled", isEnabled);
      mainStatusLabel.textContent = isEnabled ? "Extension: On" : "Extension: Off";
    });
  
    // Set default state for auto PiP and close PiP on return
    chrome.storage.sync.get(["autoPiPEnabled", "closePiPEnabled"], (data) => {
      autoPiPToggle.classList.toggle("disabled", !data.autoPiPEnabled);
      closePiPToggle.classList.toggle("disabled", !data.closePiPEnabled);
    });
  
    // Toggle Auto PiP
    autoPiPToggle.addEventListener("click", () => {
      const isEnabled = !autoPiPToggle.classList.contains("disabled");
      chrome.storage.sync.set({ autoPiPEnabled: isEnabled });
      autoPiPToggle.classList.toggle("disabled", isEnabled);
    });
  
    // Toggle Close PiP on return
    closePiPToggle.addEventListener("click", () => {
      const isEnabled = !closePiPToggle.classList.contains("disabled");
      chrome.storage.sync.set({ closePiPEnabled: isEnabled });
      closePiPToggle.classList.toggle("disabled", isEnabled);
    });
  });
  