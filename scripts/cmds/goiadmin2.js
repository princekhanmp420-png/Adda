module.exports = {
  config: {
    name: "mentionAdmin",
    author: "SaGor",
    role: 0,
    shortDescription: "নির্দিষ্ট আইডি mention করলে আলাদা রিপ্লাই দেবে",
    longDescription: "যখন কেউ নির্দিষ্ট অ্যাডমিনদের mention করবে, বট তাদের জন্য আলাদা মেসেজ পাঠাবে।",
    category: "BOT",
    guide: "{pn}"
  },

  onChat: function ({ api, event }) {
    // এখানে প্রতিটি আইডির জন্য আলাদা মেসেজ লিখো
    const adminReplies = {
      "61560964919057": "🩷 ম্যাডাম এখন ব্যস্ত আছে গ্রুপে আসলে আপনার মেসেজের রিপ্লাই দিবে ",
      "61575791445818": "💙🌚🫡",
      "61579261550244": "💚🌸🌸🌚",
      "100088836995808": "💛🥱🥱🐥!"
    };

    // মেনশন আইডি বের করা
    const mentionedIDs = Object.keys(event.mentions || {});

    // মেনশন করা আইডির মধ্যে কেউ adminReplies তালিকায় আছে কিনা দেখা
    for (const id of mentionedIDs) {
      if (adminReplies[id]) {
        return api.sendMessage(
          adminReplies[id],
          event.threadID,
          event.messageID
        );
      }
    }
  },

  onStart: async function () {}
};
