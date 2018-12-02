const Discord = require('discord.js');
const config = require('../config.json')
module.exports.run = async (bot, message, args) => {

  if (!message.content.startsWith(config.prefix)) return;
  if (message.channel.type === 'dm') return;
  if (message.author.bot) return;
  console.log(`User: ${message.author.tag} Server: ${message.guild.name} Channel: ${message.channel.name} Command: ${message.content}`)
}
