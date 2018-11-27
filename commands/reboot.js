const {RichEmbed} = require("discord.js"); // [package required: discord.js]
exports.run = async (bot, message, args) => {
  // EMBED
  let embed = new RichEmbed()
  .setColor("#ff1d00")
  .setTitle("Bot is shutting down!")
  await message.channel.send(embed); // send the embed
  // unload all commands before shutting down

  // you can always leave out this code // (cmd part)
  bot.commands.forEach( async commands  => {
    await bot.unloadCommand(commands);
  }); // end of cmd function

  // shut down the bot
 bot.destroy()
  bot.login(process.env.BOT_TOKEN)
}; // end of code

exports.conf = {
  enabled: true,
  guildOnly: false,
  categories: ['Owner'],
  aliases: ["boot off", "shutdown"]
};

exports.help = {
  name: "reboot",
  description: "Shuts down the bot",
  usage: "reboot"
};
