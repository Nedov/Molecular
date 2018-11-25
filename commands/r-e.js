const config = require("../config.json");

exports.run = (bot, message, args) => {

  if (!config.owners.includes(message.author.id)) return message.channel.send(`<@${message.author.id}> You don'\t to have permissions`);

  try {
    delete require.cache[require.resolve(`../Molecular`)];

  } catch (e) {

    return console.log(e);
  }

  message.reply(`Successfully restarted **${config.prefix}${args[0]}**`);

}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["re"],
  categories: ['OWNER']
};

exports.help = {
  name: "r-e",
  description: "events reload command",
  usage: "r-e <event>"
};
