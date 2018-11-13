const config = require("../config.json");

exports.run = (bot, message, args, ops) => {

  if (!config.owners.includes(message.author.id)) return message.channel.send(`<@${message.author.id}> You don\'t to have permissions`);
  if (!args || args.size < 1) return message.reply("Enter a command name.");

  try {
    delete require.cache[require.resolve(`./${args[0]}.js`)];

  } catch (e) {

    return message.channel.send(`Cannot reload: ${args[0]}`);
  }

  message.reply(`Successfully restarted **${config.prefix}${args[0]}**`);

}
