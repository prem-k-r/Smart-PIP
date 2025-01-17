(function enablePiP() {
  const video = document.querySelector("video");
  if (video && document.pictureInPictureElement !== video) {
      video.requestPictureInPicture().catch(console.error);
  }
})();

chrome.storage.sync.get("resetPiPPosition", (data) => {
  if (data.resetPiPPosition) {
      // Reset PiP position and size when the toggle is enabled
      document.addEventListener("enterpictureinpicture", () => {
          const pipWindow = document.querySelector("video");
          if (pipWindow) {
              pipWindow.style.position = "absolute";
              pipWindow.style.top = "50px"; // Default top position
              pipWindow.style.left = "50px"; // Default left position
              pipWindow.style.width = "400px"; // Default width
              pipWindow.style.height = "225px"; // Default height
          }
      });
  }
});
