const Discord = require('discord.js');
const moment = require('moment');

module.exports.run = async (bot, message, args, tools, ops) => {


  let ver = {
    true: 'Yes',
    false: 'No'
  };


  if (!args[0]) {
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
    return;
  };


  if (args[0]) {

    let guil = bot.guilds.get(args[0])
    const embed1 = new Discord.RichEmbed()
      .setThumbnail(guil.iconURL)
      .addField('Owner', guil.owner)
      .addField('Server Created', `${moment.parseZone(guil.createdAt).locale('en').format('dddd, L, HH:mm')}`)
      .addField('Members', `${guil.memberCount} members
    ឵ ឵឵ ឵${guil.members.filter(m=> m.presence.status == 'online').size} online
    ឵ ឵឵ ឵឵ ឵ ឵${guil.members.filter(m => m.user.bot).size} bots`)
      .addField('Verified', ver[guil.verified])
      .addField('Total Roles', guil.roles.size)
      .addField('Total Channels', `
    ${guil.channels.size} total channels:
    ឵ ឵឵ ${guil.channels.filter(c => c.type === "category").size} categories
    ឵ ឵឵ ឵឵ ឵ ${guil.channels.filter(c => c.type === "text").size} text, ${guil.channels.filter(c => c.type === "voice").size} voice`)
    message.channel.send(embed1);
    return;
  }


}
