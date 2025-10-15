const axios = require("axios");
const simsim = "https://simsimi.cyberbot.top";

module.exports = {
  config: {
    name: "baby",
    version: "1.0.0",
    author: "ULLASH x GPT-5",
    countDown: 0,
    role: 0,
    category: "fun",
    shortDescription: "Cute AI Baby chatbot 😚",
    longDescription: "Cute AI chatbot — chat, teach & have fun! 💬",
    guide: {
      en: `
{p}baby [message] → সাধারণভাবে কথা বলবে
{p}teach প্রশ্ন - উত্তর → নতুন কিছু শেখাও
{p}remove প্রশ্ন - উত্তর → শেখানো মুছে ফেলো
{p}edit প্রশ্ন - পুরনো উত্তর - নতুন উত্তর → শেখানো পরিবর্তন করো
{p}list → মোট শেখা প্রশ্ন দেখাও`
    }
  },

  // 🟢 সাধারণভাবে কমান্ড দিয়ে ব্যবহার
  onStart: async function({ message, args, event, usersData }) {
    try {
      const senderID = event.senderID;
      const senderName = await usersData.getName(senderID);
      const rawQuery = args.join(" ");
      const query = rawQuery.toLowerCase();

      if (!query) {
        return message.reply("বলো বেবি 💬");
      }

      const command = args[0].toLowerCase();

      // 🧩 remove
      if (["remove", "rm"].includes(command)) {
        const parts = rawQuery.replace(/^(remove|rm)\s*/i, "").split(" - ");
        if (parts.length < 2) return message.reply("Use: remove প্রশ্ন - উত্তর");
        const [ask, ans] = parts.map(p => p.trim());
        const res = await axios.get(`${simsim}/delete?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}`);
        return message.reply(res.data.message);
      }

      // 📜 list
      if (command === "list") {
        const res = await axios.get(`${simsim}/list`);
        if (res.data.code === 200) {
          return message.reply(
            `♾ Total Questions Learned: ${res.data.totalQuestions}\n★ Total Replies: ${res.data.totalReplies}\n🧠 Developer: ${res.data.author}`
          );
        } else {
          return message.reply(`Error: ${res.data.message || "Failed to fetch list"}`);
        }
      }

      // ✏️ edit
      if (command === "edit") {
        const parts = rawQuery.replace(/^edit\s*/i, "").split(" - ");
        if (parts.length < 3) return message.reply("Use: edit প্রশ্ন - পুরনো উত্তর - নতুন উত্তর");
        const [ask, oldReply, newReply] = parts.map(p => p.trim());
        const res = await axios.get(`${simsim}/edit?ask=${encodeURIComponent(ask)}&old=${encodeURIComponent(oldReply)}&new=${encodeURIComponent(newReply)}`);
        return message.reply(res.data.message);
      }

      // 🧠 teach
      if (command === "teach") {
        const parts = rawQuery.replace(/^teach\s*/i, "").split(" - ");
        if (parts.length < 2) return message.reply("Use: teach প্রশ্ন - উত্তর");
        const [ask, ans] = parts.map(p => p.trim());
        const threadInfo = await message.getThreadInfo();
        const groupName = threadInfo.threadName || "Unknown Group";
        const res = await axios.get(`${simsim}/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}&senderID=${senderID}&senderName=${encodeURIComponent(senderName)}&groupName=${encodeURIComponent(groupName)}`);
        return message.reply(res.data.message || "Added successfully!");
      }

      // 💬 সাধারণ চ্যাট
      const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`);
      const responses = Array.isArray(res.data.response) ? res.data.response : [res.data.response];

      for (const reply of responses) {
        const sent = await message.reply(reply);
        sent.addReplyEvent({
          callback: "baby_reply",
          author: senderID
        });
      }

    } catch (err) {
      return message.reply(`Error: ${err.message}`);
    }
  },

  // 🧡 বটের মেসেজে রিপ্লাই করলে আবার উত্তর দেবে
  onReply: async function({ message, event, Reply, usersData }) {
    try {
      const senderName = await usersData.getName(event.senderID);
      const replyText = event.body ? event.body.toLowerCase() : "";
      if (!replyText) return;
      const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(replyText)}&senderName=${encodeURIComponent(senderName)}`);
      const responses = Array.isArray(res.data.response) ? res.data.response : [res.data.response];
      for (const reply of responses) {
        const sent = await message.reply(reply);
        sent.addReplyEvent({
          callback: "baby_reply",
          author: event.senderID
        });
      }
    } catch (err) {
      message.reply(`Error: ${err.message}`);
    }
  },

  // 🐸 কেউ যদি "baby", "bot", "বেবি", "জান" বলে তখন র‍্যান্ডম রিপ্লাই
  onChat: async function({ event, message, usersData }) {
    try {
      const raw = event.body ? event.body.toLowerCase().trim() : "";
      if (!raw) return;

      const senderName = await usersData.getName(event.senderID);
      const triggerWords = ["baby", "Baby", "bby", "jan", "xan", "জান", "বেবী", "বেবি"];
      if (triggerWords.includes(raw)) {
        const replies = [
          "হুম? বলো 😺",
          "শুনছি বেবি 😘",
          "এতো ডেকো না, প্রেমে পড়ে যাবো 🙈",
          "বলো জানু 💖",
          "Achi jan",
          "আমি ব্যস্ত আছি বসের সাথে 😎",
          "Tomare valo lage🙈😘"
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        return message.reply(`${randomReply} @${senderName}`, event.threadID, {
          mentions: [{ tag: `@${senderName}`, id: event.senderID }]
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
};
