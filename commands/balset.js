const economy = require('discord-eco');
const config = require("../config.json");

module.exports.run = async (bot, message) => {

  let cont = message.content.slice(config.prefix.lenght).split(" ");
  let args = cont.slice(1);

  if (!config.owners.includes(message.author.id)) return message.channel.send(`<@${message.author.id}> You don'\t to have permissions`);

  if (!args[0]) return message.channel.send('Use: m^balset <amount> <user>');

  if (isNaN(args[0])) {
    message.channel.send(`Use: m^balset <amount> <user>`);
    return;
  }

  let definduser = '';
  if (!args[1]) {
    definduser = message.author.id;
  } else {
    let firsmentioned = message.mentions.users.first();
    definduser = firsmentioned.id;
  }

  economy.updateBalance(definduser + message.guild.id, parseInt(args[0])).then((i) => {
    message.channel.send(`User defined had ${args[0]} added/removed from their accound`)
  });

}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["setbal"],
  categories: ['Economy']
};

exports.help = {
  name: "balset",
  description: "Add money to user balance",
  usage: "balset <amount> <user>"
};
