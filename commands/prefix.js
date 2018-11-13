const db = require('quick.db');

module.exports = async (bot, message, args) => {

  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Sorry, you don\'t have permission to change server prefix')
    .then(msg => msg.delete({
      timeout: 10000
    }));
  if (!args.join(' ')) return message.channel.send('Please provide a prefix to change server prefix')
    .then(msg => msg.delete({
      timeout: 10000
    }));

  db.set(`prefix_${message.guild.id}`, args.join(' '))
    .then(i => {
      message.channel.send(`Server Prefix has been changed to ${i}`);
    })

};
