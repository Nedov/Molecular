const Discord = require("discord.js");
const config = require('../config.json');
const moment = require("moment");


module.exports.run = async (bot, message, args) => {


  if (!config.mban.includes(message.author.id)) return message.channel.send(`<@${message.author.id}> You don\'t to have permissions`);


  if (!args[0] || isNaN(args[0])) return message.channel.send('Please, enter a user ID');
  if (args[0]) {
    try {
      let servers = ['404980768302039061', '469630074061062154', '452877065390391296', '469628190483283988', '504005061186420757', '511233067247992865', '248111395420241920', '478933393757962242'];
      let bUser = args[0];
      if (!bUser) return errors.cantfindUser(message.channel);
      if (bUser.id === bot.user.id) return errors.botuser(message);
      args.shift();
      let bReason = args.join(" ");
      if(!bReason) bReason = "No reason given";
      servers.forEach(s => {
        message.channel.send(bot.guilds.get(s).ban(bUser))
      });
    try {
    await tomute.send(`Ты зобанен по причине "пидорас" \nхочешь вернуться? \nпиши в лс @! ЛАОДАО#6666\nYou're banned for ${bReason}\nwanna go back? \nwrite in DM @! LAODAO#6666\n\nThe union of Pepestan's servers:\nhttps://discord.gg/TVw8NKv    <-Republic of Pepestan (russian server)\nhttps://discord.gg/ufkZrXC   <--  ! Pepe's Kungahus  (english server)\nhttps://discord.gg/fAHf8bC   <--  ➤Dizzy 2.0  (english server)\nhttps://discord.gg/uRbSmD6   <--  ! Regression   (russian server)\nhttps://discord.gg/NS58VYv   <--  VOEP  (russian server)`) // Пишет в лс челу`} catch (e) {
    } catch (e) {
      message.channel.send(`A user has been banned... but their DMs are locked. They will be banned for ${bReason}`) //Если ошибка пишет на сирвер
  }
     

      let banEmbed = new Discord.RichEmbed()
        .setDescription("Ban")
        .setColor("#bc0000")
        .addField("Banned User", `<@${bUser}> with ID ${bUser}`)
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

exports.conf = {
  enabled: true, // not used yet
  guildOnly: true, // not used yet
  aliases: ["multiban", "mb"],
  categories: ['PEPESTAN FAMILY']
};

exports.help = {
  name: "t",
  description: "Multiban command (ONLY PEPESTAN COMMAND)",
  usage: "mb <userID>"
};
