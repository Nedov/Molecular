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
const items = JSON.parse(fs.readFileSync('items.json', 'utf-8'));
let cooldown = new Set();
let cdseconds = 5;


bot.login(process.env.BOT_TOKEN);


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

// bot.on('messageReactionAdd', (reaction, user) => {
//   console.log(user + ' убраль ' + reaction.emoji.name);
//
// });

bot.on("error", console.error);
bot.on("message", async message => {


  // handler
  if (!message.content.startsWith(config.prefix)) return;
  if (cooldown.has(message.author.id)) {
    message.delete();
    return message.reply('You have to wait 5 seconds between commands.')
  }
  if (!config.owners.includes(message.author.id)) {
    cooldown.add(message.author.id);
  }
  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)


  if (!message.content.startsWith(config.prefix)) return;
  let command = message.content.split(" ")[0].slice(config.prefix.length).toLowerCase();
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
    commands.run(bot, message, args, tools);
  }



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



bot.setInterval(() => {
  let bmembers = 0;
  let uss = 0;
  bot.guilds.forEach(g => {
    uss = uss + g.memberCount;
    bmembers = uss
  });

  let Status = [
    `on ${bot.guilds.size} servers`,
    `m^help [command]`,
    `with ${bmembers.toLocaleString()} members`,
  ];

  bot.user.setActivity(Status[Math.floor(Math.random() * Status.length)], {
    "type": "WATCHING"
  });

}, 10 * 1000);

bot.on('message', async message => {
  if (message.author.bot) return;
  if (message.content === 'лао') { //слово и 3 варианта ответа с рандомным выбором
    let randomanswer = ['дао', 'бао']
    const ranswer = randomanswer[Math.floor(Math.random() * randomanswer.length)]
    message.reply(ranswer)
  } else if (message.content === 'дао') {
    let randomanswer2 = ['лао', 'бао']
    const ranswer2 = randomanswer2[Math.floor(Math.random() * randomanswer2.length)]
    message.reply(ranswer2)
  } else if (message.content === 'бао') {
    let randomanswer3 = ['лао', 'дао']
    const ranswer3 = randomanswer3[Math.floor(Math.random() * randomanswer3.length)]
    message.reply(ranswer3)
  } else if (message.content === 'мисал') {
    let randomanswer4 = ['не мисал, а мисаал', 'в тапки нассал', 'опять нассал?', 'он опять в тапки нассал?']
    const ranswer4 = randomanswer4[Math.floor(Math.random() * randomanswer4.length)]
    message.reply(ranswer4)
  } else if (message.content === 'саси') {
    let randomanswer5 = ['сасу', 'сам саси', 'губой триси', 'бибу', 'я сасу бибу', 'я итак сасу']
    const ranswer5 = randomanswer5[Math.floor(Math.random() * randomanswer5.length)]
    message.reply(ranswer5)
  } else if (message.content === 'нет ты') {
    let randomanswer6 = ['ой всё', 'нет ты', 'карочи иди нахуй', 'а может ты?', 'все таки ты', 'ты, ЯСКОЗАЛ', 'А шо я? я пепе']
    const ranswer6 = randomanswer6[Math.floor(Math.random() * randomanswer6.length)]
    message.reply(ranswer6)
  } else if (message.content === 'дратути') {
    let randomanswer7 = ['дароу', 'дороу', 'Здратути сэр', 'здравствуйте', 'все таки ты', 'ты, ЯСКОЗАЛ', 'А шо я? я пепе']
    const ranswer7 = randomanswer7[Math.floor(Math.random() * randomanswer7.length)]
    message.reply(ranswer7)
  } //else if (message.isMentioned('295468625240915968')) {
  //   message.reply(':gay_pride_flag: GAY:gay_pride_flag: ')
  // }
});
