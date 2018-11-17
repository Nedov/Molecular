const Discord = require("discord.js");
const ms = require("ms");
const moment = require("moment");
//!tempmute @user 1s/m/h/d

module.exports.run = async (bot, message, args) => {


  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Missing permissions.");
  if (args[0] == "help") {
    message.reply("Usage: m^unmute");
    return;
  }
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!tomute) return message.reply("Couldn't find user.");
  if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't unmute them!");

  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if (!muterole) {
    try {
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions: []
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }
  //end of create role


  try {
    await tomute.send(`Hey! You've been unmuted!`)
  } catch (e) {
    message.channel.send(`A user has been unmuted... but their DMs are locked.`)
  }

  let muteembed = new Discord.RichEmbed()
    .setDescription(`Unmute executed by ${message.author}`)
    .setColor("#fffffff")
    .addField("Unmuted User", tomute)
    .addField("Time", moment.parseZone(message.createdAt).locale('en').format('dd, DD-MM-YYYY, HH:mm'));

  let incidentschannel = message.guild.channels.find(`name`, "incidents");
  if (!incidentschannel) return message.reply("Please create a `incidents` channel first!");
  incidentschannel.send(muteembed);

  await (tomute.removeRole(muterole.id));
  message.channel.send('Unmutted');



  //end of module
}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["um"],
  categories: ['mod commands']
};

exports.help = {
  name: "unmute",
  description: "Unmute command",
  usage: "unmute <user>"
};
