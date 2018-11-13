const Discord = require("discord.js");

module.exports.run = async (bot) => {


  bot.user.setStatus("dnd");

  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  console.log(`   __             _                                  _     `);
  console.log(`  / _|           | |                                | |    `);
  console.log(` | |_ _   _ _ __ | | ___ _ __  _ __  _   _ ___ _   _| |__  `);
  console.log(` |  _| | | | '_ \| |/ _ \ '_ \| '_ \| | | / __| | | | '_ \ `);
  console.log(` | | | |_| | | | | |  __/ | | | | | | |_| \__ \ |_| | |_) |`);
  console.log(` |_|  \__,_|_| |_|_|\___|_| |_|_| |_|\__, |___/\__,_|_.__/ `);
  console.log(`                                      __/ |                `);
  console.log(`                                     |___/                 `);
}
