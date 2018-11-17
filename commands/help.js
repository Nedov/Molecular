const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {

  //page 1

  if (!args[0]) {
    message.channel.sendCode("asciidoc", `= Command List =\n\n[Use m^help <commandname> for details]\n\n${bot.commands.map(c=>`${c.help.name}:: ${c.help.description}`).join("\n")}`);
  } else {
    let command = args[0];
    if (bot.commands.has(command)) {
      command = bot.commands.get(command);
      message.channel.sendCode("asciidoc", `= ${command.help.name} = \n[ category:: ${command.conf.categories} ]\n${command.help.description}\nusage::${command.help.usage}`);
    }
  }

}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  categories: ['General']
};

exports.help = {
  name: "help",
  description: "help command",
  usage: "help [command]"
};
