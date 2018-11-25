const Discord = require('discord.js');
const moment = require("moment");

const sm = require('string-similarity');

module.exports.run = async (bot, message, args) => {

  let members = [];
  let indexes = [];

  // We want to run through each member in the server, and add them to those arrays
  message.guild.members.forEach(function(member){ // This function will run through each member in the guild.
    members.push(member.user.username);
    indexes.push(member.id); // This will push both the ID and username into the arrays
  });

  // Now, we can find the item in the array that best matches the arguments they wrote in chat.
  let match = sm.findBestMatch(args.join(' '), members); // What this does is finds the best match from 'args', when joined.
  // `match` now holds an object with the bestmatch, this object can be seen on the `string-similarity` npm page.
  let username = match.bestMatch.target; // This now holds the username of the bestmatch.
  // To get the userID of the bestmatch, we now have to access the indexes array.

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
