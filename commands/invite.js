const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

  let botik = args[0];
  if (!botik || botik.length > 18 || botik.length < 18 || isNaN(botik)) return message.channel.send('Please, enter a Bot ID');
  // if (!args.bot) return message.channel.send('Only bot ID');
  if (args[0]) {

    bot.fetchUser(botik).then(u => {

      if (!u.bot) return message.channel.send(`${u.tag} isn't a bot`);
      else {
        const embed = new Discord.RichEmbed()
          .addField('Bot: ', u.tag, true)
          .addField('Bot ID: ', botik, true)
          .setDescription(`[invite with **ALL** permissions](https://discordapp.com/oauth2/authorize?client_id=${botik}&scope=bot&permissions=2146958847)`)
          .setTimestamp()
          .setThumbnail(u.displayAvatarURL)
          .setColor("RANDOM")

        message.channel.send(embed)
      }
    }).catch(err => message.channel.send(new Discord.RichEmbed().setTitle('ERROR').setColor("0xff0202").setDescription(`Error: \n  \`\`\`${(err)}\`\`\``)));

  }
};

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["inv"],
  categories: ['General']
};

exports.help = {
  name: "invite",
  description: "Bots invie link",
  usage: "invite <botID>"
};
