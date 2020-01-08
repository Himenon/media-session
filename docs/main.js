const sourceMediaUrl =
  "https://test-streams.mux.dev/x36xhzz/url_0/193039199_mp4_h264_aac_hd_7.m3u8";

const play = video => {
  const promise = video.play();
  promise
    .then(() => {
      console.log("play video");
    })
    .catch(error => {
      console.error("click play button");
    });
};

const setupVideoElement = () => {
  const video = document.getElementById("video");
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(sourceMediaUrl);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function() {
      play(video);
    });
  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = sourceMediaUrl;
    video.addEventListener("loadedmetadata", function() {
      play(video);
    });
  }
  return video;
};

const run = () => {
  const video = setupVideoElement();
  document.getElementById("controller_play").onclick = () => {
    video.play();
  };
  if ("mediaSession" in navigator) {
    console.log("setup media session");
    navigator.mediaSession.metadata = new MediaMetadata({
      title: "sample title",
      artist: "sample artist",
      album: "",
      artwork: [{ src: "artwork.png", sizes: "320x180" }]
    });
    navigator.mediaSession.setActionHandler("play", () => {
      console.log("play");
      video.play();
    });
    navigator.mediaSession.setActionHandler("pause", () => {
      video.pause();
    });
    navigator.mediaSession.setActionHandler("seekbackward", () => {
      console.log("seekbackward");
    });
    navigator.mediaSession.setActionHandler("seekforward", () => {
      console.log("seekforward");
    });
    navigator.mediaSession.setActionHandler("previoustrack", () => {
      console.log("previoustrack");
    });
    navigator.mediaSession.setActionHandler("nexttrack", () => {
      console.log("nexttrack");
    });
  }
};

run();
