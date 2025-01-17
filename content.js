(function enablePiP() {
  const video = document.querySelector("video");
  if (video && document.pictureInPictureElement !== video) {
    video.requestPictureInPicture().catch(console.error);
  }
})();

// Listen for PiP exit event
document.addEventListener("exitpictureinpicture", () => {
  // Reset position when PiP window is closed
  chrome.storage.sync.set({ pipPositionReset: true });
});

// Check if reset toggle is enabled and manage PiP position accordingly
chrome.storage.sync.get("resetPiPPosition", (data) => {
  if (data.resetPiPPosition) {
    document.addEventListener("enterpictureinpicture", () => {
      const pipWindow = document.querySelector("video");
      if (pipWindow) {
        // Set PiP to default position at the bottom-right corner
        pipWindow.style.position = "absolute";
        pipWindow.style.bottom = "20px";  // Distance from bottom
        pipWindow.style.right = "20px";   // Distance from right
        pipWindow.style.width = "400px";  // Default width
        pipWindow.style.height = "225px"; // Default height
      }
    });
  }
});
