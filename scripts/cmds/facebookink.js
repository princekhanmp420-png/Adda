module.exports = {
  config: {
    name: "smart_link_provider",
    author: "SaGor",
    version: "1.1.0",
    role: 0,
    shortDescription: "শুধু শুরুতে লিখলে ফেসবুক পেজ, গ্রুপ বা মেসেঞ্জার লিংক দিবে 🔗",
    longDescription: "যদি কেউ মেসেজের শুরুতে ফেসবুক পেজ, গ্রুপ বা মেসেঞ্জার গ্রুপের লিংক চায়, তাহলে বট সেটার লিংক দিবে। কিন্তু মাঝখানে বা শেষে লিখলে কিছুই বলবে না।",
    category: "INFO",
    guide: "{pn} ফেসবুক পেজের লিংক দাও / ফেসবুক গ্রুপের লিংক দাও / মেসেঞ্জার গ্রুপের লিংক দাও"
  },

  onChat: async function ({ api, event }) {
    const message = event.body?.trim().toLowerCase();
    if (!message) return;

    // 🔗 নিজের লিংক বসাও নিচে
    const facebookPage = "https://www.facebook.com/Islamic.Fundation";
    const facebookGroup = "https://facebook.com/groups/islamik.life1/";
    const messengerGroup = "https://m.me/j/Abawo-69GGiHYihE/";

    let reply = "";

    // ✅ শুধু শুরুতে লিখলে রিপ্লাই দিবে
    if (message.startsWith("Page")) {
      reply = `🌐 **ফেসবুক পেজের লিংক:**\n${facebookPage}`;
    } 
    else if (message.startsWith("gc")) {
      reply = `👥 **ফেসবুক গ্রুপের লিংক:**\n${facebookGroup}`;
    } 
    else if (message.startsWith("Text")) {
      reply = `💬 **মেসেঞ্জার গ্রুপের লিংক:**\n${messengerGroup}`;
    } 
    else {
      // ❌ মাঝখানে বা শেষে থাকলে কিছুই বলবে না
      return;
    }

    const styledReply = 
`╭────────────────────╮
${reply}
╰────────────────────╯`;

    return api.sendMessage(styledReply, event.threadID, event.messageID);
  },

  onStart: async function () {}
};
