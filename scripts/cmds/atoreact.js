const axios = require("axios");

module.exports = {
  config: {
    name: "ai_react_openai",
    author: "SaGor",
    role: 0,
    shortDescription: "OpenAI sentiment দ্বারা রিয়্যাকশন দেয়",
    longDescription:
      "এই মডিউলটি OpenAI sentiment বিশ্লেষণ ব্যবহার করে প্রতিটি মেসেজে উপযুক্ত ইমোজি রিয়্যাকশন দেয়।",
    category: "AI",
    guide: "{pn}"
  },

  onChat: async function({ api, event }) {
    try {
      const message = event.body;
      if (!message) return; // শুধু টেক্সট মেসেজে কাজ করবে

      // তোমার OpenAI API key দাও এখানে
      const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY_HERE";

      // OpenAI API-কে মেসেজ পাঠানো
      const prompt = `এই বাক্যের মুড বুঝে শুধুমাত্র একটি ইমোজি দিয়ে রিপ্লাই দাও (কোনো লেখা নয়)।
বাক্য: "${message}"
বেছে নাও শুধুমাত্র এইগুলোর মধ্য থেকে: 😆, ❤️, 😮, 😢, 👍, 😡`;

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "তুমি একটি sentiment emoji selector bot।" },
            { role: "user", content: prompt }
          ],
          temperature: 0.2,
          max_tokens: 10
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`
          }
        }
      );

      let emoji = response.data.choices[0].message.content.trim();

      // নিরাপদ fallback ইমোজি
      const allowed = ["😆", "❤️", "😮", "😢", "👍", "😡"];
      if (!allowed.includes(emoji)) {
        if (message.match(/😂|🤣|হাসি|funny|মজা/i)) emoji = "😆";
        else if (message.match(/ভালোবাসা|love|❤️|প্রেম/i)) emoji = "❤️";
        else if (message.match(/দুঃখ|sad|cry|😢/i)) emoji = "😢";
        else if (message.match(/wow|ওয়াও|অসাধারণ|চমৎকার/i)) emoji = "😮";
        else if (message.match(/ধন্যবাদ|thank/i)) emoji = "👍";
        else if (message.match(/রাগ|angry|😡|গালি/i)) emoji = "😡";
        else emoji = "👍";
      }

      // রিয়্যাকশন পাঠাও
      return api.setMessageReaction(emoji, event.messageID, (err) => {
        if (err) console.error("Reaction Error:", err);
      }, true);
    } catch (error) {
      console.error("ai_react_openai error:", error);
    }
  },

  onStart: async function() {}
};
