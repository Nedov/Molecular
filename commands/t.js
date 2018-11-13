const Discord = require("discord.js")
const errors = require("../utils/errors.js");
const moment = require("moment");


module.exports.run = async (bot, message, args) => {


  if (!message.member.hasPermission("BAN_MEMBERS")) return errors.noPerms(message, "BAN_MEMBERS");
  if (args[0] == "help") {
    message.reply("Usage: m^ban <user> <reason>");
    return;
  }

  if (!args[0] || isNaN(args[0])) return message.channel.send('Please, enter a user ID');
  if (args[0]) {
    try {
      let servers = ['504005061186420757', '511233067247992865', '248111395420241920', '478933393757962242', '478933393757962242'];
      let bUser = args[0];
      if (!bUser) return errors.cantfindUser(message.channel);
      if (bUser.id === bot.user.id) return errors.botuser(message);
      args.shift();
      let bReason = args.join(" ");
      if (!bReason) return errors.noReason(message.channel);
      servers.forEach(s => {
        message.channel.send(bot.guilds.get(s).ban(bUser))
      });


      let banEmbed = new Discord.RichEmbed()
        .setDescription("Ban")
        .setColor("#bc0000")
        .addField("Banned User", `${bUser} with ID ${bUser.id}`)
        .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Banned In", message.channel)
        .addField("Time", moment().locale('en').format('LLLL'))
        .addField("Reason", bReason);
      message.channel.send(banEmbed);
    } catch (err) {
      message.channel.sendCode('js', `Неожиданая ошибка!\n` + err)
    }
  }
};
