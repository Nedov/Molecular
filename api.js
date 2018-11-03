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
const db = require('quick.db');
const math = require('mathjs');
const xp = require('./storage/xp.json')
const Canvas = require('canvas');
const snekfetch = require('snekfetch');
const active = new Map();

const serverStats = {
  guildID: '504005061186420757',
  totalUsersID: '506058168321703939',
  memberCountID: '506058325851373578',
  botCountID: '506058402452209689'
}

let ops = {
  ownerID: ownerID,
  active: active
}



// fs.readdir("./events/", (err, files) => {
//   if (err) return console.error(err);
//   files.forEach(file => {
//     let eventFunction = require(`./events/${file}`);
//     let eventName = file.split(".")[0];
//     // super-secret recipe to call events with all their proper arguments *after* the `bot` var.
//     bot.on(eventName, (bot, message, args) => eventFunction.run(bot, message, args));
//   });
// });


bot.on("message", message => {


  // handler
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



bot.on('message', async message => {


  if(message.author.bot) return;
  let blacklisted = ['Hui', 'gay', 'gey'];

  let foundInText = false;
  for (var i in blacklisted) {
    if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
  }

  if (foundInText) {
    message.delete();
    message.reply('Sorry, that word in blacklist!');
  }
});

const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');

    // Declare a base size of the font
    let fontSize = 70;

    do {
        // Assign the font to the context and decrement it so it can be measured again
        ctx.font = `${fontSize -= 10}px sans-serif`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (ctx.measureText(text).width > canvas.width - 300);

    // Return the result to use in the actual canvas
    return ctx.font;
};


bot.on('guildMemberAdd', async member => {

const guil = member.guild.id !== "504005061186420757" || "343572980351107077";
if(!guil) return;

    const channel = member.guild.channels.find(ch => ch.name === 'bot-spam');
    if (!channel) return;

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./wallpaper.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Slightly smaller text placed above the member's display name
    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

    // Add an exclamation point here and below
    ctx.font = applyText(canvas, `${member.displayName}!`);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL);
    const avatar = await Canvas.loadImage(buffer);
    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

    channel.send(`Welcome to the server, ${member}!`, attachment);

    var role = member.guild.roles.find("id", "505441738417111055");
    member.addRole(role);
});

bot.on('guildMemberRemove', async member => {
  const guil = member.guild.id !== "504005061186420757" || "343572980351107077";
  if(!guil) return;

  const channel = member.guild.channels.find(ch => ch.name === 'bot-spam');
  if (!channel) return;

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./wallpaper.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Slightly smaller text placed above the member's display name
    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Bye Bye,', canvas.width / 2.5, canvas.height / 3.5);

    // Add an exclamation point here and below
    ctx.font = applyText(canvas, `${member.displayName}!`);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL);
    const avatar = await Canvas.loadImage(buffer);
    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

    channel.send(`Cya, ${member}!`, attachment);
});

  bot.login(config.token);
