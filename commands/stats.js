const Discord = require("discord.js")

const {
  version
} = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")

module.exports.run = async (bot, message, args) => {

  let bmembers = 0;
  let uss = 0;
  bot.guilds.forEach(g => {
    uss = uss + g.memberCount;
    bmembers = uss
  })

  let cpuLol;
  cpuStat.usagePercent(function(err, percent, seconds) {
    if (err) {
      return console.log(err);
    }


    const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

    if (!args[0]) {
      let embedStats = new Discord.RichEmbed()
        .setAuthor(bot.user.username)
        .setTitle("***BOT Stats***")
        .setColor("RANDOM")
        .setDescription(`[WebSite](https://molecular.glitch.me/main/) | [Support Server](https://discord.gg/5YtKzWv) | [Invite](https://discordapp.com/oauth2/authorize?client_id=490609897176563735&scope=bot&permissions=2146958847)`)
        .addField("• <a:molecularIDLE:508010885558566931>Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
        .addField("• <a:molecularONLINE:508010883356688395>Uptime ", `${duration}`, true)
        .addField("• <a:molecularSTREAMING:508010883889496064>Users", `${bmembers.toLocaleString()}`, true)
        .addField("• <a:molecularSTREAMING:508010883889496064>Servers", `${bot.guilds.size.toLocaleString()}`, true)
        .addField("• <a:molecularSTREAMING:508010883889496064>Channels ", `${bot.channels.size.toLocaleString()}`, true)
        .addField("• Discord.js", `v${version}`, true)
        .addField("• Node", `${process.version}`, true)
        .addField("• API Latency", `${Math.round(bot.ping)}ms`)
      message.channel.send(embedStats)
    }
    if (args[0] === 'ping') {
      let embedStats = new Discord.RichEmbed()
        .setAuthor(bot.user.username)
        .setTitle("***BOT Stats***")
        .setColor("RANDOM")
        .setDescription(`[WebSite](https://molecular.glitch.me/main/) | [Support Server](https://discord.gg/5YtKzWv) | [Invite](https://discordapp.com/oauth2/authorize?client_id=490609897176563735&scope=bot&permissions=2146958847)`)
        .addField("API Latency", `${Math.round(bot.ping)}ms`)
      message.channel.send(embedStats)

    }
    if (args[0] === 'uptime') {
      let embedStats = new Discord.RichEmbed()
        .setAuthor(bot.user.username)
        .setTitle("***BOT Stats***")
        .setColor("RANDOM")
        .setDescription(`[WebSite](https://molecular.glitch.me/main/) | [Support Server](https://discord.gg/5YtKzWv) | [Invite](https://discordapp.com/oauth2/authorize?client_id=490609897176563735&scope=bot&permissions=2146958847)`)
        .addField("• <a:molecularONLINE:508010883356688395>Uptime ", `${duration}`, true)
      message.channel.send(embedStats)
    }
    if (args[0] === 'guild') {
      let embedStats = new Discord.RichEmbed()
        .setAuthor(bot.user.username)
        .setTitle("***BOT Stats***")
        .setColor("RANDOM")
        .setDescription(`[WebSite](https://molecular.glitch.me/main/) | [Support Server](https://discord.gg/5YtKzWv) | [Invite](https://discordapp.com/oauth2/authorize?client_id=490609897176563735&scope=bot&permissions=2146958847)`)
        .addField("• <a:molecularSTREAMING:508010883889496064>Users", `${bmembers.toLocaleString()}`, true)
        .addField("• <a:molecularSTREAMING:508010883889496064>Servers", `${bot.guilds.size.toLocaleString()}`, true)
        .addField("• <a:molecularSTREAMING:508010883889496064>Channels ", `${bot.channels.size.toLocaleString()}`, true)
      message.channel.send(embedStats)
    }
    if (args[0] === 'general') {
      let embedStats = new Discord.RichEmbed()
        .setAuthor(bot.user.username)
        .setTitle("***BOT Stats***")
        .setColor("RANDOM")
        .addField("• <a:molecularIDLE:508010885558566931>Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
        .addField("• Discord.js", `v${version}`, true)
        .addField("• Node", `${process.version}`, true)
      message.channel.send(embedStats)
    }


  });
};


exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["stat", "about", "s"],
  categories: ['General']
};

exports.help = {
  name: "stats",
  description: "Bot stat",
  usage: "stats"
};
