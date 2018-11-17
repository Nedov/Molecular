const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const useruser = "Command Ran By: " + message.author.username;
  const userurl = message.author.avatarURL;
  let botembed = new Discord.RichEmbed()
    .setColor("#000FF")
    .setDescription(`Loading...`)
    .setTimestamp()
  message.channel.send(botembed).then(message => {
    botembed.setColor("#000FF")
    botembed.setDescription(`:ping_pong: Pong! **\`${bot.pings[0]}ms\`**`)
    botembed.setFooter(useruser, userurl)
    botembed.setTimestamp()
    message.edit(botembed)
  })

}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["p", "pong"],
  categories: ['General']
};

exports.help = {
  name: "ping",
  description: "Ping command",
  usage: "ping"
};
