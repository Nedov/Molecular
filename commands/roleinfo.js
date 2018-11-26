const {
  RichEmbed
} = require('discord.js');
const sm = require('string-similarity');

exports.run = (bot, message, args) => {

  const bit = {
    true: "Yes",
    false: "Nope"
  };

  let roles = [];
  let indexes = [];

  // We want to run through each member in the server, and add them to those arrays
  message.guild.roles.forEach(function(role) { // This function will run through each member in the guild.
    roles.push(role.name);
    indexes.push(role.id); // This will push both the ID and username into the arrays
  });

  // Now, we can find the item in the array that best matches the arguments they wrote in chat.
  let match = sm.findBestMatch(args.join(' '), roles); // What this does is finds the best match from 'args', when joined.
  // `match` now holds an object with the bestmatch, this object can be seen on the `string-similarity` npm page.
  let name = match.bestMatch.target; // This now holds the username of the bestmatch.
  // To get the userID of the bestmatch, we now have to access the indexes array.


  // Tries to get the first mentioned role or a role ID or a role name (role names are case sensitive)
  let role = message.mentions.roles.first() || message.guild.roles.get(args[0]) || message.guild.roles.get(indexes[roles.indexOf(name)]);;

  // If we can't find any role, then just default to the author's highest role
  if (!role) role = message.member.highestRole;


  // Define our embed
  const embed = new RichEmbed()
    .setColor(role.hexColor)
    .setTitle(`Role: ${role.name}`)
    .addField('Members', role.members.size, true)
    .addField('Hex', role.hexColor, true)
    .addField('Creation Date', role.createdAt.toDateString(), true)
    .addField('Editable', bit[role.editable.toString()], true)
    .addField('Managed', bit[role.managed.toString()], true)
    .addField('ID', role.id, true);
  return message.channel.send({
    embed: embed
  });
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["role", "ri"],
  categories: ['General']
};

exports.help = {
  name: "roleinfo",
  description: "Role info command",
  usage: "roleinfo <roleID/roleName/mention>"
};
