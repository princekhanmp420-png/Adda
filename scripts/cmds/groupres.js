module.exports = {
  config: {
    name: "group_rules",
    author: "SaGor",
    role: 0,
    shortDescription: "গ্রুপের নামসহ সুন্দরভাবে নিয়ম পাঠায়",
    longDescription: "গ্রুপে কেউ 'গ্রুপের নিয়ম' বা 'group rules' লিখলে, বট এক এক করে সুন্দর ডিজাইনে গ্রুপের নিয়ম পাঠাবে।",
    category: "AI",
    guide: "{pn}"
  },

  onChat: async function({ api, event, Threads }) {
    const msg = event.body?.toLowerCase();
    if (!msg) return;

    // কীওয়ার্ড
    const keywords = ["গ্রুপের নিয়ম", "group rules", "rules", "গ্রুপ রুলস"];
    if (!keywords.some(w => msg.includes(w))) return;

    // থ্রেড ইনফো থেকে গ্রুপের নাম আনা
    const threadInfo = await api.getThreadInfo(event.threadID);
    const groupName = threadInfo.threadName || "এই গ্রুপ";

    // নিয়ম তালিকা
    const rules = [
      "📜 **গ্রুপের নিয়মাবলী শুরু হচ্ছে...** 🌿",
      `🏷️ গ্রুপের নাম: ${groupName}`,
      "━━━━━━━━━━━━━━━",
      "1️⃣ গ্রুপের প্রোফাইল ও নাম চেঞ্জ করা যাবে না🤝",
      "2️⃣ মেয়ে এবং ছেলে কারো ইনবক্সে অনুমতি ছাড়া নোট দেওয়া যাবে না🚫",
      "3️⃣ খারাপ কোন ছবি বা ভিডিও দেওয়া যাবে না",
      "4️⃣ সবার সাথে ভালো ব্যবহার করতে হবে",
      "5️⃣ কাউকে অসম্মান করে কথা বলা যাবে না",
      "6️⃣ যে কোন সমস্যা এডমিনের সাথে যোগাযোগ করবেন",
      "7️⃣ সবাই মিলে মিশে একসাথে আড্ডা দিবেন",
      "━━━━━━━━━━━━━━━",
      "💖 সবার ভালোর জন্যই গ্রুপের নিয়ম গুলো দেওয়া হল আশা করি সকলে মেনে চলবেন!** 🌈"
    ];

    // শুরুতে ঘোষণা
    api.sendMessage(
      `✨ অনুগ্রহ করে মনোযোগ দিন ✨\n\n📋 ${groupName}-এর নিয়মাবলী পাঠানো হচ্ছে...`,
      event.threadID
    );

    // এক এক করে পাঠানো
    for (let i = 0; i < rules.length; i++) {
      setTimeout(() => {
        api.sendMessage(rules[i], event.threadID);
      }, i * 2500); // প্রতি 2.5 সেকেন্ডে একেকটি নিয়ম
    }

    // শেষে সুন্দর সিগনেচার
    setTimeout(() => {
      api.sendMessage(
        "╔══✦❖✦══╗\n✨ '•┄┅═══❁𝙿𝚁𝙸𝙽𝙲𝙴 𝙱𝙻𝙰𝙲𝙺 𝙻𝙾𝚅𝙴𝚁❁═══┅┄•' ✨\n╚══✦❖✦══╝",
        event.threadID
      );
    }, (rules.length + 1) * 2500);
  },

  onStart: async function() {}
};
