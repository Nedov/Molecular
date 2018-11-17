const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("MANAGE_SERVER")) return message.reply("No no no.");
  if (!args[0] || args[0 == "help"]) return message.reply("Usage: prefix <desired prefix here>");

  let prefixes = JSON.parse(fs.readFileSync("./storage/serverPrefixes.json", "utf8"));

  prefixes[message.guild.id] = {
    prefixes: args[0]
  };

  fs.writeFile("./storage/serverPrefixes.json", JSON.stringify(prefixes), (err) => {
    if (err) console.log(err)
  });

  let sEmbed = new Discord.RichEmbed()
    .setColor("#FF9900")
    .setTitle("Prefix Set!")
    .setDescription(`Set to ${args[0]}`);

  message.channel.send(sEmbed);

}

exports.conf = {
  enabled: false, // not used yet
  guildOnly: false, // not used yet
  aliases: ["setprefix"],
  categories: ['mod commands']
};

exports.help = {
  name: "command",
  description: "Command Description",
  usage: "command <argument>"
};
