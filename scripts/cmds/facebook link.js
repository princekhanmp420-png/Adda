module.exports = {
  config: {
    name: "links",
    author: "SaGor",
    role: 0,
    shortDescription: "গ্রুপ, পেজ ও মেসেঞ্জার লিংক পাঠাবে",
    longDescription: "যখন কেউ 'group link', 'page link', বা 'Box link' বলবে তখন রোবট সংশ্লিষ্ট লিংক দিবে সুন্দরভাবে।",
    category: "INFO",
    guide: "{pn} [group/page/messenger] link"
  },

  onChat: async function ({ api, event }) {
    const message = event.body?.toLowerCase();
    if (!message) return;

    // তোমার আসল লিংকগুলো এখানে বসাও 👇
    const facebookGroup = "https://facebook.com/groups/islamik.life1/";
    const facebookPage = "https://www.facebook.com/Islamic.Fundation";
    const messengerGroup = "https://m.me/j/Abawo-69GGiHYihE/";

    let reply = "";

    if (message.includes("Facebook link")) {
      reply = `
╭━━━👥 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐆𝐑𝐎𝐔𝐏 👥━━━╮
🔗 ${facebookGroup}
╰━━━💙সবাই জয়েন হয়ে যাও💙━━━╯
`;
    } 
    else if (message.includes("Page link")) {
      reply = `
╭━━━📄 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐏𝐀𝐆𝐄 📄━━━╮
🔗 ${facebookPage}
╰━━🖤ফলো করুন💛━━━╯
`;
    } 
    else if (message.includes("Box link")) {
      reply = `
╭━━━💬 𝐌𝐄𝐒𝐒𝐄𝐍𝐆𝐄𝐑 𝐆𝐑𝐎𝐔𝐏 💬━━━╮
🔗 ${messengerGroup}
╰━━━💜সবাই জয়েন হয়ে যাও💜━━━╯
`;
    }

    // যদি শুধু "লিংক" বা "link" বলে, সবগুলোই দেখাবে
    else if (message.includes("All link") || message.includes("link")) {
      reply = `
╭━━━🌐 𝐎𝐅𝐅𝐈𝐂𝐈𝐀𝐋 𝐋𝐈𝐍𝐊𝐒 🌐━━━╮
👥 Group: ${facebookGroup}
📄 Page: ${facebookPage}
💬 Messenger: ${messengerGroup}
╰🥰সবগুলাই ইসলামিক কাজে পরিচালিত💖━━━╯
`;
    }

    if (reply !== "") {
      return api.sendMessage(reply, event.threadID, event.messageID);
    }
  },

  onStart: async function () {}
};
