const db = require('quick.db');

module.exports.run = async (bot, message, args, tools) => {

  let channel
  let dmText
  let joinText
  let leaveText

  let channelIDFetched = db.fetch(`messageChannel_${message.guild.id}`);
  if (!message.guild.channels.get(channelIDFetched)) channel = '*none*'
  else channel = message.guild.channels.get(channelIDFetched)

  let joinDMFetched = db.fetch(`joinMessageDM_${message.guild.id}`);
  if (!joinDMFetched) dmText = '*none*'
  else dmText = joinDMFetched

  let joinTextFetched = db.fetch(`joinMessage_${message.guild.id}`);
  if (!joinTextFetched) joinText = '*none*'
  else joinText = joinTextFetched

  let leaveTextFetched = db.fetch(`leaveMessage_${message.guild.id}`);
  if (!leaveTextFetched) leaveText = '*none*'
  else leaveText = leaveTextFetched

  let response = `**Logging Channel**\n > ${channel}\n\n` // This is the first line, make sure to use \n for new lines
  response += `**Welcome DM Text**\n > ${dmText}\n\n` // Make sure you are using += not = when adding to the string.
  response += `**Welcome Channel Text**\n > ${joinText}\n\n` // This is the third line.
  response += `**Leave Channel Text**\n > ${leaveText}\n\n` // Now, lets send the embed using the new function we made earlier.

  tools.embed(message.channel, response) // Lets test it now.


}


exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["cfg"],
  categories: ['Welcome/Leave']
};

exports.help = {
  name: "config",
  description: "Welcome/leave message config",
  usage: "config"
};
