const Discord = require("discord.js");


exports.run = (bot, message, args) => {
  if (!message.guild.id === '504005061186420757' && message.channel.id === '518775948540248079') return;
  if (message.guild.id === '504005061186420757' && message.channel.id === '518775948540248079') {
    let owner = args[0];
    let botik = args[1];




    bot.fetchUser(botik).then(u => {

      let botlogs = bot.guilds.find(g => g.id === '469630074061062154').channels.find(ch => ch.id === '517328879011233792'); // Bot logs
      message.channel.send(new Discord.RichEmbed().setTitle('Invite').setColor("0xff0202").setDescription(`[invite with **0** permissions](https://discordapp.com/oauth2/authorize?client_id=${botik}&scope=bot&permissions=0)`)).then(msg => {
        botlogs.send(`(Owner: <@${owner}>) **${u.tag}** has been accepted`)
        message.guild.member(botik).kick()
      });
    }).catch(err => message.channel.send(new Discord.RichEmbed().setTitle('ERROR').setColor("0xff0202").setDescription(`Error: \n  \`\`\`${(err)}\`\`\``)));
  }

}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ['acc'],
  categories: ['Bot Ver']
};

exports.help = {
  name: "accept",
  description: "Bot accept command",
  usage: "m^accept <owner> <botID>"
};
