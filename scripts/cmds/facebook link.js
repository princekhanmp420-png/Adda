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

    if (message.includes("Gc link")) {
      reply = `
╭━━━👥 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐆𝐑𝐎𝐔𝐏 👥━━━╮
🔗 ${facebookGroup}
╰━━━💙𝗝𝗢𝗜𝗡𝗘 𝗡𝗢𝗪💙━━━╯
`;
    } 
    else if (message.includes("Page link")) {
      reply = `
╭━━━📄 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐏𝐀𝐆𝐄 📄━━━╮
🔗 ${facebookPage}
╰━━🖤𝗙𝗢𝗟𝗟𝗢𝗪 𝗡𝗢𝗪💛━━━╯
`;
    } 
    else if (message.includes("Message link")) {
      reply = `
╭━━━💬 𝐌𝐄𝐒𝐒𝐄𝐍𝐆𝐄𝐑 𝐆𝐑𝐎𝐔𝐏 💬━━━╮
🔗 ${messengerGroup}
╰━━━💜𝗧𝗘𝗫𝗧 𝗡𝗢𝗪💜━━━╯
`;
    }

    // যদি শুধু "লিংক" বা "link" বলে, সবগুলোই দেখাবে
    else if (message.includes("All link") || message.includes("All box link")) {
      reply = `
╭━━━🌐 𝐎𝐅𝐅𝐈𝐂𝐈𝐀𝐋 𝐋𝐈𝐍𝐊𝐒 🌐━━━╮
👥 Group: ${facebookGroup}
📄 Page: ${facebookPage}
💬 Messenger: ${messengerGroup}
╰🥰𝗔𝗟𝗟 𝗜𝗦𝗟𝗔𝗠𝗜𝗖 𝗕𝗢𝗫💖━━━╯
`;
    }

    if (reply !== "") {
      return api.sendMessage(reply, event.threadID, event.messageID);
    }
  },

  onStart: async function () {}
};
