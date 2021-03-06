const Discord = require('discord.js');
const encode = require('strict-uri-encode');

module.exports.run = async (bot, message, args) => {
  if (!message.channel.nsfw) return message.reply('Only NSFW channel!')

  let question = encode(args.join(' '));

  let link = `https://www.lmgtfy.com/?q=${question}`;

  let color = message.member.displayHexColor;


  const embed = new Discord.RichEmbed()
    .setTitle("LMGTFY")
    .setURL(link)
    .setImage('http://1.bp.blogspot.com/-xMNYGtL5gdM/V3_W_-WEUiI/AAAAAAAAABc/yxaIo1sw3X8YL8kDoqCTkIvccYeMLzDgwCK4B/s1600/logo-with-colors-trans-medium.png')
    .setColor(color);
  message.channel.send(embed);

}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["lmg", "lm"],
  categories: ['Fun']
};

exports.help = {
  name: "lmgtfy",
  description: "lmgtfy command",
  usage: "lmgtfy <text>"
};
