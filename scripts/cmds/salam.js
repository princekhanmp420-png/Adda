module.exports = {
  config: {
    name: "salam_reply",
    author: "SaGor",
    role: 0,
    shortDescription: "সালাম দিলে রিপ্লাই দেয়",
    longDescription: "যখন কেউ সালাম দিবে, তখন বট বলবে 'ওয়ালাইকুমাসসালাম আমার নাম বেবি বেবি 🩷'",
    category: "fun",
    guide: "{pn}"
  },

  onChat: async function({ api, event }) {
    const message = event.body?.toLowerCase();
    if (!message) return;

    // সালাম সম্পর্কিত শব্দ চেক করো
    const salamTriggers = [
      "assalamu alaikum",
      "assalamualaikum",
      "সালাম",
      "আসসালামু আলাইকুম",
      "আসসালামুআলাইকুম"
    ];

    // কেউ সালাম বললে রিপ্লাই দেবে
    if (salamTriggers.some(trigger => message.includes(trigger))) {
      return api.sendMessage(
        "ওয়ালাইকুমাসসালাম 💖 আমার নাম বেবি বেবি 🩷",
        event.threadID,
        event.messageID
      );
    }
  },

  onStart: async function() {}
};
