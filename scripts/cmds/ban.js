const fs = require("fs");
const path = __dirname + "/banned.json";

// banned list ফাইল না থাকলে তৈরি করো
if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify([]));

module.exports = {
  config: {
    name: "banmember",
    version: "1.0.0",
    author: "SaGor x GPT-5",
    role: 2, // শুধুমাত্র বট অ্যাডমিন ব্যবহার করতে পারবে
    description: "বটের এডমিন মেম্বার ban/unban করতে পারবে",
    category: "admin",
    guide: {
      bn: `
╭───────────────╮
│ ✦ banmember [@tag|uid|reply] [কারণ]  
│   → মেম্বারকে ব্যান করবে
│
│ ✦ banmember unban [@tag|uid|reply]  
│   → ব্যান খুলে দেবে
│
│ ✦ banmember list  
│   → ব্যান লিস্ট দেখাবে
╰───────────────╯`
    }
  },

  onStart: async function ({ api, event, args, usersData, message }) {
    const { senderID, mentions, messageReply, threadID, messageID } = event;
    let banned = JSON.parse(fs.readFileSync(path, "utf8"));

    const getName = async id => {
      try {
        return (await usersData.getName(id)) || "Facebook User";
      } catch {
        return "Facebook User";
      }
    };

    // BAN LIST দেখা
    if (args[0] === "list") {
      if (!banned.length)
        return message.reply("📄 বর্তমানে কোনো ব্যানকৃত মেম্বার নেই।");

      let msg = "📋 ব্যান লিস্ট:\n";
      for (let i = 0; i < banned.length; i++) {
        const user = banned[i];
        msg += `${i + 1}. ${user.name} (UID: ${user.uid})\nকারণ: ${user.reason}\nসময়: ${user.time}\n\n`;
      }
      return message.reply(msg);
    }

    // UNBAN
    if (args[0] === "unban") {
      let target;
      if (Object.keys(mentions || {}).length) target = Object.keys(mentions)[0];
      else if (messageReply) target = messageReply.senderID;
      else if (!isNaN(args[1])) target = args[1];
      else return message.reply("⚠️ অনুগ্রহ করে যার ব্যান খুলতে চান তাকে মেনশন করুন বা UID দিন।");

      const index = banned.findIndex(u => u.uid === target);
      if (index === -1) return message.reply("❌ এই ইউজার ব্যানকৃত নয়।");

      const name = banned[index].name;
      banned.splice(index, 1);
      fs.writeFileSync(path, JSON.stringify(banned, null, 2));

      return message.reply(`✅ ${name} - এর ব্যান তুলে নেওয়া হয়েছে।`);
    }

    // BAN
    let target;
    if (Object.keys(mentions || {}).length) target = Object.keys(mentions)[0];
    else if (messageReply) target = messageReply.senderID;
    else if (!isNaN(args[0])) target = args[0];
    else return message.reply("⚠️ অনুগ্রহ করে যাকে ব্যান করতে চান তাকে মেনশন করুন বা UID দিন।");

    if (target === senderID)
      return message.reply("😅 নিজেকে ব্যান করতে চাও নাকি?");
    if (banned.find(u => u.uid === target))
      return message.reply("❌ এই সদস্য ইতিমধ্যেই ব্যানকৃত।");

    const reason = args.slice(1).join(" ") || "কোনো কারণ উল্লেখ করা হয়নি";
    const name = await getName(target);
    const time = new Date().toLocaleString("bn-BD", { timeZone: "Asia/Dhaka" });

    banned.push({ uid: target, name, reason, time });
    fs.writeFileSync(path, JSON.stringify(banned, null, 2));

    return message.reply(`🚫 ${name} - কে ব্যান করা হয়েছে!\nকারণ: ${reason}`);
  },

  // চাইলে নিচের অংশ ব্যবহার করে ব্যানকৃতদের সাথে বট কথা না বলবে
  onChat: async function ({ event }) {
    const banned = JSON.parse(fs.readFileSync(path, "utf8"));
    const isBanned = banned.some(u => u.uid === event.senderID);
    if (isBanned) return; // ব্যানকৃত মেম্বারের মেসেজে কোনো উত্তর দেবে না
  }
};
