const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermissions("MANAGE_MESSAGES")) return message.reply('You don\'t have premissions');

  let warnmember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!warnmember) return message.channel.send('Mention a user to warn');
  let reason = args.slice(1).join(" ");
  if (!reason) reason = 'No reason provided';

  message.delete().catch(O_o => {});
  message.channel.send(`**${warnmember.user.tag}** was warned!`);
  await warnmember.send(`You have been warned in ${message.guild.name} by ${message.author.tag} for: **${reason}.`)
}


exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  categories: ['mod commands']
};

exports.help = {
  name: "warn",
  description: "Warn command",
  usage: "warn <user>"
};
