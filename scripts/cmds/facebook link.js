module.exports = {
  config: {
    name: "social_links",
    author: "SaGor",
    role: 0,
    shortDescription: "গ্রুপ, পেজ ও মেসেঞ্জার লিংক সুন্দর ডিজাইনসহ দেয় 💖",
    longDescription:
      "যখন কেউ গ্রুপ, পেজ বা মেসেঞ্জার সম্পর্কিত কিছু লিখবে, তখন বট ❤️ রিয়েক্টসহ সুন্দর ডিজাইনে লিংক পাঠাবে।",
    category: "info",
    guide: "{pn} group / page / messenger"
  },

  onChat: async function({ api, event }) {
    const message = event.body?.toLowerCase();
    if (!message) return;

    // এখানে তোমার নিজস্ব লিংকগুলো বসাও 👇
    const links = {
      group: "https://facebook.com/groups/islamik.life1/",
      page: "https://www.facebook.com/Islamic.Fundation",
      messenger: "https://m.me/j/Abawo-69GGiHYihE/"
    };

    // 🌺 সুন্দর ডিজাইনের টেমপ্লেট
    const design = (title, link, emoji) => `
╔══✦❀ ${emoji} ❀✦══╗
   🌸 𝗢𝗙𝗙𝗜𝗖𝗜𝗔𝗟 ${title.toUpperCase()} 🌸
╚══✦❀ ${emoji} ❀✦══╝
🔗 ${link}
━━━━━━━━━━━━━━━━━━
💖 ধন্যবাদ আমাদের ${title} ভিজিট করার জন্য 🌺
━━━━━━━━━━━━━━━━━━`;

    // ❤️ রিয়েক্ট ফাংশন
    const react = (emoji = "❤️") =>
      api.setMessageReaction(emoji, event.messageID, () => {}, true);

    // কীওয়ার্ড অনুযায়ী কাজ
    if (message.includes("গ্রুপ") || message.includes("group") || message.includes("gc")) {
      react("💞");
      return api.sendMessage(
        design("Facebook Group", links.group, "👥"),
        event.threadID,
        event.messageID
      );
    }

    if (message.includes("পেজ") || message.includes("page")) {
      react("🌸");
      return api.sendMessage(
        design("Facebook Page", links.page, "📘"),
        event.threadID,
        event.messageID
      );
    }

    if (
      message.includes("মেসেঞ্জার") ||
      message.includes("messenger") ||
      message.includes("চ্যাট") ||
      message.includes("chat")
    ) {
      react("💬");
      return api.sendMessage(
        design("Messenger Chat", links.messenger, "💬"),
        event.threadID,
        event.messageID
      );
    }
  },

  onStart: async function() {}
};
