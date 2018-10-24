const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {

  let rando_imgs = [
'https://media.giphy.com/media/QbkL9WuorOlgI/giphy.gif',
'https://media.giphy.com/media/llmZp6fCVb4ju/giphy.gif',
'https://media.giphy.com/media/HjlKKc14d5tBK/giphy.gif',
'https://media.giphy.com/media/HjlKKc14d5tBK/giphy.gif',
'https://media.giphy.com/media/gnXG2hODaCOru/giphy.gif',
]

  if(message.mentions.members.size == 1) {
      let member = message.mentions.members.first()

const rhug = rando_imgs[Math.floor(Math.random() * rando_imgs.length)]


      const embed = {
        "description": `${message.author} обнял(-а) ${member}!`,
        "color": 12916630,
        "footer": {
          "text": `Автор команды: ${message.author.tag}`
        },
        "image": {
          "url": rhug
        },
      };
      message.channel.send({ embed });


}

if (!args[0]) {
  const embed = {
    "title": "BOT Error || Не хватает аргументов",
    "description": "Пример: .hug <user>",
    "color": 13632027,
  };
 message.channel.send({ embed });

}

}
