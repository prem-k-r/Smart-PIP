document.addEventListener("DOMContentLoaded", () => {
  const exitToggle = document.getElementById("exit-pip-toggle");
  const exitLabel = document.getElementById("exit-pip-toggle-label");
  const resetToggle = document.getElementById("reset-pip-toggle");
  const resetLabel = document.getElementById("reset-pip-toggle-label");

  // Retrieve the current state of both toggles from chrome.storage
  chrome.storage.sync.get(["exitPiPEnabled", "resetPiPPosition"], (data) => {
      const exitEnabled = data.exitPiPEnabled ?? true;
      const resetEnabled = data.resetPiPPosition ?? false;

      // Set toggles and labels based on stored values
      exitToggle.checked = exitEnabled;
      exitLabel.textContent = exitEnabled ? "On" : "Off";
      
      resetToggle.checked = resetEnabled;
      resetLabel.textContent = resetEnabled ? "On" : "Off";
  });

  // Handle changes to the "Exit PiP" toggle
  exitToggle.addEventListener("change", () => {
      const isExitEnabled = exitToggle.checked;
      chrome.storage.sync.set({ exitPiPEnabled: isExitEnabled });
      exitLabel.textContent = isExitEnabled ? "On" : "Off";
  });

  // Handle changes to the "Reset PiP Position" toggle
  resetToggle.addEventListener("change", () => {
      const isResetEnabled = resetToggle.checked;
      chrome.storage.sync.set({ resetPiPPosition: isResetEnabled });
      resetLabel.textContent = isResetEnabled ? "On" : "Off";
  });
});
