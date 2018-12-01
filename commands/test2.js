const Discord = require("discord.js");


exports.run = (bot, message, args) => {


  let botik = args[0];
  bot.fetchUser(bot).then(u => {
    const embed = new Discord.RichEmbed()
      .setAuthor("Hi " + message.author.username)
      .setDescription("Thanks for inviting your bot! It will be tested and added to the guild shortly")
      .addField('Bot: ', u.tag, true)
      .addField('Bot ID: ', botik, true)
      .addField('Owner: ', message.author.tag, true)
      .addField("Prefix: ", `${args[1]}`, true)
      .setTimestamp()
      .setThumbnail(u.displayAvatarURL)
      .setColor("RANDOM")
    message.reply(embed)
  })
}



exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ['t2'],
  categories: ['tests']
};

exports.help = {
  name: "test2",
  description: "test2 command",
  usage: "test2"
};
