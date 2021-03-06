const Discord = require('discord.js'); // I'm requiring discord.js since we will be using Embeds.
const config = require('../config.json')
const Canvas = require('canvas');
const snekfetch = require('snekfetch');


exports.run = async (bot, message, args, tools) => {


  try {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
      .setAuthor(message.guild.name)
      .setColor("#36393f")
      .setThumbnail(sicon)
      .setTitle(`Roles[**${message.guild.roles.size}**]`)
      .setDescription(`${message.guild.roles.map(r => `<@&${r.id}>`).slice(1).join("  |  ")}`)

    message.channel.send(serverembed);

  } catch (err) {
    const embed = new Discord.RichEmbed()
      .setTitle(`ERROR`)

      .setColor("0xff0202")
      .setDescription(`Error: \n  \`\`\`${(err)}\`\`\``)

    message.channel.send({
      embed
    });
  }

}

// ⏪⏩
// Now, we can test it. Make sure you add some pages though.
exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  categories: ['tests']
};

exports.help = {
  name: "test",
  description: "test command",
  usage: "test"
};
