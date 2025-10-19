module.exports = {
  config: {
    name: "smart_time_greeting",
    author: "SaGor",
    version: "1.0.0",
    role: 0,
    shortDescription: "সময় অনুযায়ী শুভ সকাল ও শুভ রাত্রি রিপ্লাই 🌞🌙",
    longDescription: "যখন কেউ Good Morning বা Good Night বলবে, বট সময় অনুযায়ী মেসেজ পাঠাবে — সকালে শুভ সকাল, রাতে শুভ রাত্রি।",
    category: "GREETING",
    guide: "{pn} Good Morning / Good Night"
  },

  onChat: async function ({ api, event }) {
    const msg = event.body?.toLowerCase();
    if (!msg) return;

    // বর্তমান সময় (বাংলাদেশ টাইম)
    const now = new Date();
    const hour = now.getUTCHours() + 6; // BD Time UTC+6
    const currentHour = hour >= 24 ? hour - 24 : hour;

    // সকাল ধরা হলো ৪টা থেকে ১১টা পর্যন্ত
    const isMorning = currentHour >= 4 && currentHour < 12;
    // রাত ধরা হলো ২০টা (৮ PM) থেকে ৩টা পর্যন্ত
    const isNight = currentHour >= 20 || currentHour < 4;

    // ✅ যদি কেউ "good morning" লেখে
    if (msg.includes("good morning") || msg.includes("গুড মর্নিং")) {
      if (isMorning) {
        const morningReplies = [
          "🌞 শুভ সকাল! নতুন দিনের সূর্য তোমার জন্য নিয়ে আসুক অফুরন্ত সুখ 💛",
          "☕ Good Morning! হাসিখুশি থেকো, আজকের দিনটা তোমার জন্য দারুণ হোক 🌼",
          "🌤️ শুভ সকাল প্রিয়! আজকে হোক তোমার জীবনের সেরা দিন 💫"
        ];
        const reply = morningReplies[Math.floor(Math.random() * morningReplies.length)];
        return api.sendMessage(`╭──────────────╮\n${reply}\n╰──────────────╯`, event.threadID, event.messageID);
      } else {
        return api.sendMessage("😴 এখন সকাল না বেবি, এটা রাত! শুভ রাত্রি বলো 🌙", event.threadID, event.messageID);
      }
    }

    // 🌙 যদি কেউ "good night" লেখে
    if (msg.includes("good night") || msg.includes("গুড নাইট")) {
      if (isNight) {
        const nightReplies = [
          "🌙 শুভ রাত্রি! সুন্দর ঘুমে হারিয়ে যাও, স্বপ্নে দেখা হবে 💖",
          "😴 Good Night! চোখ বন্ধ করো, শান্তির ঘুমে ভেসে যাও 🌌",
          "🌜 শুভ রাত! আজকের দিন শেষ, কালকের জন্য তৈরি হও ✨"
        ];
        const reply = nightReplies[Math.floor(Math.random() * nightReplies.length)];
        return api.sendMessage(`╭──────────────╮\n${reply}\n╰──────────────╯`, event.threadID, event.messageID);
      } else {
        return api.sendMessage("☀️ এখন তো সকাল বেবি! শুভ সকাল বলো 😄", event.threadID, event.messageID);
      }
    }
  },

  onStart: async function () {}
};
