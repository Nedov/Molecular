const Discord = require('discord.js');

module.exports.run = async (bot, message, args, tools) => {

  let rreason = args.join(" ").slice(0);
  if (!rreason) return message.channel.send('Опишите желаемый функционал бота');


  const embed = new Discord.RichEmbed()
    .setTitle('Новый заказ')
    .setDescription(`Желаемый функционал: ${rreason}`)
    .addField('Заказал', message.author.tag)
    .addField('Сервер', message.guild.name)

  bot.guilds.get('504005061186420757').channels.get('508738099673825311').send(embed);
}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: true, // not used yet
  aliases: [],
  categories: ['ML 2.0']
};

exports.help = {
  name: "bot",
  description: "new bot command",
  usage: "bot <text>"
};
