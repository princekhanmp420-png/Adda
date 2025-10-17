const axios = require("axios");
const apiUrl = "https://nix-baby-apis.vercel.app";

module.exports.config = {
  name: "baby",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "ArYAN",
  description: "",
  commandCategory: "BABY",
  usages: "[message/query]",
  cooldowns: 0,
  prefix: false
};

async function handleReplyMsg(api, event, text) {
  try {
    const res = await axios.get(`${apiUrl}/baby?text=${encodeURIComponent(text)}&senderID=${event.senderID}&font=1`);
    const rep = res?.data?.reply;
    if (rep) {
      api.sendMessage(rep, event.threadID, (err, info) => {
        if (!err) {
          global.client.handleReply.push({
            name: module.exports.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "baby"
          });
        }
      }, event.messageID);
    } else {
      api.sendMessage("❌ | No response found. Please teach me!", event.threadID, event.messageID);
    }
  } catch (e) {
    api.sendMessage("❌ | Failed to fetch reply.", event.threadID, event.messageID);
  }
}

module.exports.run = async function ({ api, event, args, Users }) {
  try {
    const uid = event.senderID;
    const senderName = await Users.getNameUser(uid);
    const query = args.join(" ").trim();

    if (!query) {
      const ran = ["᛫──⃜͢͢🍒͟͟͞͞๛⃝আ্ঁজ্ঁ এ্ঁক্ঁটা্ঁ বা্ঁবু্ঁর্ঁ আ্ঁম্মুঁ নে্ঁই্ঁ ব্ঁলে্ঁ≛⃝|🐸😇😫","🐰বৃষ্টি হলেই -🌧️একটা বউ এর অভাব Feel করি-!!👨🥺","তুমি আমার জান❤️🫣\nহাপানি রোগের টান🤧🥴\nআস্ত মুরগির রান🐤🍗\nবাংলা সিনেমার গান🎵🎶\nআমার জমির ধান🌾\nআই লাভ ইউ জান❤️😜","-Dear শশুর আব্বা.........🥰😌\nGive me your ছেরি....... 😚☺️\nI will give you ডর্জন খানিক নাতিপুতি 😁😁","༆⛄ আমাকে inbox করে 💥জিতে নাও ☺🙈\n😎কচি একটা bf ° ᭄⎝⎝⚒\n🐻!!-🐸!!-🐸","🦋_____ Dear প্রিয়-- 😍 ----তুমি কার আকাশে\nউড়ো______🌺😤😼\n🌸____ দোয়া করি ঐ আকাশে_____🙂💔 🌺____ ঠাডা পইরা মরো ______💔😼😤","—•—ঐ চাঁদ_ও হার মানে\n—তোমার রূপের কাছে 💝😘","°- বেডি মানুষ বড় ভেজাইল্লা🤧🔪°","রাগের মাথায় কেউ girlfriend-বিক্রি করলে জানাবেন🐸","আজকে গরিব দেইখা কোন মেয়ের উপর Crush খাইতে পারিনা.. 😭😭","-💬\nতুমি বাঁশ দিবা❞ \nআগে বললেই পারতা...❞\nআমি ট্রাক পাঠিয়ে দিতাম-🐸\n-💬","-ছোটবেলায় ভাবতাম বাসর ঘর🙄 -মানে বাঁশ দিয়ে তৈরি ঘর🏡🤣","-  i Wish, কোনো এক দুপুরে, তুমি আমি পাশাপাশি বসে, চাঁদ দেখবো.!🙂","কালো রং পছন্দ করা মানুষটাও..💚🥀.একদিন সাদা কাপড় পড়ে‒‘ঘুমাবে’..😥💔","😎༊༉’খাট ভাঙ্গার কথা দিয়া🙂\n ༆༉࿐ মন ভেঙ্গে চলে গেলি 🙂\n ༆༉࿐তোর যৌবনে  কুত্তা কামড় দিবো🌸🖤","•🐰🍒___একটা মন দাও, ছিনিমিনি খেলবো🥺😚👉👈🐸•","⎯⃝🌼-চরিত্র যতটা পবিত্র_ব্যক্তিত্ব ততটাই সুন্দর⎯͢♡🖤  ","—বেডী মানুষের মন অনেক বড়১৩২ জিবি র‍্যাম-|♡(🙂🤝🏻.)  ","একটা ভাঙা’চুরা 𝐠𝐟 চাই….! 🥺🫶 ","কখনও মেয়েদের সাথে ইনবক্সে কথা বলি নাই _!! 🙂🙂 ","যার মনে আমি নাই🍒তার মনে কুত্তায় মুইতা দিক..!!😏🐸🍒  ","জামাই ছাড়া👳এতিম মেয়ে গুলা কোথায়🍁তোমরা সারা দাও..!!🤭🥴  ","মা হিসাবে সব নারী”ই ‘সেরা.!-🩷🪽 ","^নক না দিলে আইডি খুলছস ক্যান°!😾ননসেন্স বেডি..!🥲🥀  ","-শূন্য বিকেলে পূর্ন তুমি!🥰-তোমার হাসিতে মুগ্ধ আমি.😇  ","-যারে দেহি তারেই ভাল্লাগে..!🙈-মনে হয় রুচি বাড়ছে..!😀😋  ","ভুলে যাও Ex কে নক দাও আমাকে 😌🌚  ","_.!একদিন সব হবে ইনশাআল্লাহ.!>3🩷✨🤍🫶🏼>3🥰💜🌻  ","_পাওয়ার চেয়ে ধরে রাখা কঠিন-//🩷🪽 ","আমায় বিয়া করবানি🤤🐰  ","-যেহেতু তুমি সিঙ্গেল তাই./🙂মানবতার খাতিরে 𝗜 𝗟𝗼𝘃𝗲 𝗬𝗼𝘂./🙂👀","অর্ধেক খাট, অর্ধেক কম্বলভাড়া দেওয়া হবে🙂  ","বিরক্তিকর পৃথিবী ছেড়ে মঙ্গলে যেতে চাই। ","__ মন মেজাজ ঠিক নাই I love You🥺🐸  ","_রিলেশনে’র বাজারে আমি এক 𝐒𝐢𝐧𝐠𝐥𝐞 শিশু😳😕  ","𝗜 𝗟𝗼𝘃𝗲 𝗬𝗼𝘂 😻🙈Ummmmma😘😘 ৬ তানি করলাম 🐸🤣  ","সবাই প্রেমে পড়ে🥰আর মুই স্বপ্নে খাট থেকে পড়ি🤧  ","••••🤤খাট ভাঙ্গার শব্দ কেমন🤤••• ","★মন ডা খালি বেডি বেডি করে_//🥺💔★🤪🤪🤪  ","(🤰)-এই বেডির সর্বনাশ কে করলো_🙂  ","_ক..আমি তোর🫵 কী লাগি!> 🔪 😡","জামাই ডাকো আইডি ঘুরে আসবো!🥺🫶  ","কি জিগাবি জিগা? সব মি’ছা কথা কমু!🙂 ","Unmarried আছি, knock দিতে পারো!😒  ","প্রপোজ করতে পারো, আমিও তোমাকে পছন্দ করি! 😒  ","দিন শেষে একটা বউ নাই! 🥺😔  ","oii আসো ঝগরা করি জিতলে তুমি আমার হারলে আমি তোমার  ","কিসের পড়ালেখা, মাথা নষ্ট; লাগা বিয়া 🥹  ","-ডাক্তার বলছে প্রেমের প্রস্তাব না পেলে আমি নাকি বাঁচবো না🥺","𝐈 𝐋𝐨𝐯𝐞 𝐘𝐨𝐮 ইগনোর করিস না তুই পড়ছোস মানে তোরেই বলছি!","আমারে যে পাবে তার প্রতিদিন ই বিজয় দিবস। 😌","মন যেখানে পরিষ্কার গোসল করা সেখানে বিলাসিতা।","একটা বান্ধবীও নাই যারে রেস্টুরেন্টে নিয়ে গিয়ে ভালো মন্দ খাওয়াবো!:)😔","যদি 𝙆𝙖𝙧𝙊 সাথে খারাপ আচরণ করে থাকি তাহলে ✃𝙞 𝙇𝙤𝙫𝙀 𝙮𝙤𝙐🥺","এক ভুল আমি ২বার করিনা। ৮/১০বার করি!","তেলাপোকার মতো GF লাগবে জুতার বাড়ি মারলেও যেন উড়ে এসে জরিয়ে ধরে!🙂","কালো মানুষ ছবিতেই সুন্দর 🥰☺️🤍","আমার বস সাগর তোমাকে ভালোবাসে 😇"];
      const r = ran[Math.floor(Math.random() * ran.length)];
      return api.sendMessage(`${senderName}, ${r}`, event.threadID, (err, info) => {
        if (!err) {
          global.client.handleReply.push({
            name: module.exports.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "baby"
          });
        }
      }, event.messageID);
    }

    if (args[0] === "remove") {
      const key = query.slice(7).trim();
      const res = await axios.get(`${apiUrl}/baby-remove?key=${encodeURIComponent(key)}`);
      return api.sendMessage(res.data.message || "Removed", event.threadID, event.messageID);
    }

    if (args[0] === "rm" && query.includes("-")) {
      const [key, repOrIdx] = query.slice(3).split(/\s*-\s*/);
      if (!key || repOrIdx === undefined) {
        return api.sendMessage("❌ | Use: rm [msg] - [reply/index]", event.threadID, event.messageID);
      }
      const param = !isNaN(parseInt(repOrIdx)) ? `index=${encodeURIComponent(repOrIdx)}` : `reply=${encodeURIComponent(repOrIdx)}`;
      const res = await axios.get(`${apiUrl}/baby-remove?key=${encodeURIComponent(key)}&${param}`);
      return api.sendMessage(res.data.message || "Removed", event.threadID, event.messageID);
    }

    if (args[0] === "list") {
      if (args[1] === "all") {
        const tRes = await axios.get(`${apiUrl}/teachers`);
        const teachers = tRes.data.teachers || {};
        const sorted = Object.keys(teachers).sort((a, b) => teachers[b] - teachers[a]);
        const list = await Promise.all(sorted.map(async id => {
          const name = await Users.getNameUser(id).catch(() => id);
          return `• ${name}: ${teachers[id]}`;
        }));
        return api.sendMessage(`👑 | Teachers:\n${list.join("\n")}`, event.threadID, event.messageID);
      } else {
        const infoRes = await axios.get(`${apiUrl}/baby-info`);
        return api.sendMessage(
          `❇️ | Total Teach = ${infoRes.data.totalKeys || "api off"}\n♻️ | Total Response = ${infoRes.data.totalReplies || "api off"}`,
          event.threadID,
          event.messageID
        );
      }
    }

    if (args[0] === "edit") {
      const parts = query.split(/\s*-\s*/);
      if (parts.length < 2) {
        return api.sendMessage("❌ | Use: edit [msg] - [newReply]", event.threadID, event.messageID);
      }
      const oldMsg = parts[0].replace("edit ", "");
      const newMsg = parts[1];
      const res = await axios.get(`${apiUrl}/baby-edit?key=${encodeURIComponent(oldMsg)}&replace=${encodeURIComponent(newMsg)}&senderID=${uid}`);
      return api.sendMessage(res.data.message || "Edited", event.threadID, event.messageID);
    }

    if (args[0] === "teach" && args[1] === "react") {
      const [comd, cmd] = query.split(/\s*-\s*/);
      const final = comd.replace("teach react ", "");
      if (!cmd) {
        return api.sendMessage("❌ | Invalid format!", event.threadID, event.messageID);
      }
      const res = await axios.get(`${apiUrl}/baby?teach=${encodeURIComponent(final)}&react=${encodeURIComponent(cmd)}`);
      return api.sendMessage(`✅ Replies added ${res.data.message}`, event.threadID, event.messageID);
    }

    if (args[0] === "teach") {
      const [comd, cmd] = query.split(/\s*-\s*/);
      const final = comd.replace("teach ", "");
      if (!cmd) {
        return api.sendMessage("❌ | Invalid format!", event.threadID, event.messageID);
      }
      const res = await axios.get(`${apiUrl}/baby?teach=${encodeURIComponent(final)}&reply=${encodeURIComponent(cmd)}&senderID=${uid}`);
      const teacher = await Users.getNameUser(uid).catch(() => uid);
      if (res.data.message === "This reply has already been taught for this question." || res.data.addedReplies?.length === 0) {
        return api.sendMessage(`❌ | This reply has already been taught.\nTeacher: ${teacher}\nReply: ${cmd}`, event.threadID, event.messageID);
      }
      const teachsRes = await axios.get(`${apiUrl}/teachers`);
      const teachCount = teachsRes.data.teachers[uid] || 0;
      const addedReplies = res.data.addedReplies?.join(", ") || cmd;
      return api.sendMessage(`✅ | Replies added "${addedReplies}" to "${final}".\nTeacher: ${teacher}\nTeachs: ${teachCount}`, event.threadID, event.messageID);
    }

    handleReplyMsg(api, event, query);
  } catch (err) {
    return api.sendMessage(`❌ | Error in baby command: ${err.message}`, event.threadID, event.messageID);
  }
};

