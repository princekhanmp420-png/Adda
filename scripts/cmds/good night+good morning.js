module.exports = {
  config: {
    name: "smart_greeting",
    author: "SaGor",
    role: 0,
    shortDescription: "সময় অনুযায়ী শুভ সকাল, শুভ সন্ধ্যা ও শুভ রাত্রি রিপ্লাই",
    longDescription: "সময় অনুযায়ী গুড মর্নিং, গুড ইভনিং বা গুড নাইট রিপ্লাই দেয় এবং ভুল সময়ে বললে মজারভাবে প্রতিক্রিয়া জানায়।",
    category: "AI",
    guide: "{pn}"
  },

  onChat: function({ api, event }) {
    const msg = event.body?.toLowerCase();
    if (!msg) return;

    // --- কীওয়ার্ড ---
    const morningWords = ["good morning", "Gd m9", "GOOD MORNING", "গুড মর্নিং", "শুভ সকাল"];
    const eveningWords = ["good evening", "গুড ইভনিং", "শুভ সন্ধ্যা"];
    const nightWords = ["good night", "gn", "gd n8", "গুড নাইট", "শুভ রাত্রি"];

    // --- সময় ---
    const now = new Date();
    const hour = now.getHours(); // 0–23

    const isMorning = hour >= 5 && hour < 12;
    const isEvening = hour >= 16 && hour < 20;
    const isNight = hour >= 20 || hour < 4;

    // === শুভ সকাল ===
    if (morningWords.some(w => msg.includes(w))) {
      if (isMorning) {
        const replies = [
          "🌞 শুভ সকাল! শুরু হোক আল্লাহর নামে💛",
          "☀️ Good Morning! দিনটা হাসি মায় কাটুক 🌸",
          "🌼 শুভ সকাল প্রিয়! তিনটা সুন্দর আনন্দময় কাটুক ✨",
          "🌅 দিনের শুরুটা হোক আল্লাহর নামে 💫"
        ];
        return api.sendMessage(replies[Math.floor(Math.random() * replies.length)], event.threadID, event.messageID);
      } else if (isNight) {
        const funny = [
          "তোমার মাথায় সমস্যা এখন তো রাত 😆",
          "🤣তুমি যে পাগল হয়েছ বাসায় জানে এখন তো রাত যাও ঘুমিয়ে পড়ো 😂",
          "পাবনার মানুষ আসছে এখন তো রাত যাও ঘুমিয়ে পড়ো"
        ];
        return api.sendMessage(funny[Math.floor(Math.random() * funny.length)], event.threadID, event.messageID);
      } else if (isEvening) {
        const funny = [
          "😂 এখন সন্ধ্যা চলছে, সকাল চলে গেছে!",
          "🌇 এখন গুড ইভনিং বলো, সূর্য নামছে 😄"
        ];
        return api.sendMessage(funny[Math.floor(Math.random() * funny.length)], event.threadID, event.messageID);
      }
    }

    // === শুভ সন্ধ্যা ===
    if (eveningWords.some(w => msg.includes(w))) {
      if (isEvening) {
        const replies = [
          "🌆 শুভ সন্ধ্যা! যাও একটি ইসলামিক পোস্ট করে আসো 💫",
          "🌇 Good Evening! সময়টা কাটাও হাসিখুশি মেজাজে 💛",
          "✨ সন্ধ্যার বাতাসে শান্তি খুঁজে নাও 🌿",
          "🌻 Evening vibes 🌙 — Relax and smile!"
        ];
        return api.sendMessage(replies[Math.floor(Math.random() * replies.length)], event.threadID, event.messageID);
      } else if (isMorning) {
        const funny = [
          "🤣 এখন সকাল , ইভনিং এখনো আসে নাই!",
          "☀️ Good Evening না, এখন Good Morning বলো!"
        ];
        return api.sendMessage(funny[Math.floor(Math.random() * funny.length)], event.threadID, event.messageID);
      } else if (isNight) {
        const funny = [
          "কি একটা অবস্থা এখন তো রাত ঘুমিয়ে পড়ো",
          "যাও ঘুমিয়ে পড়ো"
        ];
        return api.sendMessage(funny[Math.floor(Math.random() * funny.length)], event.threadID, event.messageID);
      }
    }

    // === শুভ রাত্রি ===
    if (nightWords.some(w => msg.includes(w))) {
      if (isNight) {
        const replies = [
          "🌙 শুভ রাত্রি! মিষ্টি স্বপ্ন দেখো 💫",
          "😴 Good Night! শান্তিতে ঘুমাও ❤️",
          "🌌 রাত গভীর, চোখ বুজে বিশ্রাম নাও 🌃",
          "💤 আগামীকাল নতুন সূর্য নিয়ে নতুন আশা 🌞"
        ];
        return api.sendMessage(replies[Math.floor(Math.random() * replies.length)], event.threadID, event.messageID);
      } else if (isMorning) {
        const funny = [
          "বুঝতে পারছি এরা পাবনার মানুষ এখন তো সকাল",
          "☀️ এখন সকাল হয়েছে এবার ঘুম থেকে ওঠো",
          "😆 গুড নাইট নয়, এখন গুড মর্নিং টাইম!"
        ];
        return api.sendMessage(funny[Math.floor(Math.random() * funny.length)], event.threadID, event.messageID);
      } else if (isEvening) {
        const funny = [
          "🌇 এখন সন্ধ্যা চলছে, একটু পরেই গুড নাইট দিও!",
          "😄 আগে সূর্যটা নামুক, তারপর নাইট বলো!"
        ];
        return api.sendMessage(funny[Math.floor(Math.random() * funny.length)], event.threadID, event.messageID);
      }
    }
  },

  onStart: async function() {}
};
