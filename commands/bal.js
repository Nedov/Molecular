const economy = require('discord-eco');

module.exports.run = async (bot, message, args) => {


  let definduser = '';
  if (!args[1]) {
    definduser = message.author.id;
  } else {
    let firsmentioned = message.mentions.users.first();
    definduser = firsmentioned.id;
  }


  economy.fetchBalance(definduser + message.guild.id).then((i) => {
    message.channel.send('You have ' + i.money + ' coins')
  })

}
