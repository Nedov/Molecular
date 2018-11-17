const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  if (!message.channel.nsfw) return message.reply('Only NSFW channel!')
  let {
    body
  } = await superagent
    .get(`https://nekos.life/api/v2/img/cum`);

  let catembed = new Discord.RichEmbed()
    .setColor("#FFCC5F")
    .setTitle("Fap time")
    .setImage(body.url);

  message.channel.send(catembed)

}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  categories: ['NSFW']
};

exports.help = {
  name: "cum",
  description: "18+ Command",
  usage: "cum"
};
