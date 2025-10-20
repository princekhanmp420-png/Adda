module.exports = {
  config: {
    name: "princevideo",
    aliases: ["prince", "boss", "sir"],
    version: "1.0",
    author: "SaGor",
    countDown: 0,
    role: 0,
    shortDescription: "get anime video",
    longDescription: "get random anime video",
    category: "anime",
    guide: "{pn} animevdo",
  },

  sentVideos: [],

  onStart: async function ({ api, event, message }) {
    const senderID = event.senderID;

    const loadingMessage = await message.reply({
      body: "Loading random anime video... Please wait! 🕐",
    });

    const link = [
      "https://drive.google.com/file/d/1GniqfzpbWjfXMxn8611aGn9xs400rotQ/view?usp=drivesdk",
      "https://drive.google.com/file/d/1_OoujeLp0f99z75MQkx9pdJLi9nTihU3/view?usp=drivesdk"// video credits xenoz (youtube)
  
      // Add more video links here
    ];

    const availableVideos = link.filter(video => !this.sentVideos.includes(video));

    if (availableVideos.length === 0) {
      this.sentVideos = [];
    }

    const randomIndex = Math.floor(Math.random() * availableVideos.length);
    const randomVideo = availableVideos[randomIndex];

    this.sentVideos.push(randomVideo);

    if (senderID !== null) {
      message.reply({
        body: 'ENJOY..🤍',
        attachment: await global.utils.getStreamFromURL(randomVideo),
      });

      setTimeout(() => {
        api.unsendMessage(loadingMessage.messageID);
      }, 5000);
    }
  },
};
