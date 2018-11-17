const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  if (!message.channel.nsfw) return message.reply('Only NSFW channel!')
  let {
    body
  } = await superagent
    .get(`https://nekos.life/api/v2/img/boobs`);

  let catembed = new Discord.RichEmbed()
    .setColor("#FFCC5F")
    .setTitle("Fap time")
    .setImage(body.url);

  message.channel.send(catembed)

}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ['bb'],
  categories: ['NSFW']
};

exports.help = {
  name: "boobs",
  description: "18+ boobs command",
  usage: "boobs"
};
