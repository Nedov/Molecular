const Discord = require('discord.js');

module.exports.run = async (bot, message, args, ops) => {



    if(message.mentions.members.size == 0) {

      const ava = message.author.avatarURL;
      let color = message.member.displayHexColor;

      const embed = new Discord.RichEmbed()
      .setTitle(`Avatar ${message.author.tag}`)
      .setImage(ava)
      .setTimestamp(new Date())
      .setColor(color);
      message.channel.send(embed);
      return;

    }

    if(message.mentions.members.size == 1) {

    let memberToFind = message.mentions.members.first();
    let color1 = memberToFind.displayHexColor;
    const ava1 = memberToFind.user.avatarURL;

    const embed1 = new Discord.RichEmbed()
    .setTitle(`Avatar ${memberToFind.user.tag}`)
    .setImage(ava1)
    .setTimestamp(new Date())
    .setColor(color1);
    message.channel.send(embed1);

    return;
  }
}
