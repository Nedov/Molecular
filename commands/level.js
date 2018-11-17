const Discord = require("discord.js");
let xp = require("../storage/xp.json");

module.exports.run = async (bot, message, args) => {

  if (message.mentions.members.size == 0) {
    let color = message.member.displayHexColor;

    if (!xp[message.author.id]) {
      xp[message.author.id] = {
        xp: 0,
        level: 1
      };
    }
    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nxtLvlXp = curlvl * 300;
    let difference = nxtLvlXp - curxp;

    let lvlEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .setColor(color)
      .addField("Level", curlvl, true)
      .addField("XP", curxp, true)
      .setFooter(`${difference} XP til level up`, message.author.displayAvatarURL);

    message.channel.send(lvlEmbed)


  }

  if (message.mentions.members.size == 1) {

    let memberToFind = message.mentions.members.first();

    let color1 = message.member.displayHexColor;

    if (!xp[memberToFind.user.id]) {
      xp[memberToFind.user.id] = {
        xp: 0,
        level: 1
      };
    }
    let curxp1 = xp[memberToFind.user.id].xp;
    let curlvl1 = xp[memberToFind.user.id].level;
    let nxtLvlXp1 = curlvl1 * 300;
    let difference1 = nxtLvlXp1 - curxp1;

    let lvlEmbed1 = new Discord.RichEmbed()
      .setAuthor(memberToFind.user.username)
      .setColor(color1)
      .addField("Level", curlvl1, true)
      .addField("XP", curxp1, true)
      .setFooter(`${difference1} XP til level up`, memberToFind.user.displayAvatarURL);

    message.channel.send(lvlEmbed1)

  }
}

exports.conf = {
  enabled: false, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  categories: ['Level']
};

exports.help = {
  name: "command",
  description: "Command Description",
  usage: "command <argument>"
};
