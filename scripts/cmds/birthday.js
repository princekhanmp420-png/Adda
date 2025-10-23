const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "birthday",
    author: "SaGor",
    version: "1.1.0",
    role: 0,
    shortDescription: "নামসহ জন্মদিনে শুভেচ্ছা জানাবে 🎂",
    longDescription: "যখন কেউ শুভ জন্মদিন বলবে, বা নিজের জন্মদিন বলবে, অথবা কাউকে মেনশন করে জন্মদিন জানাবে — বট নামসহ সুন্দরভাবে উইশ করবে।",
    category: "FUN",
    guide: "{pn}"
  },

  onChat: async function ({ api, event, Users }) {
    const message = event.body?.toLowerCase();
    if (!message) return;

    // ইউজারের নাম নেওয়া (নিজের নামের জন্য)
    const senderName = await Users.getNameUser(event.senderID);

    // ===== নিজের জন্মদিন =====
    if (
      message.includes("আজ আমার জন্মদিন") ||
      message.includes("aj birthday amar") ||
      message.includes("aj amar birthday") ||
      message.includes("আমারে উইশ করো")
    ) {
      const selfWish = `🎉 শুভ জন্মদিন ${senderName}! 🎂  
তোমার দিনটি হোক ভালোবাসা, হাসি আর আনন্দে ভরা 💖  
আল্লাহ তোমার জীবন সুখে ও শান্তিতে ভরিয়ে দিন 🌸`;

      await api.sendMessage(selfWish, event.threadID, event.messageID);
      return api.setMessageReaction("🎂", event.messageID, () => {}, true);
    }

    // ===== অন্যকে উইশ করা হলে =====
    if (
      message.includes("শুভ জন্মদিন") ||
      message.includes("happy birthday") ||
      message.includes("পয়দা দিবস")
    ) {
      const mentions = event.mentions || {};

      // ✅ কেউ যদি কাউকে মেনশন করে জন্মদিন জানায়
      if (Object.keys(mentions).length > 0) {
        for (const [uid, name] of Object.entries(mentions)) {
          const mentionWish = `🎂 শুভ জন্মদিন ${name}! 🎉  
আল্লাহ তোমার জীবন হাসি, ভালোবাসা ও সফলতায় ভরিয়ে দিন 💖  
সবসময় আনন্দে থেকো 🌷`;

          await api.sendMessage(mentionWish, event.threadID, event.messageID);
          await api.setMessageReaction("🎁", event.messageID, () => {}, true);
        }
        return;
      }

      // ✅ কেউ শুধু শুভ জন্মদিন বলে (মেনশন ছাড়া)
      const wish = `🎉 শুভ জন্মদিন ${senderName}! 🥳  
তোমার প্রতিটা দিন হোক হাসি আর ভালোবাসায় ভরা 💖  
আল্লাহ তোমার জন্য অগণিত সুখ ও শান্তি দান করুন 🌸`;

      await api.sendMessage(wish, event.threadID, event.messageID);
      return api.setMessageReaction("🎂", event.messageID, () => {}, true);
    }
  },

  onStart: async function () {}
};
