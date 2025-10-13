module.exports = {
  config: {
    name: "goiadmin1",
    author: "SaGor",
    role: 0,
    shortDescription: "অ্যাডমিনদের মেনশন রেসপন্স",
    longDescription: "যে অ্যাডমিনকে মেনশন করা হবে তার জন্য আলাদা মেসেজ পাঠাবে।",
    category: "BOT",
    guide: "{pn}"
  },

  onChat: function({ api, event }) {
    // === অ্যাডমিনদের আইডি ও তাদের কাস্টম মেসেজ ===
    const adminReplies = {
      "61560964919057": [
        "ম্যাডাম এখন ব্যস্ত আছে গ্রুপে আসলে আপনার সাথে কথা বলবে 😇",
        "ম্যাডাম গ্রুপে আসলে আপনার মেসেজের রিপ্লাই দিবে"
      ],
      "61575791445818": [
        "এইজন আমার বস ! উনি এখন বিশ্রামে 😴",
        "বস এর এখন মুডে নেই, পরে রিপ্লাই দিবেন 🌙"
      ],
      "61579261550244": [
        "বস এখন কোডিংয়ে ডুবে আছেন 💻",
        "বস একটু পরে লাইনে আসবেন, ধৈর্য ধরো 🧩"
      ],
      "100088836995808": [
        "বস এখন অফলাইনে, পরে ফিরলে কথা বলবেন ✨",
        "বস এখন চিল করছে 😎 পরে দেখা হবে!"
      ]
    };

    const senderID = event.senderID;
    const mentions = event.mentions || {};
    const mentionedIDs = Object.keys(mentions);

    // যদি কেউ mention না করে তাহলে কিছু না করবে
    if (mentionedIDs.length === 0) return;

    // যদি প্রেরক নিজেই অ্যাডমিন হয় তাহলে কিছু করবে না
    if (Object.keys(adminReplies).includes(senderID)) return;

    // প্রত্যেক mention করা অ্যাডমিন আইডি চেক করে আলাদা মেসেজ পাঠানো
    for (const id of mentionedIDs) {
      if (adminReplies[id]) {
        const replies = adminReplies[id];
        const randomMsg = replies[Math.floor(Math.random() * replies.length)];
        api.sendMessage(randomMsg, event.threadID, event.messageID);
      }
    }
  },

  onStart: async function({}) {}
};