module.exports.handleReply = async function ({ api, event }) {
  if (!event.body) return;
  handleReplyMsg(api, event, event.body.toLowerCase());
};

module.exports.handleEvent = async function ({ api, event, Users }) {
  try {
    if (!event.body) return;
    const raw = event.body.toLowerCase().trim();
    const senderName = await Users.getNameUser(event.senderID);
    const senderID = event.senderID;
    const match = raw.match(/^(baby|bby|bot|বট|বেবি|সাগর|sagor|বেবী|bbz)\s*(.*)/);
    if (!match) return;
    const rest = match[2]?.trim();
    if (!rest) {
      const replies = ["᛫──⃜͢͢🍒͟͟͞͞๛⃝আ্ঁজ্ঁ এ্ঁক্ঁটা্ঁ বা্ঁবু্ঁর্ঁ আ্ঁম্মুঁ নে্ঁই্ঁ ব্ঁলে্ঁ≛⃝|🐸😇😫","🐰বৃষ্টি হলেই -🌧️একটা বউ এর অভাব Feel করি-!!👨🥺","তুমি আমার জান❤️🫣\nহাপানি রোগের টান🤧🥴\nআস্ত মুরগির রান🐤🍗\nবাংলা সিনেমার গান🎵🎶\nআমার জমির ধান🌾\nআই লাভ ইউ জান❤️😜","-Dear শশুর আব্বা.........🥰😌\nGive me your ছেরি....... 😚☺️\nI will give you ডর্জন খানিক নাতিপুতি 😁😁","༆⛄ আমাকে inbox করে 💥জিতে নাও ☺🙈\n😎কচি একটা bf ° ᭄⎝⎝⚒\n🐻!!-🐸!!-🐸","🦋_____ Dear প্রিয়-- 😍 ----তুমি কার আকাশে\nউড়ো______🌺😤😼\n🌸____ দোয়া করি ঐ আকাশে_____🙂💔 🌺____ ঠাডা পইরা মরো ______💔😼😤","—•—ঐ চাঁদ_ও হার মানে\n—তোমার রূপের কাছে 💝😘","°- বেডি মানুষ বড় ভেজাইল্লা🤧🔪°","রাগের মাথায় কেউ girlfriend-বিক্রি করলে জানাবেন🐸","আজকে গরিব দেইখা কোন মেয়ের উপর Crush খাইতে পারিনা.. 😭😭","-💬\nতুমি বাঁশ দিবা❞ \nআগে বললেই পারতা...❞\nআমি ট্রাক পাঠিয়ে দিতাম-🐸\n-💬","-ছোটবেলায় ভাবতাম বাসর ঘর🙄 -মানে বাঁশ দিয়ে তৈরি ঘর🏡🤣","-  i Wish, কোনো এক দুপুরে, তুমি আমি পাশাপাশি বসে, চাঁদ দেখবো.!🙂","কালো রং পছন্দ করা মানুষটাও..💚🥀.একদিন সাদা কাপড় পড়ে‒‘ঘুমাবে’..😥💔","😎༊༉’খাট ভাঙ্গার কথা দিয়া🙂\n ༆༉࿐ মন ভেঙ্গে চলে গেলি 🙂\n ༆༉࿐তোর যৌবনে  কুত্তা কামড় দিবো🌸🖤","•🐰🍒___একটা মন দাও, ছিনিমিনি খেলবো🥺😚👉👈🐸•","⎯⃝🌼-চরিত্র যতটা পবিত্র_ব্যক্তিত্ব ততটাই সুন্দর⎯͢♡🖤  ","—বেডী মানুষের মন অনেক বড়১৩২ জিবি র‍্যাম-|♡(🙂🤝🏻.)  ","একটা ভাঙা’চুরা 𝐠𝐟 চাই….! 🥺🫶 ","কখনও মেয়েদের সাথে ইনবক্সে কথা বলি নাই _!! 🙂🙂 ","যার মনে আমি নাই🍒তার মনে কুত্তায় মুইতা দিক..!!😏🐸🍒  ","জামাই ছাড়া👳এতিম মেয়ে গুলা কোথায়🍁তোমরা সারা দাও..!!🤭🥴  ","মা হিসাবে সব নারী”ই ‘সেরা.!-🩷🪽 ","^নক না দিলে আইডি খুলছস ক্যান°!😾ননসেন্স বেডি..!🥲🥀  ","-শূন্য বিকেলে পূর্ন তুমি!🥰-তোমার হাসিতে মুগ্ধ আমি.😇  ","-যারে দেহি তারেই ভাল্লাগে..!🙈-মনে হয় রুচি বাড়ছে..!😀😋  ","ভুলে যাও Ex কে নক দাও আমাকে 😌🌚  ","_.!একদিন সব হবে ইনশাআল্লাহ.!>3🩷✨🤍🫶🏼>3🥰💜🌻  ","_পাওয়ার চেয়ে ধরে রাখা কঠিন-//🩷🪽 ","আমায় বিয়া করবানি🤤🐰  ","-যেহেতু তুমি সিঙ্গেল তাই./🙂মানবতার খাতিরে 𝗜 𝗟𝗼𝘃𝗲 𝗬𝗼𝘂./🙂👀","অর্ধেক খাট, অর্ধেক কম্বলভাড়া দেওয়া হবে🙂  ","বিরক্তিকর পৃথিবী ছেড়ে মঙ্গলে যেতে চাই। ","__ মন মেজাজ ঠিক নাই I love You🥺🐸  ","_রিলেশনে’র বাজারে আমি এক 𝐒𝐢𝐧𝐠𝐥𝐞 শিশু😳😕  ","𝗜 𝗟𝗼𝘃𝗲 𝗬𝗼𝘂 😻🙈Ummmmma😘😘 ৬ তানি করলাম 🐸🤣  ","সবাই প্রেমে পড়ে🥰আর মুই স্বপ্নে খাট থেকে পড়ি🤧  ","••••🤤খাট ভাঙ্গার শব্দ কেমন🤤••• ","★মন ডা খালি বেডি বেডি করে_//🥺💔★🤪🤪🤪  ","(🤰)-এই বেডির সর্বনাশ কে করলো_🙂  ","_ক..আমি তোর🫵 কী লাগি!> 🔪 😡","জামাই ডাকো আইডি ঘুরে আসবো!🥺🫶  ","কি জিগাবি জিগা? সব মি’ছা কথা কমু!🙂 ","Unmarried আছি, knock দিতে পারো!😒  ","প্রপোজ করতে পারো, আমিও তোমাকে পছন্দ করি! 😒  ","দিন শেষে একটা বউ নাই! 🥺😔  ","oii আসো ঝগরা করি জিতলে তুমি আমার হারলে আমি তোমার  ","কিসের পড়ালেখা, মাথা নষ্ট; লাগা বিয়া 🥹  ","-ডাক্তার বলছে প্রেমের প্রস্তাব না পেলে আমি নাকি বাঁচবো না🥺","𝐈 𝐋𝐨𝐯𝐞 𝐘𝐨𝐮 ইগনোর করিস না তুই পড়ছোস মানে তোরেই বলছি!","আমারে যে পাবে তার প্রতিদিন ই বিজয় দিবস। 😌","মন যেখানে পরিষ্কার গোসল করা সেখানে বিলাসিতা।","একটা বান্ধবীও নাই যারে রেস্টুরেন্টে নিয়ে গিয়ে ভালো মন্দ খাওয়াবো!:)😔","যদি 𝙆𝙖𝙧𝙊 সাথে খারাপ আচরণ করে থাকি তাহলে ✃𝙞 𝙇𝙤𝙫𝙀 𝙮𝙤𝙐🥺","এক ভুল আমি ২বার করিনা। ৮/১০বার করি!","তেলাপোকার মতো GF লাগবে জুতার বাড়ি মারলেও যেন উড়ে এসে জরিয়ে ধরে!🙂","কালো মানুষ ছবিতেই সুন্দর 🥰☺️🤍","আমার বস সাগর তোমাকে ভালোবাসে 😇"];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      return api.sendMessage({
        body: `${randomReply} @${senderName}`,
        mentions: [{ tag: `@${senderName}`, id: senderID }]
      }, event.threadID, (err, info) => {
        if (!err) {
          global.client.handleReply.push({
            name: module.exports.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "baby"
          });
        }
      }, event.messageID);
    }
    handleReplyMsg(api, event, rest);
  } catch (err) {
    return api.sendMessage(`❌ | Error in handleEvent: ${err.message}`, event.threadID, event.messageID);
  }

};
