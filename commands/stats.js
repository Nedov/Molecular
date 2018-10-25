const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {

  const bname = "Molecular";
  const bid = "490609897176563735";
  const njs = process.version;
  const djs = Discord.version;

  const embed = new Discord.RichEmbed()
  .setTitle("Stats")
  .addField("● Servers", `${bot.guilds.size}`, true)
  .addField("● Members", `${bot.users.size}`, true)
  .addField("● Text editor", "[Atom Editor](https://atom.io/)")
  .addField("Discord.js", djs)
  .addField("Node.js", njs)
  .setFooter(`Bot: ${bname}, ID: ${bid}`)
  .setURL("https://discord.io/molecularsupport")
  .addField("● Channels", `${bot.channels.size}`);
message.channel.send(embed);
}
