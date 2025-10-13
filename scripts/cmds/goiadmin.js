module.exports = {
	config: {
		name: "goiadmin",
		author: "SaGor",
		role: 0,
		shortDescription: " ",
		longDescription: "",
		category: "BOT",
		guide: "{pn}"
	},

onChat: function({ api, event }) {
	if (event.senderID !== "100029990749091","61575791445818","61579261550244","100088836995808","61579730351939") {
		var aid = ["100029990749091","61575791445818","61579261550244","100088836995808","61579730351939"];
		for (const id of aid) {
		if ( Object.keys(event.mentions) == id) {
			var msg = ["আমার বস এখন ব্যস্ত আছে😇","বস গ্রুপে আসলে আপনার সাথে কথা বলবে 🫶🌸","বস লাইনে আসলে আপনার সাথে কথা বলবে🖤🍒","বস এখন ঘুমিয়ে আছে মেনশন দিলে ঘুমের ডিস্টার্ব হয় 😾"];
			return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
		}
		}}
},
onStart: async function({}) {
	}
};
