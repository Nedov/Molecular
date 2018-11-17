const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;
  let string = '';
  bot.guilds.forEach(guild => {
    string += guild.name + '\n';
  })
  let bt = bot.user.username;
  let botembed = new Discord.RichEmbed()
    .setColor("#000FF")
    .addField("Servers In", string)
    .setTimestamp()
    .setFooter("Command Ran By: " + message.author.username, message.author.avatarURL);
  message.channel.send(botembed);
}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["serverlist", "sl"],
  categories: ['General']
};

exports.help = {
  name: "sl",
  description: "Servers list",
  usage: "sl"
};
