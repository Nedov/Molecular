const db = require('quick.db')
const Discord = require('discord.js')
const ms = require("parse-ms")

module.exports.run = async (client, message, args) => {

  let cooldown = 8.64e+7,
    reward = Math.floor(Math.random() * 300 + 1);

  let lastDaily = await db.fetch(`lastDaily_${message.author.id}`)
  try {
    let bucks = db.fetch(`userBalance_${message.member.id}`)
    if (bucks == null) {
      db.set(`userBalance_${message.member.id}`, 50)
    } else if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
      let timeObj = ms(cooldown - (Date.now() - lastDaily))

      let lastDailyEmbed = new Discord.RichEmbed()
        .setAuthor(`Next Daily`)
        .setColor('#ffffff')
        .setDescription(`You sucessfully collected this, you must wait to collect next daily. Time Left: **${timeObj.hours}h ${timeObj.minutes}m**!`)
        .setFooter('Requested By ' + message.author.tag, message.author.avatarURL)
      message.channel.send(lastDailyEmbed)
    } else {
      db.set(`lastDaily_${message.author.id}`, Date.now());
      let i = db.add(`userBalance_${message.member.id}`, reward)
      var discord = require('discord.js')
      var embed = new Discord.RichEmbed()
        .setTitle('Todays Daily')
        .setDescription(`Sucessfully collected :dollar:$${reward}`)
        .setColor('#ffffff')
        .setFooter('Requested By ' + message.author.tag, message.author.avatarURL)
      message.channel.send(embed);

    }

  } catch (err) {
    console.log(err)
  }

}

exports.conf = {
  enabled: false, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  categories: ['Economy']
};

exports.help = {
  name: "mining",
  description: "Command Description",
  usage: "mining"
};
