const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.delete();

  const update = 'http://chittagongit.com/images/view-icon-png/view-icon-png-29.jpg';
  const owner = "funlennysub#0101";
  const owneravatar = "https://images-ext-1.discordapp.net/external/RPoA7iWJhio1_rFWAI6XyAhsqJ_xiep8bQ25gXQuU2s/%3Fsize%3D128/https/cdn.discordapp.com/avatars/295468625240915968/a_ab156cbe5ff195d2d583284ef16e64e2.gif";


  const Embed = new Discord.RichEmbed()
  .setThumbnail(update)
  .addField("Добавленны команды:", `
  • **.updates**, которая показывает обновления бота;
  • **.мур**, которая отправит вам веселого кота;
  • **.death**, фановая команда, не имеет смысла;`)
  .addField("Изменения команд:", `
  • Внесены измененияв в команду **.мур**;
  • Изменено название команды **.updates**, теперь она **.changelogs**`)
  .addField("Удалены команды:", `
  • **.dog**`)
  .setTimestamp(new Date())
  .setFooter(`Создатель бота: ${owner}`, `${owneravatar}`)
  .setColor("#5DDAEE");
  message.channel.send(Embed)
}
