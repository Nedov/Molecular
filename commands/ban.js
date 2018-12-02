const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const moment = require("moment");


module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('Nope');
  if (args[0] == "help") {
    message.reply("Usage: m^ban <user> <reason>");
    return;
  }
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!bUser) return errors.cantfindUser(message.channel);
  if (bUser.id === bot.user.id) return errors.botuser(message);
  let bReason = args.join(" ").slice(22);
  if (!bReason) return errors.noReason(message.channel);
  if (bUser.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, bUser, "MANAGE_MESSAGES");

  let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", moment().locale('en').format('LLLL'))
    .addField("Reason", bReason);

  let incidentchannel = message.guild.channels.find(ch => ch.name === "incidents");
  if (!incidentchannel) return message.channel.send("Can't find `incidents` channel.");

  message.guild.member(bUser).ban(bReason);
  incidentchannel.send(banEmbed);
}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  categories: ['mod commands']
};

exports.help = {
  name: "ban",
  description: "Ban command",
  usage: "ban <user> <reason>"
};
