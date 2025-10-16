const axios = require("axios");

module.exports = {
  config: {
    name: "ai_react",
    author: "SaGor",
    role: 0,
    shortDescription: "AI দ্বারা প্রতিটি মেসেজে রিয়্যাকশন দেয়",
    longDescription:
      "এই মডিউলটি প্রতিটি মেসেজের অর্থ বুঝে উপযুক্ত ইমোজি রিয়্যাকশন দেয়।",
    category: "AI",
    guide: "{pn}"
  },

  onChat: async function({ api, event }) {
    try {
      const message = event.body;
      if (!message) return; // শুধু টেক্সট মেসেজে কাজ করবে

      // AI দ্বারা মেসেজ বিশ্লেষণ করে রিয়্যাকশন নির্ধারণ
      const prompt = `নিচের মেসেজটি দেখে বুঝে নাও কোন রিয়্যাকশন ইমোজি সবচেয়ে উপযুক্ত হবে।
মেসেজ: "${message}"
রিয়্যাকশন শুধুমাত্র একটি ইমোজি দাও যেমন: 😆, ❤️, 😮, 😢, 👍, 😡`;

      const res = await axios.get(
        `https://simsimi.cyberbot.top/api/v2/?text=${encodeURIComponent(prompt)}&lc=bn`
      );

      let aiReply = res.data.success || "";
      // যদি AI অপ্রাসঙ্গিক কিছু বলে, তাহলে fallback emoji সেট করো
      const emojis = ["😆", "❤️", "😮", "😢", "👍", "😡"];
      if (!emojis.includes(aiReply.trim())) {
        // AI সঠিক ইমোজি না দিলে নিজেই একটা অনুমান করো
        if (message.match(/😂|🤣|হাসি|funny|মজা/i)) aiReply = "😆";
        else if (message.match(/ভালোবাসা|love|❤️|প্রেম/i)) aiReply = "❤️";
        else if (message.match(/দুঃখ|sad|cry|😢/i)) aiReply = "😢";
        else if (message.match(/wow|ওয়াও|অসাধারণ|চমৎকার/i)) aiReply = "😮";
        else if (message.match(/ধন্যবাদ|thank/i)) aiReply = "👍";
        else if (message.match(/রাগ|angry|😡|গালি/i)) aiReply = "😡";
        else aiReply = "👍";
      }

      // AI নির্ধারিত রিয়্যাকশন পাঠাও
      return api.setMessageReaction(aiReply.trim(), event.messageID, (err) => {
        if (err) console.error("Reaction Error:", err);
      }, true);
    } catch (error) {
      console.error("ai_react error:", error);
    }
  },

  onStart: async function() {}
};
