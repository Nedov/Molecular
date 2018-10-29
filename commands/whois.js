const Discord = require('discord.js');
const moment = require("moment");

module.exports.run = async (bot, message, args, ops) => {



    if(message.mentions.members.size == 0) {

      const bit = {
        true: "Yes",
        false: "Nope"
      };

      const status = {
   online: "Online",
   idle: "Idle",
   dnd: "Do not disturb",
   offline: "Offline/Invisible"
 };

      let color1 = message.member.displayHexColor;
    const user = message.author;
    const member = message.guild.member(user);

      let embed1 = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setThumbnail(`${message.author.avatarURL}`)
    .addField('Created At:', `${moment.parseZone(message.author.createdAt).locale('en').format('dd, DD-MM-YYYY, HH:mm')}`, true)
    .addField('Joined At:', `${moment.parseZone(message.guild.members.find('id', message.author.id).joinedAt).locale('en').format('dd, DD-MM-YYYY, HH:mm')}`)
    .addField(`Roles[${message.member.roles.size - 1}]`, `${message.member.roles.map(r => `<@&${r.id}>`).slice(1).join("  |  ")}`)
    .addField('Status:', status[user.presence.status])
    .addField('Color', color1)
    .addField('Bot?', bit[message.author.bot])
    .addField('Game:', `${message.author.presence.game ? message.author.presence.game : 'Nothing'}`)
    .setFooter(`ID ${message.author.id}`)
    .setColor(color)
    .setTimestamp();

      message.channel.send(embed1);
    return;
    }

        if(message.mentions.members.size == 1) {

          const bit1 = {
            true: "Yes",
            false: "Nope"
          };

          const status1 = {
            online: "Online",
            idle: "Idle",
            dnd: "Do not disturb",
            offline: "Offline/Invisible"
     };

          let memberToFind = message.mentions.members.first();
          let color = memberToFind.displayHexColor;


          let embed = new Discord.RichEmbed()
        .setAuthor(memberToFind.user.tag, memberToFind.user.avatarURL)
        .setThumbnail(`${memberToFind.user.avatarURL}`)
        .addField('Created At:', `${moment.parseZone(memberToFind.user.createdAt).locale('en').format('dd, DD-MM-YYYY, HH:mm')}`, true)
        .addField('Joined At:', `${moment.parseZone(message.guild.members.find('id', memberToFind.id).joinedAt).locale('en').format('dd, DD-MM-YYYY, HH:mm')}`)
        .addField(`Roles[${memberToFind.roles.size - 1}]`, `${memberToFind.roles.map(r => `<@&${r.id}>`).slice(1).join("  |  ")}`)
        .addField('Status:', status1[memberToFind.presence.status])
        .addField('Color', color)
        .addField('Bot?', bit1[memberToFind.user.bot])
        .addField('game:', `${memberToFind.presence.game ? memberToFind.presence.game : 'Nothing'}`)
        .setFooter(`ID ${memberToFind.id}`)
        .setColor(color)
        .setTimestamp();

          message.channel.send(embed);
return;
}

}
