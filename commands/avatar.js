const Discord = require('discord.js');

exports.run = (bot, message, args, tools) => {

  // Define user, if nobody is mentioned it will store author
  let user = message.mentions.users.first() || message.author;

  // Form Embed
  const embed = new Discord.RichEmbed()
    .setColor(0xffffff) // This will set the embed sidebar color
    .setTitle(user.username) // This will set the embed title
    .setImage(user.avatarURL) // This will set the embed image

  // Send Message
  message.channel.send(embed)
}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["ava", "photo"],
  categories: ['General']
};

exports.help = {
  name: "avatar",
  description: "Show user avatar",
  usage: "avatar <user>"
};
