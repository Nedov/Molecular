const Discord = require('discord.js')
const moment = require("moment");
const config = require("../config.json");

exports.run = async (bot, message, args, ops) => {

  if (!config.owners.includes(message.author.id)) return message.channel.send(`<@${message.author.id}> sry`);

  let rhex = [
    '#DD2B54',
    '#E6A116',
    '#59C2AF',
  ]

  const rhexc = rhex[Math.floor(Math.random() * rhex.length)]

  if (message.mentions.channels.size == 1) {
    let menchannel = message.mentions.channels.first()

    let text1 = args.slice(1).join(" ");
    message.delete();

    const sayEmbed1 = new Discord.RichEmbed()
      .setTitle("Mail📧")
      .setDescription(`Message: ${text1}`)
      .setColor(rhexc)
      .addField("Server", message.guild.name)
      .addField("Channel", message.channel)
      .addField("Time", moment().locale('en').format('LLLL'))
      .setFooter(`Said ${message.author.tag}`);
    menchannel.send(sayEmbed1);
    return;
  }

  if (message.mentions.channels.size == 0) {
    let text = args.slice(0).join(" ");
    message.delete();
    const sayEmbed = new Discord.RichEmbed()
      .setTitle("Mail📧")
      .setDescription(`Message: ${text}`)
      .setColor(rhexc)
      .addField("Server", message.guild.name)
      .addField("Channel", message.channel)
      .addField("Time", moment().locale('en').format('LLLL'))
      .setFooter(`Said ${message.author.tag}`);
    message.channel.send(sayEmbed);
    return;
  }
}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["mail"],
  categories: ['OWNER']
};

exports.help = {
  name: "say",
  description: "Bot owners command",
  usage: "say <text>"
};
