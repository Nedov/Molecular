const Discord = require('discord.js'); // I'm requiring discord.js since we will be using Embeds.

module.exports.run = (bot, message, args, tools) => {

  spam_times = 0;
      if (message.content.split(" ")[2]) {
        spam_times = message.content.split(" ")[2];
      }
      if (message.content.split(" ")[1]) {
        spam_channel = message.content.split(" ")[1];
        if (spam_channel == "here") {
          spam_channel = message.channel.id;
        }
      }
      if (spam_times > 0 && spam_channel && message.content.split(" ")[3]) {
        var msg = message.content.split(" ");
        msg.splice(0, 3);
        msg = msg.join(" ");
        for (var i = 0; i < spam_times; i++) {
          client.channels.get(spam_channel).send(msg);
        }
      }

}

// ⏪⏩
// Now, we can test it. Make sure you add some pages though.
