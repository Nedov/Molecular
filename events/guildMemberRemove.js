const Discord = require("discord.js");

const Canvas = require('canvas');

const snekfetch = require('snekfetch');

const serverStats = {
  guildID: '504005061186420757',
  totalUsersID: '506058168321703939',
  memberCountID: '506058325851373578',
  botCountID: '506058402452209689'
}

//PEPESTAN
const serverStats2 = {
  guildID: '248111395420241920',
  totalUsersID: '513008847514763274'
}

module.exports.run = async (bot, member) => {

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

  if (member.guild.id === serverStats.guildID) {

    // Molecular Support
    bot.channels.get(serverStats.totalUsersID).setName(`Total users : ${member.guild.memberCount}`);
    bot.channels.get(serverStats.memberCountID).setName(`Member count : ${member.guild.members.filter(m => !m.user.bot).size}`);
    bot.channels.get(serverStats.botCountID).setName(`Bot count : ${member.guild.members.filter(m => m.user.bot).size}`);

  } else if (member.guild.id === serverStats2.guildID) {
    bot.channels.get(serverStats2.totalUsersID).setName(`🐸Total Pepos : ${member.guild.memberCount}`);
  }



  const channel = member.guild.channels.get(ch => ch.id === '505815219482918935');
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
  ctx.font = applyText(canvas,
    `${member.displayName}!`);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

  ctx.beginPath();
  ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  const {
    body: buffer
  } = await snekfetch.get(member.user.displayAvatarURL);
  const avatar = await Canvas.loadImage(buffer);
  ctx.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

  channel.send(`Cya, ${member}!`, attachment);
}
