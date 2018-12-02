const Discord = require("discord.js");


exports.run = (bot, message, args) => {
  message.delete()
  if (!message.guild.id === '469630074061062154' && message.channel.id === '517327921350967326') return;
  if (message.guild.id === '469630074061062154' && message.channel.id === '517327921350967326') {
    let botik = args[0];

    if (!botik) return message.channel.send(new Discord.RichEmbed().setTitle('ERROR').setColor("3a3a3a").setDescription('Usage: `m^t2 <ID> <prefix>`'));
    if (!args[1]) return message.channel.send(new Discord.RichEmbed().setTitle('ERROR').setColor("3a3a3a").setDescription('Usage: `m^t2 <ID> <prefix>`'));
    if (botik.length > 18 || botik.length < 18 || isNaN(botik)) return message.channel.send('Enter a vaild Bot ID').then(msg => msg.delete(5000));
    if (args[1].length > 7) return message.channel.send('Your prefix too long').then(msg => msg.delete(5000));



    bot.fetchUser(botik).then(u => {
      let testg = bot.guilds.find(g => g.id === '504005061186420757'); // Bot testing
      let here = message.guild; // This guild
      let tno = testg.members.find(m => m.id === botik); // Bot testing
      let hno = here.members.find(m => m.id === botik); // This guild
      if (tno) return message.channel.send('Your bot already on **Verification Server**').then(msg => msg.delete(5000)); // Bot testing
      if (hno) return message.channel.send('Your bot alreay here').then(msg => msg.delete(5000)); // This guild
      if (!u.bot) return message.channel.send('Only bot ID'); //check if botin id = bot

      const embed = new Discord.RichEmbed()
        .setAuthor("Hi " + message.author.username)
        .setDescription("Thanks for inviting your bot! It will be tested and added to the guild shortly")
        .addField('Bot: ', u.tag, true)
        .addField('Bot ID: ', botik, true)
        .addField('Owner: ', message.author.tag, true)
        .addField("Prefix: ", `${args[1]}`, true)
        .setTimestamp()
        .setThumbnail(u.displayAvatarURL)
        .setColor("BLURPLE")

      message.channel.send(embed).then(msg => {
        let botlogs = bot.guilds.find(g => g.id === '469630074061062154').channels.find(ch => ch.id === '517328879011233792'); // Bot logs

        botlogs.send(`(Owner: ${message.author.tag}) **${u.tag}** has beed added to **Verification Server**!`)


        let testchnl = bot.guilds.find(g => g.id === '504005061186420757').channels.find(ch => ch.id === '518773491202523147'); // Bot testing
        let testEmbed = new Discord.RichEmbed()
          .setDescription(`[invite with **0** permissions](https://discordapp.com/oauth2/authorize?client_id=${botik}&scope=bot&permissions=0)`)
          .setTitle('New Bot')
          .addField('Bot: ', u.tag, true)
          .addField('Owner | ID ', message.author.tag + ' | ' + message.author.id, true)
          .addField('Owner: ', message.author.tag, true)
          .addField("Prefix: ", `${args[1]}`, true)
          .setTimestamp()
          .setThumbnail(u.displayAvatarURL)
          .setColor("BLURPLE")
        testchnl.send(testEmbed)
      })
    }).catch(err => message.channel.send(new Discord.RichEmbed().setTitle('ERROR').setColor("0xff0202").setDescription(`Error: \n  \`\`\`${(err)}\`\`\``)));
  }

}





exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ['binvite', 'botinv', 'binv'],
  categories: ['Bot Ver']
};

exports.help = {
  name: "botinvite",
  description: "Your bot invite command",
  usage: "m^binv <id> <prefix>"
};
