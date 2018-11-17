const Discord = require('discord.js');
const cowsay = require('cowsay');


module.exports.run = async (bot, message, args, tools) => {
  let text = args.join(" ");
  message.channel.send("```" + cowsay.say({
    text: text
  }) + "```")
}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["csay", "say_cow"],
  categories: ['Fun']
};

exports.help = {
  name: "cow",
  description: "Cow say command",
  usage: "cow <text>"
};
