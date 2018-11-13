const Discord = require('discord.js');

exports.run = (bot, message, args, tools) => {

  // Define user, if nobody is mentioned it will store author
  let user = message.author || message.mentions.roles.first() || message.guild.members.get(args[0]) || message.guild.members.find(member => member.name === args[0]);

  // Form Embed
  const embed = new Discord.RichEmbed()
    .setColor(0xffffff) // This will set the embed sidebar color
    .setTitle(user.username) // This will set the embed title
    .setImage(user.avatarURL) // This will set the embed image

  // Send Message
  message.channel.send(embed)

}
