const Discord = require("discord.js");

const Canvas = require('canvas');

const snekfetch = require('snekfetch');

const serverStats = {
  guildID: '504005061186420757',
  totalUsersID: '506058168321703939',
  memberCountID: '506058325851373578',
  botCountID: '506058402452209689'
}

//PEPESTAN
const serverStats2 = {
  guildID: '248111395420241920',
  totalUsersID: '513008847514763274'
}

module.exports.run = async (bot, member) => {

  if (member.guild.id === serverStats.guildID) {

    // Molecular Support
    bot.channels.get(serverStats.totalUsersID).setName(`Total users : ${member.guild.memberCount}`);
    bot.channels.get(serverStats.memberCountID).setName(`Member count : ${member.guild.members.filter(m => !m.user.bot).size}`);
    bot.channels.get(serverStats.botCountID).setName(`Bot count : ${member.guild.members.filter(m => m.user.bot).size}`);

  } else if (member.guild.id === serverStats2.guildID) {
    bot.channels.get(serverStats2.totalUsersID).setName(`🐸 Total Pepos : ${member.guild.memberCount}`);
  }




  const channel = member.guild.channels.find(ch => ch.name === 'logs');
      if (!channel) return;

let embed = new Discord.RichEmbed()
.setTitle('Member Logs')
.setColor("#ff0000")
.setThumbnail(member.user.avatarURL)
.setDescription(`${member.user.tag} left us, and lost ${member.roles.size - 1} roles`)

      channel.send(`Total users : ${member.guild.memberCount}`, {embed});
}
