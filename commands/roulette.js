module.exports.run = async (bot, message, args) => {
  randomNumber = Math.floor(Math.random() * (6 - 1) + 1);
  // console.log(randomNumber);
  if (randomNumber == 2) {
    message.reply("Died! 💀");
  } else {
    message.reply("Survived! 😃");
  }
}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  categories: ['Fun']
};

exports.help = {
  name: "roulette",
  description: "Russian roulette command",
  usage: "roulette"
};
