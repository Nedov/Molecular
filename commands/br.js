const Discord = require('discord.js');
const config = require("../config.json");

exports.run = (bot, message, args, ops) => {

  if (message.author.id != ops.ownerID) {

  const errors = new Discord.RichEmbed()
  .setTitle("Error || Bot owner only")
  .setDescription("This command only for Molecular Bot owner")
  .setFooter(`${message.author.tag}, sorry, you cannot use this command`)


  message.channel.send(errors);
  return;
};

  const update = 'http://chittagongit.com/images/view-icon-png/view-icon-png-29.jpg';


  const embed = new Discord.RichEmbed()
  .setTitle("Bot restart")
  .setDescription(`Bot reloaded sucefully`)
  .setThumbnail(update)
  .setColor()


      bot.destroy()
      bot.login(process.env.BOT_TOKEN);
    message.channel.send(embed);
return;
}
