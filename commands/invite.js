const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  let argss = args.join(' ')
  if (!argss[0] || argss.length > 18 || argss.length < 18 || isNaN(argss)) return message.channel.send('Please, enter a Bot ID');
  if (argss) {
    message.channel.send(`<https://discordapp.com/oauth2/authorize?client_id=${argss}&scope=bot&permissions=2146958847> invite with Administrator permission`)
  }
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["inv"],
  categories: ['General']
};

exports.help = {
  name: "invite",
  description: "Bots invie link",
  usage: "invite <botID>"
};
