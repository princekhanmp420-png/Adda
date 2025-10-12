module.exports = {
  config: {
    name: "goiadmin2",
    version: "1.1",
    author: "SaGor",
    countDown: 5,
    role: 0,
    shortDescription: "নির্দিষ্ট আইডি মেনশন করলে আলাদা রিপ্লাই দিবে",
    longDescription: "সভাপতি ও গ্রুপ লিডারদের মেনশন করলে বট আলাদা মেসেজ রিপ্লাই দিবে।",
    category: "group",
    guide: "{pn}"
  },

  onChat: async function ({ api, event }) {
    const mentions = Object.keys(event.mentions || {});
    if (mentions.length === 0) return;

    // 👇 এখানে আইডি অনুযায়ী রিপ্লাই লিখে দাও
    const replyList = {
      "xxxxxxxxxxxxx": "🎩 আপনি সভাপতিকে মেনশন করেছেন — তিনি এখন ব্যস্ত আছেন 😇",
      "xxxxxxxxxxdd": "💬 আপনি গ্রুপ লিডার ১ কে মেনশন করেছেন — তিনি কিছুক্ষণের মধ্যে রিপ্লাই দিবেন 🖤",
      "xxxxxxxxxxxx": "🌸 আপনি গ্রুপ লিডার ২ কে মেনশন করেছেন — তিনি এখন অফলাইনে আছেন 💤",
      "61560964919057": "ম্যাডাম এখন ব্যস্ত আছে 🥰 একটু অপেক্ষা করুন আসলে আপনার মেসেজের রিপ্লাই দিবে 🌸🥰"
    };

    // প্রতিটি mention করা আইডি অনুযায়ী আলাদা মেসেজ পাঠাবে
    for (const id of mentions) {
      if (replyList[id]) {
        await api.sendMessage(replyList[id], event.threadID, event.messageID);
      }
    }
  }
};
