module.exports = {
  config: {
    name: "smart_greeting",
    author: "SaGor",
    role: 0,
    shortDescription: "সময় অনুযায়ী গুড মর্নিং ও গুড নাইট রিপ্লাই",
    longDescription: "যখন কেউ 'Good Morning' বা 'Good Night' বলবে তখন বট সময় অনুযায়ী উপযুক্ত মেসেজ পাঠাবে।",
    category: "AI",
    guide: "{pn}"
  },

  onChat: function({ api, event }) {
    const msg = event.body?.toLowerCase();
    if (!msg) return;

    // কীওয়ার্ড তালিকা
    const morningWords = ["good morning", "gm", "গুড মর্নিং"];
    const nightWords = ["good night", "gn", "গুড নাইট"];

    // সময় নির্ধারণ
    const now = new Date();
    const hour = now.getHours(); // 0–23 ঘন্টা

    const isMorningTime = hour >= 5 && hour <= 11; // সকাল ৫–১১
    const isNightTime = hour >= 20 || hour <= 3;   // রাত ৮–ভোর ৩

    // === গুড মর্নিং ===
    if (morningWords.some(w => msg.includes(w))) {
      if (isMorningTime) {
        const morningReplies = [
          "🌞 শুভ সকাল! দিনটা হাসিখুশি কাটাও 💛",
          "Good Morning ☀️ — নতুন শুরু হোক সুন্দরভাবে 🌸",
          "🌼 সকাল মানেই নতুন আশা, শুভ সকাল প্রিয় 💫",
          "Rise and Shine 🌅 — আজকের দিনটা চমৎকার হোক!"
        ];
        const reply = morningReplies[Math.floor(Math.random() * morningReplies.length)];
        return api.sendMessage(reply, event.threadID, event.messageID);
      } else if (isNightTime) {
        const funnyReply = [
          "🌙 এখন রাত, ঘুমাও ভাই 😴 সকাল নয়!",
          "🤣 তুমি কি টাইম ট্রাভেলার? এখন কিন্তু রাত চলছে!",
          "😴 এখন গুড নাইট বলাই ভালো, সকালে গুড মর্নিং বলো!"
        ];
        const reply = funnyReply[Math.floor(Math.random() * funnyReply.length)];
        return api.sendMessage(reply, event.threadID, event.messageID);
      }
    }

    // === গুড নাইট ===
    if (nightWords.some(w => msg.includes(w))) {
      if (isNightTime) {
        const nightReplies = [
          "🌙 শুভ রাত্রি! মিষ্টি স্বপ্ন দেখো 💫",
          "Good Night 😴 — শান্তিতে ঘুমাও 💖",
          "🌌 রাত গভীর, চোখ বুজে বিশ্রাম নাও 💤",
          "Sweet Dreams 💫 আগামীকাল নতুন দিন!"
        ];
        const reply = nightReplies[Math.floor(Math.random() * nightReplies.length)];
        return api.sendMessage(reply, event.threadID, event.messageID);
      } else if (isMorningTime) {
        const morningReply = [
          "🌞 এখন সকাল চলছে, ঘুম থেকে ওঠো! 😆",
          "☀️ গুড নাইট না, গুড মর্নিং বলো!",
          "🤣 এখন তো সকাল, ঘুম ভাঙাও!"
        ];
        const reply = morningReply[Math.floor(Math.random() * morningReply.length)];
        return api.sendMessage(reply, event.threadID, event.messageID);
      }
    }
  },

  onStart: async function({}) {}
};
