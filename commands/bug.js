const Discord = require('discord.js');

module.exports.run = async (bot, message, args, tools, ops) => {

  let rreason = args.join(" ").slice(0);
  if(!rreason) return message.channel.send('Describe the bug');


  const embed = new Discord.RichEmbed()
  .setTitle('Bug report')
  .setDescription(rreason)
  .addField('Reported By', message.author.tag)
  .addField('Server', message.guild.name)

  bot.guilds.get('504005061186420757').channels.get('505455065943900193').send(embed);
}
