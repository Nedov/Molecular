const Discord = require("discord.js"); // Defining Discord

module.exports.run = async (bot, message, args) => { // Command Handler Module Code
const m = await message.channel.send("Pinging...");

let E = new Discord.RichEmbed() // Start of embed
.setTitle("Pong! :stopwatch:") // Embed Title
.addField("Latency", `${m.createdTimestamp - message.createdTimestamp}ms`) // Shows Latency
.addField("API Latency", `${Math.round(bot.ping)}ms`) // Shows API Latency
.setColor("")

message.channel.send(E) // Sending the embed

  }
