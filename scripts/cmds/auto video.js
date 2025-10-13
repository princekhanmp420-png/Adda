const axios = require("axios");
const fs = require("fs");
const path = require("path");

const cacheDir = path.join(__dirname, "/cache");
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

module.exports = {
  config: {
    name: "autovideo",
    version: "1.0",
    author: "Rômeo & GPT-5",
    description: {
      en: "Sends a specific YouTube or Facebook video when triggered by a message.",
    },
    category: "media",
    guide: {
      en: "{pn}: Sends preset YouTube or Facebook videos.",
    },
  },

  onStart: async ({ api, event, args }) => {
    // ✅ আপনি এখানে আপনার নির্দিষ্ট মেসেজ এবং ভিডিও লিংকগুলো সেট করবেন
    const triggers = {
      "গান দাও": "https://youtu.be/AkLVe_6-U4g?si=79h5T83KrUuwlXmb",
      "মজার ভিডিও": "https://www.facebook.com/Islamic.Fundation/videos/619308543949326/?app=fbl",
      "ইউটিউব ভিডিও": "https://youtu.be/AkLVe_6-U4g?si=79h5T83KrUuwlXmb",
    };

    const userMessage = args.join(" ") || event.body?.trim();

    if (!userMessage || !triggers[userMessage]) {
      let list = Object.keys(triggers)
        .map((key) => `• ${key}`)
        .join("\n");
      return api.sendMessage(
        `🔹 নিচের মেসেজগুলোর একটি লিখুন:\n${list}`,
        event.threadID,
        event.messageID
      );
    }

    const videoUrl = triggers[userMessage];
    api.sendMessage(`⏳ ভিডিও নামানো হচ্ছে...`, event.threadID, event.messageID);

    try {
      // 🧩 ইউটিউব বা ফেসবুক কিনা চেক
      let apiUrl = "";
      if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
        apiUrl = `https://api.kenliejugarap.com/api/ytb?url=${encodeURIComponent(videoUrl)}`;
      } else if (videoUrl.includes("facebook.com") || videoUrl.includes("fb.watch")) {
        apiUrl = `https://api.kenliejugarap.com/api/fbdl?url=${encodeURIComponent(videoUrl)}`;
      } else {
        return api.sendMessage("❌ শুধুমাত্র YouTube বা Facebook ভিডিও লিংক সমর্থিত।", event.threadID, event.messageID);
      }

      // 🎬 ভিডিও ডেটা আনা
      const { data } = await axios.get(apiUrl);

      const videoLink = data.mp4 || data.hd || data.sd;
      if (!videoLink) {
        return api.sendMessage("❌ ভিডিও লিংক পাওয়া যায়নি।", event.threadID, event.messageID);
      }

      const videoPath = path.join(cacheDir, `auto_video_${Date.now()}.mp4`);
      const response = await axios.get(videoLink, { responseType: "stream" });
      const writer = fs.createWriteStream(videoPath);
      response.data.pipe(writer);

      writer.on("finish", async () => {
        await api.sendMessage(
          {
            body: `🎬 ভিডিও প্রস্তুত!\n📺 উৎস: ${videoUrl}`,
            attachment: fs.createReadStream(videoPath),
          },
          event.threadID,
          () => fs.unlinkSync(videoPath)
        );
      });

      writer.on("error", (err) => {
        console.error(err);
        api.sendMessage("❌ ভিডিও পাঠাতে সমস্যা হয়েছে।", event.threadID, event.messageID);
      });
    } catch (error) {
      console.error(error);
      api.sendMessage("❌ ভিডিও নামাতে ব্যর্থ।", event.threadID, event.messageID);
    }
  },
};
