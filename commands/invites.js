const Discord = require('discord.js'),
  arraySort = require('array-sort'),
  table = require('table');


module.exports.run = async (bot, message, args) => {
  let invites = await message.guild.fetchInvites().catch(error => {
    return message.channel.send('Sorry, I dont\'t have permissions to viev invites')
  });

  invites = invites.array();

  arraySort(invites, 'uses', {
    reverse: true
  });
  let possibleInvites = [
    ['User', 'Uses']
  ];
  invites.forEach(function(invite) {
    possibleInvites.push([invite.inviter.username, invite.uses]);
  })
  message.channel.sendCode('js', table.table(possibleInvites))

}
exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  categories: ['tests']
};

exports.help = {
  name: "invites",
  description: "test command",
  usage: "test"
};
