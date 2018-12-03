const Discord = require("discord.js");
const ms = require("ms");
const moment = require("moment");

//!tempmute @user 1s/m/h/d

module.exports.run = async (bot, message, args) => {


  if (!message.author.hasPermission("MANAGE_MESSAGES")) return message.reply("Missing permissions.");
  if (args[0] == "help") {
    message.reply("Usage: m^mute <user> <1s/m/h/d>");
    return;
  }
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!tomute) return message.reply("Couldn't find user.");
  if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
  let reason = args.slice(22).join(" ");
  if (!reason) return message.reply("Please supply a reason.");

  let muterole = message.guild.roles.find(r => r.name === "gulag");
  //start of create role
  if (!muterole) {
    try {
      muterole = await message.guild.createRole({
        name: "gulag",
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
  let mutetime = args[1];
  if (!mutetime) return message.reply("You didn't specify a time!");

  message.delete().catch(O_o => {});

  try {
    await tomute.send(`Hey! You've been muted for ${mutetime}. Sorry :(`)
  } catch (e) {
    message.channel.send(`A user has been muted... but their DMs are locked. They will be muted for ${mutetime}`)
  }

  let muteembed = new Discord.RichEmbed()
    .setDescription(`Mute executed by ${message.author}`)
    .setColor(0xffffff)
    .addField("Muted User", tomute)
    .addField("Muted in", message.channel)
    .addField("Time", moment.parseZone(message.createdAt).locale('en').format('dd, DD-MM-YYYY, HH:mm'))
    .addField("Length", mutetime)
    .addField("Reason", reason);

  let incidentschannel = message.guild.channels.find(ch => ch.name === "incidents");
  if (!incidentschannel) return message.reply("Please create a `incidents` channel first!");
  incidentschannel.send(muteembed);

  await (tomute.addRole(muterole.id));

  setTimeout(function() {
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));


  //end of module
}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["tempmute"],
  categories: ['mod commands']
};

exports.help = {
  name: "mute",
  description: "Tempmute command",
  usage: "mute <user> <1/s/m/h/d>"
};
