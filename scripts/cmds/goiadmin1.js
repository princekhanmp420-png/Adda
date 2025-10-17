module.exports = {
  config: {
    name: "mention_reply",
    author: "SaGor",
    role: 0,
    shortDescription: "নির্দিষ্ট আইডি মেনশন করলে রিপ্লাই দেয়",
    longDescription: "যখন কেউ নির্দিষ্ট মানুষের আইডি মেনশন করবে, তখন বট একটি নির্দিষ্ট রিপ্লাই পাঠাবে।",
    category: "fun",
    guide: "{pn}"
  },

  onChat: async function({ api, event }) {
    // কেউ মেনশন করেছে কিনা চেক করো
    if (!event.mentions || Object.keys(event.mentions).length === 0) return;

    // সব মেনশন করা ইউজারদের আইডি নাও
    const mentionedIDs = Object.keys(event.mentions);

    // এখানে নির্দিষ্ট আইডি ও রিপ্লাই মেসেজ সেট করো
    const mentionReplies = {
      "61560964919057": "ম্যাডাম এখন ব্যস্ত আছি গ্রুপে আসলে আপনার মেসেজের রিপ্লাই দিবে",
      "100057683829700": "ম্যাডাম এখন ব্যস্ত আছি গ্রুপে আসলে আপনার মেসেজের রিপ্লাই দিবে",
      "6155432109876543210": "😂 এই মানুষটার নাম নিলেই ঝামেলা শুরু হয়!"
    };

    // লুপ করে চেক করো কেউ এই তালিকার মধ্যে আছে কিনা
    for (const id of mentionedIDs) {
      if (mentionReplies[id]) {
        return api.sendMessage(mentionReplies[id], event.threadID, event.messageID);
      }
    }
  },

  onStart: async function({}) {}
};
