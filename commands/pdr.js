const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const ebalo = 'https://images-ext-1.discordapp.net/external/xhB8bKSfZBM08ogdqlnxl6_b4z8-SW8Na7x4YoEn_qI/https/image.prntscr.com/image/S8-LTpTdR-OHVQnvaBJ42A.png?width=485&height=499'
  message.delete();
  const Embed = new Discord.RichEmbed()
  .setImage(ebalo)
  .setFooter(`Тоби пэзда, ${message.author.tag}`, `${message.author.avatarURL}`)
  .setColor("#5DDAEE");
  message.channel.send(Embed)
}
