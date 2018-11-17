// Now, lets start by making it so that we can edit those values.

// Require Packages
const db = require('quick.db')

exports.run = (bot, message, args, tools) => {

  // Return Statements
  if (!message.member.roles.find('name', 'Bot owner')) return tools.embed(message.channel, '**This command requires the Owner role**', 120000) // This returns if it CANT find the owner role on them. It then uses the toolstion to send to message.channel, and deletes the message after 120000 milliseconds (2minutes)
  if (!message.mentions.channels.first() && args.join(" ").toUpperCase() !== 'NONE') return tools.embed(message.channel, '**Please mention a channel**\n > *~setChannel #channel*') // This returns if they don't message a channel, but we also want it to continue running if they want to disable the log

  // Fetch the new channel they mentioned
  let newChannel;
  if (args.join(" ").toUpperCase() === 'NONE') newChannel = ''; // If they wrote the word none, it sets newChannel as empty.
  else newChannel = message.mentions.channels.first().id; // If they actually mentioned a channel, it will set newChannel as that.

  // Update Channel
  let i = db.set(`messageChannel_${message.guild.id}`, newChannel)
  tools.embed(message.channel, `**Successfully updated logging channel to ${message.mentions.channels.first()}**`) // Finally, send in chat that they updated the channel.


} // Lets set the DM channel now, we can use this code we just wrote as a template.

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["setChannel"],
  categories: ['tests']
};

exports.help = {
  name: "setchannel",
  description: "test command",
  usage: "setchannel"
};
