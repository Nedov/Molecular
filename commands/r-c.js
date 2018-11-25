const config = require("../config.json");

exports.run = (bot, message, args) => {

  if (!config.owners.includes(message.author.id)) return message.channel.send(`<@${message.author.id}> You don\'t to have permissions`);

  let command;
  if (bot.commands.has(args[0])) {
    command = args[0];
  } else if (bot.aliases.has(args[0])) {
    command = bot.aliases.get(args[0]);
  }
  if (!command) {
    return message.channel.sendMessage(`I cannot find the command: ${args[0]}`);
  } else {
    message.channel.sendMessage(`Reloading: ${command}`).then(msg => msg.delete(5000))
      .then(m => {
        bot.reload(command)
          .then(() => {
            m.edit(`Successfully reloaded: ${command}`);
          })
          .catch(e => {
            m.edit(`Command reload failed: ${command}\n\`\`\`${e.stack}\`\`\``);
          });
      });
  }

}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["rc"],
  categories: ['OWNER']
};

exports.help = {
  name: "r-c",
  description: "Reload Commans command",
  usage: "r-c <command>"
};
