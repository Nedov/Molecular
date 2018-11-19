const Discord = require("discord.js");

module.exports.run = async (bot) => {


  bot.user.setStatus("dnd"); // Ставит статус боту, можешь заменить "online" на "dnd", "idle", "offline"

  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
}
