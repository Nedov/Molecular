const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

if (message.author.bot) return;

const m = await message.channel.send("Pinging....");

  m.edit(`<@${message.author.id}> Pong! latency \`${m.createdTimestamp - message.createdTimestamp}ms\`. API latency \`${Math.round(bot.ping)}ms\``);
}
