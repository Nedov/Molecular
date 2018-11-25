const Discord = require("discord.js");
const db = require('quick.db');

exports.run = (bot, message, args) => {
  let i = db.fetch(`guild_${message.guild.id}`)
  var embed = new Discord.RichEmbed()
    .setTitle('Server options')
    .setDescription(`Prefix: \`${i.prefix}\``)
    .setFooter('Change with ' + i.prefix + 'options prefix <value>');
  if (!args[0]) return message.channel.send(embed)
  if (args[0] == "prefix") {
    if (!args[1]) return message.channel.send('Please include a value.')
    if (args[1].length >= 5) return message.channel.send('That value is too long! Try something lower than 5!')
    db.set(`guild_${message.guild.id}`, args[1], {
      target: '.prefix'
    })
    message.channel.send(`Changed the prefix to \`${args[1]}\``)
  }

}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  categories: ['tests']
};

exports.help = {
  name: "serversettings",
  description: "test command",
  usage: "test"
};
