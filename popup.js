document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("exit-pip-toggle");
    const toggleLabel = document.getElementById("toggle-label");
  
    // Set default state to enabled (checked)
    chrome.storage.sync.get("exitPiPEnabled", (data) => {
      const isEnabled = data.exitPiPEnabled ?? true; // Default to true if undefined
      toggle.checked = isEnabled;
      toggleLabel.textContent = isEnabled ? "On" : "Off";
    });
  
    // Handle toggle change
    toggle.addEventListener("change", () => {
      const isEnabled = toggle.checked;
      chrome.storage.sync.set({ exitPiPEnabled: isEnabled });
      toggleLabel.textContent = isEnabled ? "On" : "Off";
    });
  });
  