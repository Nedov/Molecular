const Discord = require('discord.js');

module.exports.run = async (bot, message, args = []) => {
  if (!message.member.roles.has('470276314822213633')) return message.reply('У тебя нет роли `Офицер гильдии`');

  if (!args[0]) return message.reply('Используй `m^add @user`');

  let gRole = message.guild.roles.find(r => r.name === 'Участник гильдий');
    if (!gRole) return message.reply("Роль не найдена.");

  let hRole = message.guild.roles.find(r => r.id === "527080559541747712");
  if (!hRole) return message.reply("Роль не найдена.");

  let nRole = message.guild.roles.find(r => r.id === "527080032586432513");
  if (!nRole) return message.reply("Роль не найдена.");

  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!rMember) return message.reply('упомяните пользователя / пользователь не найден!');
  if(args[1] === "hypixel") {
    rMember.addRole(hRole.id)
  } else if(args[1] === "nx") {
  rMember.addRole(nRole.id)
  }
  if(!args[1]) return message.channel.send("Укажите какую роль: `Hypixel` - hypixel; `NeruxVace` - nx");

  if (rMember.roles.has(hRole.id)) return message.reply("пользователь уже учасник гильдии на Хайпикселе.");
    if (rMember.roles.has(hRole.id)) return message.reply("пользователь уже учасник гильдии на НеруксВейсе.");
  await (rMember.addRole(gRole.id));

  try {
    await rMember.send(`Ты получил(-а) ${gRole.name}`)
  } catch (e) {
    console.log(e.stack);
    message.channel.send(`<@${rMember.id}>, получил(-а) ${gRole.name}.`)
  }
}

exports.conf = {
  enabled: false, // not used yet
  guildOnly: true, // not used yet
  aliases: [],
  categories: ['ML 2.0']
};

exports.help = {
  name: "add",
  description: "Дает участнику роль `Участник гильдии`(ТОЛЬКО ДЛЯ МЛ 2.0)",
  usage: "add <user>"
};
