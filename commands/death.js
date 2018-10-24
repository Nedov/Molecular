const Discord = require('discord.js')

exports.run = async (bot, message, args) => {

  const cat = 'https://i.pinimg.com/originals/1f/e3/00/1fe300ee7f2806fe1fafdc5d21261a6f.jpg'

  const Embed = new Discord.RichEmbed()
  .setTitle("Suicide")
  .setImage('http://www.stihi.ru/pics/2013/03/20/9495.jpg')
  .setColor("#A0F170")
  .setFooter(`${message.author.tag} suicided`, `${message.author.avatarURL}`);
  message.channel.send(Embed);

}
