const Discord = require('discord.js');
const moment = require('moment');

module.exports.run = async (bot, message, args, tools, ops) => {


  let ver = {
    true: 'Yes',
    false: 'No'
  };

  const embed = new Discord.RichEmbed()
  .setThumbnail(message.guild.iconURL)
  .addField('Owner', message.guild.owner)
  .addField('Server Created', `${moment.parseZone(message.guild.createdAt).locale('en').format('dddd, L, HH:mm')}`)
  .addField('Members', `${message.guild.memberCount} members
  ឵ ឵឵ ឵${message.guild.members.filter(m=> m.presence.status == 'online').size} online
  ឵ ឵឵ ឵឵ ឵ ឵${message.guild.members.filter(m => m.user.bot).size} bots`)
  .addField('Verified', ver[message.guild.verified])
  .addField('Total Roles', message.guild.roles.size)
  .addField('Total Channels', `
  ${message.guild.channels.size} total channels:
  ឵ ឵឵ ${message.guild.channels.filter(c => c.type === "category").size} categories
  ឵ ឵឵ ឵឵ ឵ ${message.guild.channels.filter(c => c.type === "text").size} text, ${message.guild.channels.filter(c => c.type === "voice").size} voice`)
  message.channel.send(embed);

}
