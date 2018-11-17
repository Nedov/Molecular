const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  if (!message.channel.nsfw) return message.reply('Only NSFW channel!')
  let {
    body
  } = await superagent
    .get(`https://nekos.life/api/v2/img/smallboobs`);

  let catembed = new Discord.RichEmbed()
    .setColor("#FFCC5F")
    .setTitle("Fap time")
    .setImage(body.url);

  message.channel.send(catembed)

}
exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["sb"],
  categories: ['NSFW']
};

exports.help = {
  name: "smallboobs",
  description: "18+ Smallboobs command",
  usage: "smallboobs"
};
