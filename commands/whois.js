const Discord = require('discord.js');
const moment = require("moment");

const sm = require('string-similarity');

module.exports.run = async (bot, message, args) => {

  let members = [];
  let indexes = [];
  message.guild.members.forEach(function(member) {
    members.push(member.user.username);
    indexes.push(member.id);
  });

  let match = sm.findBestMatch(args.join(' '), members);

  let username = match.bestMatch.target;


  let member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.guild.members.get(indexes[members.indexOf(username)]) || message.member;


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
    .addField('Created At:', `${moment.parseZone(member.user.createdAt).locale('en').format('dddd, L, HH:mm')}`, true)
    .addField('Joined At:', `${moment.parseZone(message.guild.members.find('id', member.id).joinedAt).locale('en').format('dddd, L, HH:mm')}`)
    .addField(`Roles[${member.roles.size - 1}]`, `${member.roles.map(r => `<@&${r.id}>`).slice(1).join("  |  ")}**   **`)
    .addField('Status:', status[member.presence.status])
    .addField('Color:', color)
    .addField('Bot?', bit[member.user.bot])
    .addField('Game:', `${member.presence.game ? member.presence.game : 'Nothing'}`)
    .setFooter(`ID ${member.id}`)
    .setColor(color)
    .setTimestamp();

  message.channel.send(embed);




}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["userinfo", "ui"],
  categories: ['General']
};

exports.help = {
  name: "whois",
  description: "User info command",
  usage: "whois <user>"
};
