const Discord = require('discord.js'); // I'm requiring discord.js since we will be using Embeds.
const config = require('../config.json')
const Canvas = require('canvas');
const snekfetch = require('snekfetch');


exports.run = async (bot, message, args, tools) => {


const captcha = Math.random().toString(36).slice(-10);
let member = message.member;
//CANVAS
const canvas = Canvas.createCanvas(700, 250);
const ctx = canvas.getContext('2d');

const background = await Canvas.loadImage('./ceptcha.jpg');
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

ctx.strokeStyle = '#74037b';
ctx.strokeRect(0, 0, canvas.width, canvas.height);

// Select the font size and type from one of the natively available fonts
ctx.font = '60px sans-serif';
// Select the style that will be used to fill the text in
ctx.fillStyle = '#ffffff';
// Actually fill the text with a solid color
ctx.fillText(`${captcha}`, canvas.width / 2.5, canvas.height / 1.8);

ctx.beginPath();
ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
ctx.closePath();
ctx.clip();

const { body: buffer } = await snekfetch.get(member.user.avatarURL);
const avatar = await Canvas.loadImage(buffer);
ctx.drawImage(avatar, 25, 25, 200, 200);

const attachment = new Discord.Attachment(canvas.toBuffer(), 'captcha.png');

message.channel.send(attachment).then(() => {
  message.channel.awaitMessages(m => m.content.match(captcha) && m.author.id === message.author.id, {max: 1, time: 15000, errors: ['time']})
        .then(collected => {
          message.channel.send(`You got the right awnser! You received **nothing!**`)
        })
    .catch(collected => message.channel.send('You have run out of time!'));
})

}

// ⏪⏩
// Now, we can test it. Make sure you add some pages though.
exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  categories: ['tests']
};

exports.help = {
  name: "test",
  description: "test command",
  usage: "test"
};
