module.exports = {
  config: {
    name: "social_links",
    author: "SaGor",
    role: 0,
    shortDescription: "পেজ, গ্রুপ ও মেসেঞ্জার লিংক সুন্দর ডিজাইন ও বাটনসহ দেয় 💖",
    longDescription:
      "শুধু যখন কেউ মেসেজের শুরুতেই ‘ফেসবুক গ্রুপের লিংক দাও’, ‘পেজের লিংক দাও’ বা ‘মেসেঞ্জার গ্রুপের লিংক দাও’ লিখবে, তখনই বট ❤️ রিয়েক্টসহ বাটনসহ লিংক পাঠাবে। মাঝখানে বা শেষে লিখলে কিছু বলবে না।",
    category: "info",
    guide: "{pn} ফেসবুক গ্রুপের লিংক দাও / পেজের লিংক দাও / মেসেঞ্জার গ্রুপের লিংক দাও"
  },

  onChat: async function({ api, event }) {
    const message = event.body?.toLowerCase().trim();
    if (!message) return;

    // 🔗 তোমার লিংকগুলো নিচে দাও
    const links = {
      group: "https://facebook.com/groups/islamik.life1/",
      page: "https://www.facebook.com/Islamic.Fundation",
      messenger: "https://m.me/j/Abawo-69GGiHYihE/"
    };

    // ❤️ রিয়েক্ট ফাংশন
    const react = (emoji = "❤️") =>
      api.setMessageReaction(emoji, event.messageID, () => {}, true);

    // 🎨 সুন্দর ডিজাইনের টেক্সট
    const design = (title, emoji) => `
╔══✦❀ ${emoji} ❀✦══╗
🌸 𝗢𝗙𝗙𝗜𝗖𝗜𝗔𝗟 ${title.toUpperCase()} 🌸
╚══✦❀ ${emoji} ❀✦══╝
━━━━━━━━━━━━━━━━━━
💖 ধন্যবাদ আমাদের ${title} ভিজিট করার জন্য 🌺
━━━━━━━━━━━━━━━━━━`;

    // ✅ শুধুমাত্র মেসেজের শুরুতে নির্দিষ্ট বাক্য মিলবে
    if (
      message.startsWith("ফেসবুক গ্রুপ") ||
      message.startsWith("group") ||
      message.startsWith("gc group")
    ) {
      react("👥");
      return api.sendMessage(
        {
          body: design("Facebook Group", "👥"),
          attachment: null,
          buttons: [
            {
              type: "web_url",
              url: links.group,
              title: "🔗 গ্রুপে যেতে ক্লিক করুন"
            }
          ]
        },
        event.threadID,
        event.messageID
      );
    }

    if (
      message.startsWith("পেজ") ||
      message.startsWith("page") ||
      message.startsWith("facebook page")
    ) {
      react("📘");
      return api.sendMessage(
        {
          body: design("Facebook Page", "📘"),
          buttons: [
            {
              type: "web_url",
              url: links.page,
              title: "🔗 পেজে যেতে ক্লিক করুন"
            }
          ]
        },
        event.threadID,
        event.messageID
      );
    }

    if (
      message.startsWith("মেসেঞ্জার গ্রুপ") ||
      message.startsWith("messenger‌ box") ||
      message.startsWith("text box")
    ) {
      react("💬");
      return api.sendMessage(
        {
          body: design("Messenger Group", "💬"),
          buttons: [
            {
              type: "web_url",
              url: links.messenger,
              title: "🔗 মেসেঞ্জারে যেতে ক্লিক করুন"
            }
          ]
        },
        event.threadID,
        event.messageID
      );
    }

    // ❌ অন্য কোনো অবস্থায় কিছু বলবে না
  },

  onStart: async function() {}
};
