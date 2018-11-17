const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {

  let rando_imgs = [
    'https://media.giphy.com/media/QbkL9WuorOlgI/giphy.gif',
    'https://media.giphy.com/media/llmZp6fCVb4ju/giphy.gif',
    'https://media.giphy.com/media/HjlKKc14d5tBK/giphy.gif',
    'https://media.giphy.com/media/HjlKKc14d5tBK/giphy.gif',
    'https://media.giphy.com/media/gnXG2hODaCOru/giphy.gif',
  ]

  if (message.mentions.members.size == 1) {
    let member = message.mentions.members.first()

    const rhug = rando_imgs[Math.floor(Math.random() * rando_imgs.length)]


    const embed = {
      "description": `${message.author} hugged ${member}!`,
      "color": 12916630,
      "footer": {
        "text": `Author: ${message.author.tag}`
      },
      "image": {
        "url": rhug
      },
    };
    message.channel.send({
      embed
    });


  }

  if (!args[0]) {
    const embed = {
      "title": "BOT Error || Mention a user",
      "description": "Usage: m^hug <user>",
      "color": 13632027,
    };
    message.channel.send({
      embed
    });

  }

}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  categories: ['Fun']
};

exports.help = {
  name: "hug",
  description: "Hug command",
  usage: "hug <user>"
};
