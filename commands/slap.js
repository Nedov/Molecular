const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {

  let rando_imgs = [
    'https://media.giphy.com/media/3XlEk2RxPS1m8/giphy.gif',
    'https://media.giphy.com/media/55TZk1pnXsBQA/giphy.gif',
    'https://media.giphy.com/media/gSIz6gGLhguOY/giphy.gif',
    'https://media.giphy.com/media/uG3lKkAuh53wc/giphy.gif',
    'https://media.giphy.com/media/w5FSoU86sXRFm/giphy.gif',
  ]

  if (message.mentions.members.size == 1) {
    let member = message.mentions.members.first()

    const rslap = rando_imgs[Math.floor(Math.random() * rando_imgs.length)]


    const embed = {
      "description": `${message.author} slap ${member}!`,
      "color": 12916630,
      "footer": {
        "text": `Author: ${message.author.tag}`
      },
      "image": {
        "url": rslap
      },
    };
    message.channel.send({
      embed
    });



  }

  if (!args[0]) {
    const embed = {
      "title": "BOT Error || Mention a user",
      "description": "Usage: m^slap <user>",
      "color": 13632027,
    };
    message.channel.send({
      embed
    });

  }

}
