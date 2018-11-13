const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

  const embed = new Discord.RichEmbed()
    .setTitle('Патент')
    .setImage('https://cdn.discordapp.com/attachments/318463218563678209/460028693855600640/image.jpg')
  message.channel.send(embed)
}
