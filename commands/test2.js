const Discord = require("discord.js");


exports.run = (bot, message, args) => {
  
if (args[0].length > 18 || args[0].length < 18) return message.channel.send('Enter a vaild Bot ID').then(msg => msg.delete(5000));
  if (args[1].length > 7) return message.channel.send('Your prefix too long').then(msg => msg.delete(5000));
  let botik = args[0];
  bot.fetchUser(botik).then(u => {
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
    message.channel.send(embed)
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
