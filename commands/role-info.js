const Discord = require('discord.js');
const moment = require("moment");
const config = require("../config.json");

module.exports.run = async (bot, message, args, ops) => {


  let mrole = message.mentions.roles.first();
  let membersWithRole = mrole.members;

  const bit = {
    true: "Yes",
    false: "Nope"
  };

    if(!mrole) {

      const embed = new Discord.RichEmbed()

      .setTitle("ERROR")
      .setDescription("mention a role!")
      .setColor("#FF0000");
      message.channel.send(embed);
      return;
    }

    const rEmbed = new Discord.RichEmbed()
    .setTitle("Role info")
    .setColor(mrole.hexColor)
    .addField("ID", `${mrole.id}`, true)
    .addField("Name", mrole.name, true)
    .addField("Color", `${mrole.hexColor}`, true)
    .addField("Members", `${membersWithRole.size}`, true)
    .addField("Mentionable?", bit[mrole.mentionable], true)
    .addField("Position", `${mrole.calculatedPosition}`, true)
    .addField("Mention", `\`${mrole}\``, true);
    message.channel.send(rEmbed);

}
