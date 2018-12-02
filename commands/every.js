const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  if (message.author.id !== '451267321772900352') return message.channel.send('Missing permission')
  let argss = args.join(' ')
  if (!argss[0] || argss.length > 18 || argss.length < 18 || isNaN(argss)) return message.channel.send('Please, enter a valid role ID');
  if (argss) {

    let role = message.guild.roles.find(r => r.name === argss);

    if (!role) return message.channel.send(`**${message.author.username}**, role not found`);
    message.channel.send(`Starting adding \`${role.name}\` role to ${message.guild.memberCount} users`)
    message.guild.members.filter(m => !m.user.bot).map(async (member) => {
      setInterval(async () => {
        await member.addRole(role).catch(err => {}) /* Убераем срач из логов на случай рейт лимита или прочего говна */
      }, 10000)
    });
    message.channel.send(`**${message.author.username}**, role ` + `\` ${role.name}\`` + ` was added to all members`);
  }
}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: true, // not used yet
  aliases: ["addevery"],
  categories: ['PEPESTAN FAMILY']
};

exports.help = {
  name: "every",
  description: "Give role to everyone",
  usage: "every <rooleID>"
};
