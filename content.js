(function enablePiP() {
    const video = document.querySelector("video");
    if (video && document.pictureInPictureElement !== video) {
        video.requestPictureInPicture().catch(console.error);
    }
})();
