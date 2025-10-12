module.exports = {
  config: {
    name: "smartmorningnight",
    version: "2.0",
    author: "SaGor",
    countDown: 5,
    role: 0,
    shortDescription: "টাইম অনুযায়ী শুভ সকাল ও শুভ রাত্রি রিপ্লাই",
    longDescription: "সময় বুঝে Good Morning ও Good Night মেসেজের স্মার্ট রিপ্লাই দেয়।",
    category: "AI",
    guide: "{pn}"
  },

  onChat: async function ({ api, event }) {
    const msg = event.body?.toLowerCase();
    if (!msg) return;

    const morningTriggers = ["good morning", "গুড মর্নিং", "Gd n9", "Good morning"];
    const nightTriggers = ["good night", "গুড নাইট", "gd n8", "শুভ রাত্রি"];

    // 🌍 টাইম জোন সেট (বাংলাদেশ)
    const hour = new Date().getHours() + 6; // UTC+6

    // 🌅 সকাল ৫টা - দুপুর ১১টা
    const isMorning = hour >= 5 && hour < 12;
    // 🌇 দুপুর ১২টা - বিকাল ৫টা
    const isDay = hour >= 12 && hour < 17;
    // 🌃 সন্ধ্যা ৬টা - রাত ১১টা
    const isEvening = hour >= 17 && hour < 24;
    // 🌙 রাত ১২টা - ভোর ৪টা
    const isNight = hour >= 0 && hour < 5;

    const morningReplies = [
      "🌞 শুভ সকাল! নতুন দিনের শুরু হোক হাসি আর আশায় ও নামাজ দিয়ে দিনটা শুরু হোক 💛",
      "☀️ Good Morning! আজকের দিনটা হোক সাফল্যে ভরা ও নামাজ দিয়ে দিনটা শুরু হোক 🌻",
      "🌤️ সুপ্রভাত! ইতিবাচক মনোভাবেই দিনটা শুরু করো ও আগে নামাজ পড়ে নিবা ✨",
      "☕ শুভ সকাল! নামাজ পড়ে আল্লাহর নামে দিনটি শুরু করো 💫"
    ];

    const nightReplies = [
      "🌙 শুভ রাত্রি! এশারের নামাজ পড়ে ঘুমের দোয়া পড়ে ঘুমানো উত্তম💖",
      "😴 Good Night! ঘুমের দোয়া পড়ে ঘুমালে সুন্দর স্বপ্ন দেখবা🌸",
      "💤 শুভ রাত্রি! নামাজ পড়ে ঘুমের দোয়া পড়ে ঘুমালে রাতটা শান্তিময় কাটবে🌼",
      "🌠 Good Night dear! নামাজ পড়ে ঘুমের দোয়া পরে ঘুমাবা ইনশাআল্লাহ কালকে কথা হবে✨"
    ];

    // 🧠 Smart logic
    if (morningTriggers.some(w => msg.includes(w))) {
      if (isNight || isEvening) {
        return api.sendMessage("🌙 তোমার মাথায় সমস্যা এখন তো রাত 🤭", event.threadID, event.messageID);
      } else {
        const reply = morningReplies[Math.floor(Math.random() * morningReplies.length)];
        return api.sendMessage(reply, event.threadID, event.messageID);
      }
    }

    if (nightTriggers.some(w => msg.includes(w))) {
      if (isMorning || isDay) {
        return api.sendMessage("☀️ তোমার মাথায় সমস্যা এখন তো সকাল 🤭", event.threadID, event.messageID);
      } else {
        const reply = nightReplies[Math.floor(Math.random() * nightReplies.length)];
        return api.sendMessage(reply, event.threadID, event.messageID);
      }
    }
  }
};
