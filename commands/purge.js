const Discord = require("discord.js");
const errors = require("../utils/errors.js");


module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
  const deleteCount = parseInt(args[0], 10);

  // Ooooh nice, combined conditions. <3
  if (!deleteCount || deleteCount < 1 || deleteCount > 100)
    return message.reply("Please, enter at 2 to 100 messages to delete");

  // So we get our messages, and delete them. Simple enough, right?
  const fetched = await message.channel.fetchMessages({
    limit: deleteCount
  });
  message.channel.bulkDelete(fetched).then(() => {
      if (deleteCount === -1) fetched = 0;
      message.channel.send(`:white_check_mark: Purged \`${deleteCount}\` messages.`)
        .then(m => m.delete(10000));
    })
    .catch(error => message.reply(`You cannot delete messages because: ${error}`));
}
