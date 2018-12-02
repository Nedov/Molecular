const Discord = require("discord.js");


exports.run = (bot, message, args) => {
  if (!message.guild.id === '504005061186420757' && message.channel.id === '518775860258537472') return;
  if (message.guild.id === '504005061186420757' && message.channel.id === '518775860258537472') {
    let owner = args[0];
    let botik = args[1];
    let reason = message.content.slice(43)




    bot.fetchUser(botik).then(u => {

      let botlogs = bot.guilds.find(g => g.id === '469630074061062154').channels.find(ch => ch.id === '517328879011233792'); // Bot logs
      botlogs.send(`<@${owner}> your bot(${u.tag}) has been declined, reason: ${reason}`)
      message.guild.member(botik).kick(reason);
    }).catch(err => message.channel.send(new Discord.RichEmbed().setTitle('ERROR').setColor("0xff0202").setDescription(`Error: \n  \`\`\`${(err)}\`\`\``)));
  }

}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ['decline'],
  categories: ['Bot Ver']
};

exports.help = {
  name: "decline",
  description: "Bot decline command",
  usage: "m^dec <owner> <botID> <reason>"
};
