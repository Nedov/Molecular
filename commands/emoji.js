const Discord = require('discord.js');
const config = require("../config.json");
const moment = require("moment");

module.exports.run = async (bot, message, args, ops, tools) => {

  const anim = {
    true: 'Yes',
    false: 'Nope'
  }


  if (args.length < 1) {
    const embed = new Discord.RichEmbed()
      .setColor (config.red)
      .setTitle ('**Error!**')
      .setDescription(`Use: **${config.prefix}emoji <:emoji:>**`)
    return message.channel.send({embed}).then(msg => {
      msg.delete(10000)
    });
  }

  args = args[0].split(':')[1];
  if (!args) {
    const embed = new Discord.RichEmbed()
      .setColor (config.red)
      .setTitle ('Error!')
      .setDescription(`Use: **${config.prefix}emoji <:emoji:>**`)
    return message.channel.send({embed}).then(msg => {
      msg.delete(10000)
    });
  }
  args = bot.emojis.find('name', args);

  if (!args) {
    const embed = new Discord.RichEmbed()
      .setColor (config.red)
      .setTitle ('Error!')
      .setDescription(`Emoji not found!`)
    return message.channel.send({embed}).then(msg => {
      msg.delete(10000)
    });
  }
 if (args) {
   const embed1 = new Discord.RichEmbed()
   .setTitle('Emoji Info')
   .addField('For Bot:', ' \\' + args, true)
   .addField('Name', args.name, true)
   .addField('Id', args.id, true)
   .addField('Animated?', anim[args.animated], true)
   .addField('Created At', moment.parseZone(args.createdAt).locale('en').format('dd, DD-MM-YYYY, HH:mm'))
   message.channel.send(embed1);
 }

}
