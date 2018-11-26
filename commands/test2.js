const Discord = require("discord.js");
const db = require('quick.db')


module.exports.run = async (bot, message, args) => {

  // Admin Perms
  let bluecircle = args[0];
  let redcircle = args[1];
  let embed = new Discord.RichEmbed()
    .setTitle('Would You Rather?')
    .setDescription(`🔵 ${bluecircle}\n\nOr\n\n🔴 ${redcircle}`)
  message.channel.send(embed)
}



exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ['t2'],
  categories: ['tests']
};

exports.help = {
  name: "test2",
  description: "test2 command",
  usage: "test2"
};
