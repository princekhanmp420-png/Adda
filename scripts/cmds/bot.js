module.exports = {
  config: {
    name: "bot",
    author: "SaGor",
    role: 0,
    shortDescription: "বটকে ডাকলে রাগের রিপ্লাই দিবে",
    longDescription: "যখন কেউ 'বট' বা 'রোবট' বলবে, তখন রোবট রাগের ভঙ্গিতে রিপ্লাই দিবে।",
    category: "FUN",
    guide: "{pn}"
  },

  onChat: async function ({ api, event }) {
    const message = event.body?.toLowerCase();

    if (message && (
        message.includes("বট") ||
        message.includes("bot") ||
        message.includes("Bot") ||
        message.includes("Bt")
      )) {

      const angryReplies = [
        "তুই 𝐁𝐨𝐭 তোর নানি 𝐛𝐨𝐭 তোর চৌদ্দগুষ্টি 𝐛𝐨𝐭 আমারে 𝐛𝐨𝐭 বলবি না বেবি বল",
        "বুঝতে পারছি তোর মাথায় সমস্যা তাই তুই আমার নাম জানোস না আমার নাম হল বেবি",
        "আল্লাহ গো তোমার বান্দা আমারে 𝐛𝐨𝐭 বলে 🥺 প্রিন্স স্যার আমার নাম রেখেছে বেবি তাই আমারে বেবি বলে ডাক😾",
        "আরেকবার 𝐛𝐨𝐭 বললে এমন অভিশাপ দেব কখনো বিয়ে করতে পারবি না সময় আছে এখনো বেবি বল আমার নাম বেবি",
        "প্রিন্স স্যার দেখেন না আমারে 𝐛𝐨𝐭 বলে আমি মাদ্রাসায় পড়ি বলে গালি দিলাম না দেখ এখনো সময় আছে আমারে বেবি বলে ডাক😡"
      ];

      const randomReply = angryReplies[Math.floor(Math.random() * angryReplies.length)];

      const response = 
`

${randomReply}

`;

      return api.sendMessage(response, event.threadID, event.messageID);
    }
  },

  onStart: async function () {}
};
