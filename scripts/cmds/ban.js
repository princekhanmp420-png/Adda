const fs = require("fs");
const path = __dirname + "/banned_members.json";

// banned list ফাইল না থাকলে তৈরি করো
if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify([]));

module.exports = {
  config: {
    name: "ban_member",
    version: "1.0.0",
    author: "SaGor x GPT-5",
    role: 2, // শুধুমাত্র বট অ্যাডমিন ব্যবহার করতে পারবে
    description: "এডমিন যাকে ব্যান করবে, বট আর তার সাথে কথা বলবে না",
    category: "admin",
    guide: {
      bn: `
╭───────────────╮
│ ✦ ban_member [@tag|uid|reply] [কারণ]
│   → মেম্বারকে ব্যান করবে (বট আর কথা বলবে না)
│
│ ✦ ban_member unban [@tag|uid|reply]
│   → ব্যান খুলে দেবে
│
│ ✦ ban_member list
│   → ব্যান লিস্ট দেখাবে
╰───────────────╯`
    }
  },

  // 🟥 BAN / UNBAN / LIST কমান্ড
  onStart: async function ({ api, event, args, usersData, message }) {
    const { mentions, messageReply } = event;
    let banned = JSON.parse(fs.readFileSync(path, "utf8"));

    const getName = async id => {
      try {
        return (await usersData.getName(id)) || "Facebook User";
      } catch {
        return "Facebook User";
      }
    };

    // BAN লিস্ট দেখা
    if (args[0] === "list") {
      if (!banned.length)
        return message.reply("📄 বর্তমানে কোনো ব্যানকৃত মেম্বার নেই।");

      let msg = "📋 ব্যানকৃত মেম্বার লিস্ট:\n";
      for (let i = 0; i < banned.length; i++) {
        const user = banned[i];
        msg += `${i + 1}. ${user.name} (UID: ${user.uid})\nকারণ: ${user.reason}\nসময়: ${user.time}\n\n`;
      }
      return message.reply(msg);
    }

    // 🟩 UNBAN
    if (args[0] === "unban") {
      let target;
      if (Object.keys(mentions || {}).length) target = Object.keys(mentions)[0];
      else if (messageReply) target = messageReply.senderID;
      else if (!isNaN(args[1])) target = args[1];
      else return message.reply("⚠️ যাকে আনব্যান করতে চান তাকে মেনশন করুন বা UID দিন।");

      const index = banned.findIndex(u => u.uid === target);
      if (index === -1) return message.reply("❌ এই ইউজার ব্যানকৃত নয়।");

      const name = banned[index].name;
      banned.splice(index, 1);
      fs.writeFileSync(path, JSON.stringify(banned, null, 2));
      return message.reply(`✅ ${name} - এর ব্যান তুলে নেওয়া হয়েছে।`);
    }

    // 🟥 BAN
    let target;
    if (Object.keys(mentions || {}).length) target = Object.keys(mentions)[0];
    else if (messageReply) target = messageReply.senderID;
    else if (!isNaN(args[0])) target = args[0];
    else return message.reply("⚠️ যাকে ব্যান করতে চান তাকে মেনশন করুন বা UID দিন।");

    if (banned.find(u => u.uid === target))
      return message.reply("❌ এই সদস্য ইতিমধ্যেই ব্যানকৃত।");

    const reason = args.slice(1).join(" ") || "কারণ উল্লেখ করা হয়নি";
    const name = await getName(target);
    const time = new Date().toLocaleString("bn-BD", { timeZone: "Asia/Dhaka" });

    banned.push({ uid: target, name, reason, time });
    fs.writeFileSync(path, JSON.stringify(banned, null, 2));

    return message.reply(`🚫 ${name} - কে ব্যান করা হয়েছে!\nকারণ: ${reason}`);
  },

  // 🚫 বট ব্যানকৃত মেম্বারের সাথে আর কথা বলবে না
  onChat: async function ({ event }) {
    try {
      const banned = JSON.parse(fs.readFileSync(path, "utf8"));
      const isBanned = banned.some(u => u.uid === event.senderID);
      if (isBanned) return; // ❌ কোনো রিপ্লাই দিবে না
    } catch (err) {
      console.error("ban_member onChat error:", err);
    }
  }
};
