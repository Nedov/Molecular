const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({
  disableEveryone: true
});
bot.commands = new Discord.Collection();
bot.events = new Discord.Collection();
const config = require("./config.json");
const ms = require("ms");
const moment = require("moment");
const ta = require("time-ago");
const dateformat = require("dateformat");
const tools = require('./functions.js');
const encode = require('strict-uri-encode');
const ascii = require('ascii-art');
const db = require('quick.db');
const math = require('mathjs');
const xp = require('./storage/xp.json')
const Canvas = require('canvas');
const snekfetch = require('snekfetch');
const active = new Map();
const items = JSON.parse(fs.readFileSync('items.json', 'utf-8'));




let ops = {
  active: active
}



// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventStart = eventFunction.run.bind(null, bot);
    let eventName = file.split(".")[0];
    bot.events.set(eventName, eventStart)
    bot.on(eventName, (...args) => eventFunction.run(bot, ...args));
  });
});

bot.on('error', console.error);
bot.on("message", async message => {

  // handler
  if (message.author.bot) return;
  if (message.content.indexOf(config.prefix) !== 0) return;

  // This is the best way to define args. Trust me.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(bot, message, args, ops, tools, config);
  } catch (err) {
    console.error(err);
  }
});

// LEVEL
// bot.on("message", message => {
//   if(message.guild.id !== "504005061186420757") return;
//
//
//   if(message.author.bot) return;
//   let xpAdd = Math.floor(Math.random() * 7) + 8;
//    console.log(xpAdd);
//
//    if(!xp[message.author.id]){
//      xp[message.author.id] = {
//        xp: 0,
//        level: 1
//      };
//    }
//
//    let color = message.member.displayHexColor;
//
//    let curxp = xp[message.author.id].xp;
//    let curlvl = xp[message.author.id].level;
//    let nxtLvl = xp[message.author.id].level * 300;
//    xp[message.author.id].xp =  curxp + xpAdd;
//    if(nxtLvl <= xp[message.author.id].xp){
//      xp[message.author.id].level = curlvl + 1;
//      let lvlup = new Discord.RichEmbed()
//      .setTitle("Level Up!")
//      .setColor(color)
//      .addField("New Level", curlvl + 1);
//
//      message.channel.send(lvlup).then(msg => {msg.delete(5000)});
//    }
//    fs.writeFile("./storage/xp.json", JSON.stringify(xp), (err) => {
//      if(err) console.log(err)
//    });
// })


bot.setInterval(() => {
  let Status = [
    `on ${bot.guilds.size} servers`,
    `m^help 1-3`,
    `with ${bot.users.size} members`,
  ];

  bot.user.setActivity(Status[Math.floor(Math.random() * Status.length)], {
    "type": "WATCHING"
  });

}, 10 * 1000);


// bot.on('messageDelete', message => {
//   const arr = [];
//   message.attachments.map(c => arr.push(c.proxyURL));
//   arr.forEach(p => {
//     const embet = new Discord.RichEmbed()
//       .setTitle('Logs')
//       .setDescription(p)
//     message.channel.send(embet)
//   });
// })



bot.login(process.env.BOT_TOKEN);
