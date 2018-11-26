const Discord = require("discord.js");
const db = require('quick.db')


module.exports.run = async (bot, message, args) => {


  let bluecircle = '12345';
  let redcircle = '67890';
  let embed = new Discord.RichEmbed()
    .setTitle('Would You Rather?')
    .setDescription(`🔵 ${bluecircle}\n\nOr\n\n🔴 ${redcircle}`)
  message.channel.send(embed).then(embedMessage => {
    embedMessage.react('🔵').then(r => {
      embedMessage.react('🔴')
    }) // Red
  }) // Blue
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
