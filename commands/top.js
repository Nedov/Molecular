const Discord = require("discord.js");
const db = require('quick.db')


module.exports.run = async (bot, message, args) => {
  let bmembers = 0;
  let uss = 0;
  bot.guilds.forEach(g => {
    uss = uss + g.memberCount;
    bmembers = uss
  });
  // Admin Perms
  const top = bot.guilds.sort((a, b) => a.memberCount - b.memberCount).array().reverse()
  let embed = new Discord.RichEmbed()
    .setTitle('Top 15 servers')
    .setColor('3a3a3a')
    .setDescription(`\`\`\`asciidoc\n1. ${top[0].name} :: ${top[0].memberCount} members\n2. ${top[1].name} :: ${top[1].memberCount} members\n3. ${top[2].name} :: ${top[2].memberCount} members\n4. ${top[3].name} :: ${top[3].memberCount} members\n5. ${top[4].name} :: ${top[4].memberCount} members\n6. ${top[5].name} :: ${top[5].memberCount} members\n7. ${top[6].name} :: ${top[6].memberCount} members\n8. ${top[7].name} :: ${top[7].memberCount} members\n9. ${top[8].name} :: ${top[8].memberCount} members\n10. ${top[9].name} :: ${top[9].memberCount} members\n11. ${top[10].name} :: ${top[10].memberCount} members\n12. ${top[11].name} :: ${top[11].memberCount} members\n13. ${top[12].name} :: ${top[12].memberCount} members\n14. ${top[13].name} :: ${top[13].memberCount} members\n15. ${top[14].name} :: ${top[14].memberCount} members\n\`\`\``)
    .setFooter(`Total members: ${bmembers.toLocaleString()}`, bot.user.avatarURL)
  message.channel.send(embed)

}



exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ['ts'],
  categories: ['General']
};

exports.help = {
  name: "top",
  description: "Shows Top 15 Bot Servers",
  usage: "top"
};
