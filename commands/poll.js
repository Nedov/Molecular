const Discord = require('discord.js')

exports.run = async (bot, message, args) => {
  message.delete();
  if (!args) return message.reply("You must have something to vote for!")
   if (!message.content.includes("?")) return message.reply("Include a ? in your vote!")
    message.channel.send(`${message.author.username} started a vote! React to my next message to vote on it. `);
    const pollTopic = new Discord.RichEmbed()
    .setTitle("Poll")
    .setDescription(`${args.join(" ")}`)
    .setColor("#5DDAEE")
    .setFooter(`Poll creator: ${message.author.tag}`);
    await message.channel.send(pollTopic).then(embedMessage => {
      embedMessage.react('474913060000104448').then( r => {
        embedMessage.react('474913061665374208')
      })
    });

}
