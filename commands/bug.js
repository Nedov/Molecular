const Discord = require('discord.js');
const superagent = require("superagent");

module.exports.run = async (bot, message, args, tools) => {

  try {
    function clean(text) {
      if (typeof(text) === 'string')
        return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
      else
        return text;
    }
    const bug = args.join(" ")
    if (!bug) return message.channel.send('Please specify a bug!')
    const content = clean(`**${message.author.username}**#${message.author.discriminator} (${message.author.id}) reported a bug:\n${bug}\nServer: **${message.guild.name}**\nID: **${message.guild.id}**`);
    const id = '506343805729898507';
    new Promise((resolve, reject) => {
      superagent.post(`https://discordapp.com/api/channels/${id}/messages`)
        .set('Authorization', `Bot ${bot.token}`).send({
          content
        })
        .end((err, res) => {
          if (err) {
            reject(err);
            message.reply('There was an error while sending your bug report to Molecular Support. Please try again later.');
          } else {
            resolve(res);
            message.channel.send(`:white_check_mark: **${message.author.username}**, your bug report has successfully been submitted to Frogbot Support for review. Thank you!.`);
          }
        });
    });
  } catch (err) {
    console.log(err)
  }
}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["rbug"],
  categories: ['General']
};

exports.help = {
  name: "bug",
  description: "Bug report command",
  usage: "bug <bug>"
};
