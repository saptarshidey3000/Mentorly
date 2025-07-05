// src/util/agoraConfig.js

import AgoraRTC from "agora-rtc-sdk-ng";

export const APP_ID = "c124727e52f64c5cbce2f776c925b475"; // Replace this

export const createAgoraClient = () =>
  AgoraRTC.createClient({ mode: "live", codec: "vp8" });
