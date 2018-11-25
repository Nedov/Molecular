const Discord = require('discord.js');
const Canvas = require('canvas');
const snekfetch = require('snekfetch');


exports.run = async(bot, message, args, ops) => {
  message.delete();

  let toverify = message.member;

  const captcha = Math.random().toString(36).slice(-10);



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

  const { body: buffer } = await snekfetch.get(toverify.user.avatarURL);
  const avatar = await Canvas.loadImage(buffer);
  ctx.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new Discord.Attachment(canvas.toBuffer(), 'captcha.png');

  let verifyrole = message.guild.roles.find(`name`, "Verified User");
  if (!verifyrole) {
    try {
      verifyrole = await message.guild.createRole({
        name: "Verified User",
        color: "#000000",
        permissions: []
      })
    } catch (e) {
      console.log(e.stack);
    }
  }

  let delrole = message.guild.roles.find(`name`, "Need Verification");
  if (!delrole) {
    try {
      delrole = await message.guild.createRole({
        name: "Need Verification",
        color: "#000000",
        permissions: []
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(delrole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          READ_MESSAGES: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }




  if (message.channel.name !== 'verification') return message.reply('You must go to the channel #verification');

    if (message.member.roles.has(verifyrole.id)) {
        let verifyEmbed = new Discord.RichEmbed()
            .setAuthor(message.member.displayName, message.author.displayAvatarURL)
            .setColor('#36393f')
            .setDescription('Your account has already been verified!')
        return message.channel.send((verifyEmbed)).then(msg => msg.delete(5000));
    } else {

      message.channel.send(attachment).then(msg => msg.delete(25000)).then(() => {
        message.channel.awaitMessages(m => m.content.match(captcha) && m.author.id === message.author.id, {max: 1, time: 20000, errors: ['time']})
              .then(async (collected) => {

await toverify.removeRole(delrole.id);
await toverify.addRole(verifyrole.id);
          const role = member.guild.roles.find(role => role.name === 'Новички');
await toverify.addRole(role.id);
                message.channel.send(`You got the right awnser! You received **nothing!**`).then(msg => msg.delete(5000))
                        let verifembed = new Discord.RichEmbed()
                            .setTitle("Verified Users - Logs")
                            .setThumbnail(toverify.user.avatarURL)
                            .setColor('#a5f23a')
                            .addField("Verified User", `${toverify}`, true)
                            .setTimestamp();

                        let veriflog = message.guild.channels.find(`name`, "verify-logs");
                        if (!veriflog) return message.channel.send("Could not find the `Verification User Log Channel.`").then(msg => msg.delete(5000));

                        veriflog.send(verifembed);
              })
          .catch(collected => {
            console.log(collected);
            message.channel.send('You have run out of time!').then(msg => msg.delete(5000));
          })
      })



}
}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ['ver'],
  categories: ['tests']
};

exports.help = {
  name: "verify",
  description: "verify command",
  usage: "verify <user>"
};
