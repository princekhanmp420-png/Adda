const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "aniblur",
    aliases: ["animeblur"],
    version: "1.0",
    author: "SaGor",
    countDown: 0,
    role: 0,
    shortDescription: "",
    longDescription: {
      en: ".",
    },
    category: "fun",
    guide: {
      en: "{prefix} <animeblur>",
    },
  },

  onStart: async function ({ api, event }) {
    const link = [
      "https://i.postimg.cc/QdzSzcM1/image.jpg",
    ];

    const randomIndex = Math.floor(Math.random() * link.length);
    const imageUrl = link[randomIndex];
    const filePath = __dirname + `/cache/${randomIndex}.jpg`;

    const response = await axios.get(imageUrl, { responseType: "stream" });
    response.data.pipe(fs.createWriteStream(filePath));
    response.data.on("end", () => {
      api.sendMessage(
        {
          body: "「 Here is your aniblur avatar 🥰 」",
          attachment: fs.createReadStream(filePath),
        },
        event.threadID,
        () => fs.unlinkSync(filePath)
      );
    });
  },
};
