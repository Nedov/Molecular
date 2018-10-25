const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
const ownerID = "295468625240915968";
const config = require("./config.json");
const ms = require("ms");
const moment = require("moment");
const ta = require("time-ago");
const dateformat = require("dateformat");
const tools = require('./functions.js');
const encode = require('strict-uri-encode');
const ascii = require('ascii-art');


const serverStats = {
  guildID: '478933393757962242',
  totalUsersID: '503591670521266176',
  memberCountID: '503591740435988481',
  botCountID: '503591796866154497'
}

let ops = {
  ownerID: ownerID
}






bot.on("message", message => {
  if (message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  // This is the best way to define args. Trust me.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(bot, message, args, ops, tools);
  } catch (err) {
    console.error(err);
  }
});


bot.on("message", (message) => {
if (message.channel.id == "475976131611328522" || "435349219906158603") {
  if (message.content.endsWith("L&D")) {
    message.react(`👍`).then( r => {
      message.react(`👎`)
        })
      }
    }
  });

bot.on("ready", async () => {

      bot.user.setStatus("dnd");

      console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);

});

bot.setInterval(() => {
    let Status = [
        `on ${bot.guilds.size} servers`,
        `m^help 1-3`,
        `with ${bot.users.size} members`,
    ];

    bot.user.setActivity(Status[Math.floor(Math.random() * Status.length)], { "type": "WATCHING" });


}, 10 * 1000);

  bot.on('guildMemberAdd', member => {

    if(member.guild.id !== serverStats.guildID) return;

    bot.channels.get(serverStats.totalUsersID).setName(`Total users : ${member.guild.memberCount}`);
    bot.channels.get(serverStats.memberCountID).setName(`Member count : ${member.guild.members.filter(m => !m.user.bot).size}`);
    bot.channels.get(serverStats.botCountID).setName(`Bot count : ${member.guild.members.filter(m => m.user.bot).size}`);

  });
  bot.on('guildMemberRemove', member => {

        if(member.guild.id !== serverStats.guildID) return;

    bot.channels.get(serverStats.totalUsersID).setName(`Total users : ${member.guild.memberCount}`);
    bot.channels.get(serverStats.memberCountID).setName(`Member count : ${member.guild.members.filter(m => !m.user.bot).size}`);
    bot.channels.get(serverStats.botCountID).setName(`Bot count : ${member.guild.members.filter(m => m.user.bot).size}`);

  });


  bot.login(process.env.BOT_TOKEN);
