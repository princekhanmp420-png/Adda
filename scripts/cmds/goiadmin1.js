module.exports = {
	config: {
		name: "goiadmin1",
		version: "1.0",
		author: "SaGor",
		role: 0,
		shortDescription: "অ্যাডমিন মেনশন রেপ্লাই v2",
		longDescription: "যখন কেউ নির্দিষ্ট অ্যাডমিনদের মেনশন করবে, বট প্রত্যেক অ্যাডমিনের জন্য আলাদা মেসেজ পাঠাবে।",
		category: "bot",
		guide: "{pn}"
	},

	onChat: async function({ api, event }) {
		// 🧠 প্রতিটি অ্যাডমিনের আইডি ও তাদের আলাদা মেসেজ
		const adminReplies = {
			"61560964919057": [
				"👑 ম্যাডাম একটু ব্যস্ত আছে গ্রুপে আসলে আপনার সাথে কথা বলবে🌸",
				"অপেক্ষা করেন ম্যাডাম গ্রুপে আসলে আপনার মেসেজের রিপ্লাই দিবে!",
				"ম্যাডাম একটু ব্যস্ত আছে"
			],
			"61575791445818": [
				"স্যার এখন ব্যস্ত আছে",
				"স্যার লাইনে আসলে কথা বলবে",
				"একটু অপেক্ষা করুন স্যার এখনই চলে আসবে"
			],
			"61579261550244": [
				"আপনার কি সমস্যা আমাকে বলতে পারেন",
				"সারাদিন ঘুমাচ্ছে",
				"বলেন কি করতে পারি আপনার জন্য সারা লাইনে নাই"
			],
			"100088836995808": [
				"একটু পরে কথা বলব",
				"স্যার একটু পর আসবে 🫶",
				"স্যার এখন ব্যস্ত আছে 😇"
			]
		};

		const adminIDs = Object.keys(adminReplies);

		// যদি অ্যাডমিন নিজে লেখে, কিছু করবে না
		if (adminIDs.includes(event.senderID)) return;

		// মেনশন করা আইডি গুলো চেক করো
		const mentionedIDs = Object.keys(event.mentions || {});
		if (mentionedIDs.length === 0) return;

		for (const id of mentionedIDs) {
			if (adminReplies[id]) {
				const msgList = adminReplies[id];
				const randomMsg = msgList[Math.floor(Math.random() * msgList.length)];

				// 🎯 মেনশন করা নাম ট্যাগ করে রিপ্লাই পাঠানো
				api.sendMessage({
					body: randomMsg,
					mentions: [{
						tag: event.mentions[id],
						id: id
					}]
				}, event.threadID, event.messageID);
			}
		}
	},

	onStart: async function() {}
};
