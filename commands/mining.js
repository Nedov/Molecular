const economy = require('discord-eco');

module.exports.run = async (bot, message, args) => {
  economy.updateBalance(message.author.id + message.guild.id, 500).then((i) => { // economy.updateBalance grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
    message.channel.send(`**You got $500!**\n**New Balance:** ${i.money}`);
  })
};
