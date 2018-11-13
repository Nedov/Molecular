const Discord = require('discord.js');
const moment = require("moment");

module.exports.run = async (bot, message, args, ops) => {

  let member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;


  let color = member.displayHexColor;
  const bit = {
    true: "Yes",
    false: "Nope"
  };

  const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do not disturb",
    offline: "Offline/Invisible"
  };


  let embed = new Discord.RichEmbed()
    .setAuthor(member.user.tag, member.user.avatarURL)
    .setThumbnail(member.user.avatarURL)
    .addField('Created At:', `${moment.parseZone(member.createdAt).locale('en').format('dd, DD-MM-YYYY, HH:mm')}`, true)
    .addField('Joined At:', `${moment.parseZone(message.guild.members.find('id', member.id).joinedAt).locale('en').format('dd, DD-MM-YYYY, HH:mm')}`)
    .addField(`Roles[${member.roles.size - 1}]`, `**   **${member.roles.map(r => `<@&${r.id}>`).slice(1).join("  |  ")}`)
    .addField('Status:', status[member.presence.status])
    .addField('Color:', color)
    .addField('Bot?', bit[member.user.bot])
    .addField('Game:', `${member.presence.game ? member.presence.game : 'Nothing'}`)
    .setFooter(`ID ${member.id}`)
    .setColor(color)
    .setTimestamp();

  message.channel.send(embed);




}
