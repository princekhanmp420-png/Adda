const axios = require("axios");
const fs = require("fs");
const path = require("path");
const cacheDir = path.join(__dirname, "/cache");

// ক্যাশ ফোল্ডার না থাকলে তৈরি করুন
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

module.exports = {
  config: {
    name: "fixedvideo",
    version: "1.0",
    author: "Rômeo & GPT-5",
    description: {
      en: "Send a fixed YouTube video when a specific message is sent.",
    },
    category: "media",
    guide: {
      en: "{pn}: Sends the preset video.",
    },
  },

  // যখন কেউ কমান্ড পাঠাবে
  onStart: async ({ api, event, args }) => {
    // ✅ এখানে আপনার ভিডিও লিংক দিন
    const videoUrl = "https://youtu.be/AkLVe_6-U4g?si=79h5T83KrUuwlXmb"; // <-- আপনার ভিডিও লিংক এখানে দিন

    try {
      api.sendMessage("⏳ Downloading your requested video...", event.threadID, event.messageID);

      // 🔹 ভিডিও নামানোর API
      const { data } = await axios.get(
        `https://api.kenliejugarap.com/api/ytb?url=${encodeURIComponent(videoUrl)}`
      );

      if (!data.mp4) {
        return api.sendMessage("❌ Couldn't fetch video file.", event.threadID, event.messageID);
      }

      const videoPath = path.join(cacheDir, `fixed_video_${Date.now()}.mp4`);

      const response = await axios.get(data.mp4, { responseType: "stream" });
      const writer = fs.createWriteStream(videoPath);
      response.data.pipe(writer);

      writer.on("finish", async () => {
        await api.sendMessage(
          {
            body: `🎬 Here's your fixed video:\n📺 ${data.title || "Untitled"}`,
            attachment: fs.createReadStream(videoPath),
          },
          event.threadID,
          () => fs.unlinkSync(videoPath)
        );
      });
    } catch (error) {
      console.error(error);
      api.sendMessage("❌ Failed to download video.", event.threadID, event.messageID);
    }
  },
};
