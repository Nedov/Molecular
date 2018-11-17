const Discord = require("discord.js");

module.exports.run = async (bot, message, args, prefix) => {

  let gay = Math.round(Math.random() * 100);

  let gayembed = new Discord.RichEmbed()
    .setColor("#f442d4")
    .setTitle(`:gay_pride_flag: **I think ${message.author.username} is ${gay}% gay!** :gay_pride_flag:`);
  return message.channel.send(gayembed);
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  categories: ['Fun']
};

exports.help = {
  name: "gay",
  description: "Gay command",
  usage: "gay"
};
