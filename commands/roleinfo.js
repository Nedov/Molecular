const {
  RichEmbed
} = require('discord.js');
exports.run = (bot, message, args) => {

  const bit = {
    true: "Yes",
    false: "Nope"
  };
  // Tries to get the first mentioned role or a role ID or a role name (role names are case sensitive)
  let role = message.mentions.roles.first() || message.guild.roles.get(args[0]) || message.guild.roles.find(role => role.name === args[0]);

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