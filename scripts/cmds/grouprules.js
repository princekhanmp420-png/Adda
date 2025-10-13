module.exports = {
  config: {
    name: "grouprules",
    author: "SaGor",
    role: 0,
    shortDescription: "গ্রুপের নিয়মাবলী প্রদর্শন করবে",
    longDescription: "যখন কেউ 'গ্রুপের নিয়ম', 'group rules' বা 'rules' বলবে তখন বট সুন্দরভাবে গ্রুপের নিয়মাবলী দেখাবে।",
    category: "GROUP",
    guide: "{pn}"
  },

  onChat: async function ({ api, event }) {
    const trigger = event.body?.toLowerCase();

    // ট্রিগার শব্দ চেক করা হচ্ছে
    if (trigger && (
        trigger.includes("গ্রুপের নিয়ম") ||
        trigger.includes("group rules") ||
        trigger.includes("rules")
      )) {

      const groupName = "🌸 𝐏𝐑𝐈𝐍𝐂𝐄 𝐁𝐋𝐀𝐂𝐊 𝐋𝐎𝐕𝐄𝐑 🌸"; // <-- চাইলে তোমার গ্রুপের নাম বসাও
      
      const rules = [
        "① কেউ কারো ইনবক্সে অনুমতি ছাড়া নক করবে না🚫",
        "② গ্রুপের নাম এবং প্রোফাইল চেঞ্জ করা যাবে না❌",
        "③ সকলের সাথে ভালো ব্যবহার করতে হবে⚠️",
        "④ সালাম দিয়ে কথা শুরু করতে হবে 😇",
        "⑤ সমস্যা থাকলে অবশ্যই একজনের সাথে পরামর্শ করবেন❤️"
          ];

      // সুন্দর ডিজাইন করা মেসেজ
      let message = `❖ 🌺 ${groupName} 🌺 ❖\n`;
      message += `     \n📜 𝗚𝗥𝗢𝗨𝗣 𝗥𝗨𝗟𝗘𝗦 📜\n\n`;
      message += rules.map(rule => `• ${rule}`).join("\n");
      message += `\n অনুরোধ\n 💞 ❖𝙿𝚁𝙸𝙽𝙲𝙴 𝙱𝙻𝙰𝙲𝙺 𝙻𝙾𝚅𝙴𝚁❖ 💞 ❖`;

      return api.sendMessage(message, event.threadID, event.messageID);
    }
  },

  onStart: async function ({}) {}
};
