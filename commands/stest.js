const Discord = require("discord.js");


exports.run = (bot, message, args) => {
  if (!message.guild.id === '504005061186420757' && message.channel.id === '518773545036152832') return;
  if (message.guild.id === '504005061186420757' && message.channel.id === '518773545036152832') {
    let owner = bot.users.find(m => m.id === args[0]);
    let botik = args[1];




    bot.fetchUser(botik).then(u => {

      let botlogs = bot.guilds.find(g => g.id === '469630074061062154').channels.find(ch => ch.id === '517328879011233792'); // Bot logs
      botlogs.send(`(Owner: ${owner.tag}) **${u.tag}** is being tested by **${message.author.tag}**`)
    }).catch(err => message.channel.send(new Discord.RichEmbed().setTitle('ERROR').setColor("0xff0202").setDescription(`Error: \n  \`\`\`${(err)}\`\`\``)));
  }

}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ['start'],
  categories: ['Bot Ver']
};

exports.help = {
  name: "stest",
  description: "Bot start testing command",
  usage: "m^stest <owner> <botID>"
};
