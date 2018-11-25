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

module.exports.run = async (bot, message, args) => {

  if (!config.owners.includes(message.author.id)) return message.channel.send(`<@${message.author.id}> You don'\t to have permissions`);

  const code = args.join(" ")
    .replace(/bot\.token|bot\[.token.\]/ig, 'kthxbai')
    .replace("config.json", 'kthbai');
  try {
    let evaled = eval(code);
    if (!code) {
      return message.channel.send("нужна больше кода!");
    }

    if (typeof evaled !== 'string')
      evaled = require('util').inspect(evaled);

    const embed = new Discord.RichEmbed()
      .setTitle(`EVAL ✅`)

      .setColor("0x4f351")
      .setDescription(`📥 Input: \n \`\`\`${code}\`\`\` \n 📤 Output: \n  \`\`\`${(evaled)}\`\`\``)

    message.channel.send({
      embed
    });
  } catch (err) {
    const embed = new Discord.RichEmbed()
      .setTitle(`EVAL ❌`)

      .setColor("0xff0202")
      .setDescription(`📥 Input: \n \`\`\`${code}\`\`\` \n 📤 Output: \n  \`\`\`${(err)}\`\`\``)

    message.channel.send({
      embed
    });
  }
}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["e2", "ev2"],
  categories: ['OWNER']
};

exports.help = {
  name: "eval2",
  description: "Eval command",
  usage: "eval"
};
