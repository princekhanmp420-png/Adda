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
      "Assalamu alaikum",
      "আসসালামু আলাইকুম",
      "আসসালামুআলাইকুম"
    ];

    // কেউ সালাম বললে রিপ্লাই দেবে
    if (salamTriggers.some(trigger => message.includes(trigger))) {
      return api.sendMessage(
        "𝗪𝗮𝗹𝗶𝗸𝗶𝗺 𝗮𝘀𝘀𝗮𝗹𝗮𝗺🖤𝗠𝘆 𝗡𝗮𝗺𝗲 𝗶𝘀 𝗕𝗮𝗯𝘆 🩷",
        event.threadID,
        event.messageID
      );
    }
  },

  onStart: async function() {}
};
