const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({
  disableEveryone: true
});
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
let cooldown = new Set();
let cdseconds = 5;


let ops = {
  active: active
}
const log = (msg) => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${msg}`);
};

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.categories = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Loading Command: ${props.help.name}.`);
    bot.commands.set(props.help.name, props);
    props.conf.categories.forEach(category => {
      bot.categories.set(category, props.help.name)
    });
    props.conf.aliases.forEach(alias => {
      bot.aliases.set(alias, props.help.name);
    });
  });
});

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventtoolstion = require(`./events/${file}`);
    let eventStart = eventtoolstion.run.bind(null, bot);
    let eventName = file.split(".")[0];
    bot.events.set(eventName, eventStart)
    bot.on(eventName, (...args) => eventtoolstion.run(bot, ...args));
  });
});

bot.on("error", console.error);
bot.on("message", async message => {

  // handler
  if (!message.content.startsWith(config.prefix)) return;
  if (cooldown.has(message.author.id)) {
    message.delete();
    return message.reply('You have to wait 5 seconds between commands.')
  }
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    cooldown.add(message.author.id);
  }
  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)


  if (!message.content.startsWith(config.prefix)) return;
  let command = message.content.split(" ")[0].slice(config.prefix.length);
  let args = message.content.split(" ").slice(1);
  let commands;
  if (bot.commands.has(command)) {
    commands = bot.commands.get(command);
  } else if (bot.aliases.has(command)) {
    commands = bot.commands.get(bot.aliases.get(command));
  } else if (bot.categories.has(command)) {
    commands = bot.commands.get(bot.categories.get(command));
  }
  if (commands) {
    commands.run(bot, message, args, tools, ops);
  }


  // if (message.author.bot) return;
  // if (message.channel.type != 'text') return message.channel.send('Please use commands in the server!')

  // // Global Settings - We need the prefix to change every time a message is run.
  // db.fetch(`guildPrefix_${message.guild.id}`).then(i => { // This fetches the current prefix, if none is supplied it would be an empty string.
  //
  //   let prefix;
  //
  //   if (i.text) { // This will run if i.text(exisiting prefix) is defined...
  //     prefix = i.text
  //   } else { // This will run if i.text(existing prefix) is not defined...
  //     prefix = 'm^' // You can set this to your default prefix
  //   }
  // })

});

bot.reload = function(command) {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      bot.commands.delete(command);
      bot.aliases.forEach((cmd, alias) => {
        if (cmd === command) bot.aliases.delete(alias);
      });

      bot.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        bot.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
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
    `m^help [command]`,
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

// bot.on('guildMemberAdd', member => { // Make sure this is defined correctly.
//
//
//   // The code will go here, inside the other fetch. If you don't have that fetch don't worry just put it in bot.on('guildMemberAdd').
//
//   // Fetch the channel we should be posting in - FIRST, we need to require db in this app.js
//   let i = db.fetch(`messageChannel_${member.guild.id}`)
//
//   // Fetch Welcome Message (DMs)
//   let o = db.fetch(`joinMessageDM_${member.guild.id}`)
//
//   // DM User
//   if (!o.text) console.log('Error: Join DM Message not set. Please set one using ~setdm <message>'); // This will log in console that a guild didn't set this up, you dont need to include the conosle.log
//   else tools.embed(member, o.text.replace('{user}', member).replace('{members}', member.guild.memberCount)) // This is where the embed toolstion comes in, as well as replacing the variables we added earlier in chat.
//
//   // Now, return if no message channel is defined
//   if (!member.guild.channels.get(i.text)) return console.log('Error: Welcome/Leave channel not found. Please set one using ~setchannel #channel') // Again, this is optional. just the console.log not the if statement, we still want to return
//
//   // Fetch the welcome message
//   let p = db.fetch(`joinMessage_${member.guild.id}`)
//
//   // Check if they have a join message
//   if (!p.text) console.log('Error: User Join Message not found. Please set one using ~setwelcome <message>')
//   else tools.embed(member.guild.channels.get(i.text), p.text.replace('{user}', member).replace('{members}', member.guild.memberCount)) // We actually want to send the message.
//
//
// });
//
// // Now, since we're done with the welcome. lets do the leave
// bot.on('guildMemberRemove', member => {
//
//   // Fetch Channel
//   let i = db.fetch(`messageChannel_${member.guild.id}`)
//
//   // If the channel is not found, return.
//   if (!member.guild.channels.get(i.text)) return console.log('Error: Welcome/Leave channel not found. Please set one using ~setchannel #channel')
//
//   // Fetch Leave Message
//   let o = db.fetch(`leaveMessage_${member.guild.id}`)
//
//   // Check if o.text is defined
//   if (!o.text) console.log('Error: User leave message not found. Please set one using ~setleave <message>')
//   else tools.embed(member.guild.channels.get(i.text), o.text.replace('{user}', member).replace('{members}', member.guild.memberCount)) // Now, send the message.
//
//
//
// });



bot.login(process.env.BOT_TOKEN);
