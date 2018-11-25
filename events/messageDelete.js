const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  if (!message.guild.id !== '504005061186420757') return;


    const arr = [];
    message.attachments.map(c => arr.push(c.proxyURL));
    arr.forEach(p => {
        const embed = new Discord.RichEmbed()
    if (message.attachments) embed.setDescription(`Attachments:\n${p}\nMessage:\n\`\`\`${message.content}\`\`\``)
    else if (!message.attachments) embed.setDescription(`Message:\n\`\`\`${message.content}\`\`\``)
message.channel.send({embed})
    })




}
