const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  if (!message.member.roles.has('470276314822213633')) return message.reply('У тебя нет роли `Офицер гильдии`');

  if (!args[0]) return message.reply('Используй `m^remove @user`');

  let gRole = message.guild.roles.find(`name`, 'Участник гильдий');
  if (!gRole) return message.reply("Роль не найдена.");

  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!rMember) return message.reply('упомяните пользователя / пользователь не найден!');


  if (!rMember.roles.has(gRole.id)) return message.reply("пользователь уже не учасник.");
  await (rMember.removeRole(gRole.id));

  try {
    await rMember.send(`Ты потерял(-а) ${gRole.name}`)
  } catch (e) {
    console.log(e.stack);
    message.channel.send(`<@${rMember.id}>, потерял(-а) ${gRole.name}.`)
  }
}
