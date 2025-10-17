const axios = require("axios");
const simsim = "https://simsimi.cyberbot.top";

module.exports = {
  config: {
    name: "baby",
    aliases: ["bby", "jan", "baby", "xan"],
    version: "1.0.5",
    author: "ULLASH | Converted by SaGor",
    countDown: 0,
    role: 0,
    shortDescription: "Cute AI Baby Chatbot 😺",
    longDescription: "Chat, teach, edit, and remove messages for a smart baby chatbot",
    category: "chat",
    guide: {
      en: "{pn} teach [question] - [reply]\n{pn} edit [question] - [oldReply] - [newReply]\n{pn} remove [question] - [reply]\n{pn} list"
    }
  },

  onStart: async function ({ api, event, args, usersData, threadsData }) {
    const uid = event.senderID;
    const senderName = await usersData.getName(uid);
    const query = args.join(" ").toLowerCase();

    try {
      if (!query) {
        const random = ["Bolo baby 💬", "হুম? বলো 😺"];
        const reply = random[Math.floor(Math.random() * random.length)];
        return api.sendMessage(reply, event.threadID, (err, info) => {
          if (!err)
            global.GoatBot.onReply.set(info.messageID, {
              commandName: module.exports.config.name,
              messageID: info.messageID,
              author: uid
            });
        });
      }

      const command = args[0]?.toLowerCase();

      if (["remove", "rm"].includes(command)) {
        const parts = query.replace(/^(remove|rm)\s*/i, "").split(" - ");
        if (parts.length < 2) return api.sendMessage("⚙️ Use: remove [Question] - [Reply]", event.threadID);
        const [ask, ans] = parts.map(p => p.trim());
        const res = await axios.get(`${simsim}/delete?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}`);
        return api.sendMessage(res.data.message, event.threadID);
      }

      if (command === "list") {
        const res = await axios.get(`${simsim}/list`);
        if (res.data.code === 200) {
          return api.sendMessage(
            `♾ Total Questions: ${res.data.totalQuestions}\n★ Total Replies: ${res.data.totalReplies}\n☠︎︎ Developer: ${res.data.author}`,
            event.threadID
          );
        }
        return api.sendMessage(`❌ ${res.data.message || "Failed to fetch list"}`, event.threadID);
      }

      if (command === "edit") {
        const parts = query.replace(/^edit\s*/i, "").split(" - ");
        if (parts.length < 3) return api.sendMessage("⚙️ Use: edit [Question] - [OldReply] - [NewReply]", event.threadID);
        const [ask, oldReply, newReply] = parts.map(p => p.trim());
        const res = await axios.get(`${simsim}/edit?ask=${encodeURIComponent(ask)}&old=${encodeURIComponent(oldReply)}&new=${encodeURIComponent(newReply)}`);
        return api.sendMessage(res.data.message, event.threadID);
      }

      if (command === "teach") {
        const parts = query.replace(/^teach\s*/i, "").split(" - ");
        if (parts.length < 2) return api.sendMessage("⚙️ Use: teach [Question] - [Reply]", event.threadID);
        const [ask, ans] = parts.map(p => p.trim());
        const threadInfo = await threadsData.get(event.threadID);
        const groupName = threadInfo?.threadName || "";
        const teachUrl = `${simsim}/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}&senderID=${uid}&senderName=${encodeURIComponent(senderName)}&groupID=${encodeURIComponent(event.threadID)}&groupName=${encodeURIComponent(groupName)}`;
        const res = await axios.get(teachUrl);
        return api.sendMessage(res.data.message || "✅ Reply added successfully!", event.threadID);
      }

      const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`);
      const replies = Array.isArray(res.data.response) ? res.data.response : [res.data.response];
      for (const reply of replies) {
        await new Promise(resolve => {
          api.sendMessage(reply, event.threadID, (err, info) => {
            if (!err)
              global.GoatBot.onReply.set(info.messageID, {
                commandName: module.exports.config.name,
                messageID: info.messageID,
                author: uid
              });
            resolve();
          });
        });
      }
    } catch (e) {
      console.error(e);
      return api.sendMessage(`❌ Error: ${e.message}`, event.threadID);
    }
  },

  onReply: async function ({ api, event, usersData, Reply }) {
    try {
      const senderName = await usersData.getName(event.senderID);
      const replyText = event.body?.toLowerCase();
      if (!replyText) return;
      const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(replyText)}&senderName=${encodeURIComponent(senderName)}`);
      const replies = Array.isArray(res.data.response) ? res.data.response : [res.data.response];
      for (const reply of replies) {
        await new Promise(resolve => {
          api.sendMessage(reply, event.threadID, (err, info) => {
            if (!err)
              global.GoatBot.onReply.set(info.messageID, {
                commandName: module.exports.config.name,
                messageID: info.messageID,
                author: event.senderID
              });
            resolve();
          });
        });
      }
    } catch (e) {
      console.error(e);
      return api.sendMessage(`❌ Error in reply: ${e.message}`, event.threadID);
    }
  },

  onChat: async function ({ api, event, usersData }) {
    try {
      const text = event.body?.toLowerCase()?.trim();
      if (!text) return;
      const senderName = await usersData.getName(event.senderID);
      const senderID = event.senderID;
      const triggers = ["baby", "Baby", "bby", "beby", "Beby", "জান", "বেবী", "বেবি"];
      const startsWithTrigger = triggers.some(t => text.startsWith(t + " "));
      const isTriggerWord = triggers.includes(text);

      if (isTriggerWord) {
        const reply = ["Bolo baby💬", "হুম? বলো😺"][Math.floor(Math.random() * 2)];
        return api.sendMessage(
          { body: `${reply} @${senderName}`, mentions: [{ tag: `@${senderName}`, id: senderID }] },
          event.threadID,
          (err, info) => {
            if (!err)
              global.GoatBot.onReply.set(info.messageID, {
                commandName: module.exports.config.name,
                messageID: info.messageID,
                author: event.senderID
              });
          }
        );
      }

      if (startsWithTrigger) {
        const query = text.replace(/^(baby|bot|bby|jan|xan|জান|বট|বেবি)\s+/i, "").trim();
        if (!query) return;
        const res = await axios.get(`${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}`);
        const replies = Array.isArray(res.data.response) ? res.data.response : [res.data.response];
        for (const reply of replies) {
          await new Promise(resolve => {
            api.sendMessage(reply, event.threadID, (err, info) => {
              if (!err)
                global.GoatBot.onReply.set(info.messageID, {
                  commandName: module.exports.config.name,
                  messageID: info.messageID,
                  author: event.senderID
                });
              resolve();
            });
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
};
