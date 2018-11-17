const {
  inspect
} = require("util");
const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const moment = require("moment");
const ta = require("time-ago");
const dateformat = require("dateformat");
const tools = require('../functions.js');
const encode = require('strict-uri-encode');
const ascii = require('ascii-art');
const db = require('quick.db');
const math = require('mathjs');
const xp = require('../storage/xp.json')
const Canvas = require('canvas');
const snekfetch = require('snekfetch');
const cowsay = require('cowsay');
const superagent = require("superagent");
const config = require("../config.json");

module.exports.run = async (bot, message, args, ops) => {

  if (!config.owners.includes(message.author.id)) return message.channel.send(`<@${message.author.id}> You don'\t to have permissions`);

  const code = args.join(" ")
    .replace(/bot\.token|bot\[.token.\]/ig, 'kthxbai')
    .replace("config.json", 'kthbai');
  const token = bot.token.split("").join("[^]{0,2}");
  const rev = bot.token.split("").reverse().join("[^]{0,2}");
  const filter = new RegExp(`${token}|${rev}`, "g");
  try {
    let output = eval(code);
    if (output instanceof Promise || (Boolean(output) && typeof output.then === "function" && typeof output.catch === "function")) output = await output;
    output = inspect(output, {
      depth: 0,
      maxArrayLength: null
    });
    output = output.replace(filter, "[TOKEN]");
    output = clean(output);
    if (output.length < 1950) {
      //Отправляет пользователю данные эмуляции.
      message.author.send(`\`\`\`js\n${output}\n\`\`\``);
      //Ставит реакцию (выполнено).
      message.react("✅")
    } else {
      message.author.send(`${output}`, {
        split: "\n",
        code: "js"
      });
    }
  } catch (error) {
    //Захватывает ошибку и говорит об этом.
    message.channel.send(`Error \`\`\`js\n${error}\`\`\``);
    //Ставит реакцию (Ошибка).
    message.react("❎")
  }

  function clean(text) {
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  }
}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["e", "ev"],
  categories: ['OWNER']
};

exports.help = {
  name: "eval",
  description: "Eval command",
  usage: "eval"
};
