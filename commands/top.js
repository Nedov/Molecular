const Discord = require("discord.js");
const db = require('quick.db')


module.exports.run = async (bot, message, args) => {

  // Admin Perms
  const top = bot.guilds.sort((a, b) => a.memberCount - b.memberCount).array().reverse()
  message.channel.send(`\`\`\`asciidoc\n1. ${top[0].name} :: ${top[0].memberCount} members\n2. ${top[1].name} :: ${top[1].memberCount} members\n3. ${top[2].name} :: ${top[2].memberCount} members\n4. ${top[3].name} :: ${top[3].memberCount} members\n5. ${top[4].name} :: ${top[4].memberCount} members\n6. ${top[5].name} :: ${top[5].memberCount} members\n7. ${top[6].name} :: ${top[6].memberCount} members\n8. ${top[7].name} :: ${top[7].memberCount} members\n9. ${top[8].name} :: ${top[8].memberCount} members\n10. ${top[9].name} :: ${top[9].memberCount} members\n\`\`\``)

}



exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ['ts'],
  categories: ['General']
};

exports.help = {
  name: "top",
  description: "Shows Top 10 Bot Servers",
  usage: "top"
};
