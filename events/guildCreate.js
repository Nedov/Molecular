const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (bot, guild) => {

  const ver = {
    true: 'yes',
    false: 'nope'
  }

  let channels = guild.channels.filter(channel => channel.type === 'text' && channel.permissionsFor(guild.members.get(bot.user.id)).has('SEND_MESSAGES'));
  if (channels.size > 0) channels.first().createInvite({
    temporary: true,
    maxAge: 0,
    maxUses: 0,
    unique: true,
  }, 'request for invite').then(inv => {
    const embed = new Discord.RichEmbed()
      .setTitle('Invite Logs')
      .setThumbnail(guild.iconURL)
      .addField('Owner', guild.owner)
      .addField('Server Created', `${moment.parseZone(guild.createdAt).locale('en').format('dddd, L, HH:mm')}`)
      .addField('Members', `${guild.memberCount} members
    ឵ ឵឵ ឵${guild.members.filter(m=> m.presence.status == 'online').size} online
    ឵ ឵឵ ឵឵ ឵ ឵${guild.members.filter(m => m.user.bot).size} bots`)
      .addField('Verified', ver[guild.verified])
      .addField('Total Roles', guild.roles.size)
      .addField('Total Channels', `
    ${guild.channels.size} total channels:
    ឵ ឵឵ ${guild.channels.filter(c => c.type === "category").size} categories
    ឵ ឵឵ ឵឵ ឵ ${guild.channels.filter(c => c.type === "text").size} text, ${guild.channels.filter(c => c.type === "voice").size} voice`)
      .addField('Server Invite', `[Invite](https://discord.gg/${inv.code})`)
    bot.channels.get('508742431223578624').send(embed)
  })

}
