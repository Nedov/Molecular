const Discord = require('discord.js')
exports.run = (bot, message, args, tools) => {
  if (!args[0]) return message.channel.send('Correct usage: **m^reverse (text to reverse)**');

  function reverseString(str) {
    return str.split("").reverse().join("");
  }

  let sreverse = reverseString(args.join(' '))

  if (args[0] === sreverse) {

    sreverse = `${args.join(' ')}..Wait... You broke it!`

  }
  const reverseEmbed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag}`, message.author.avatarURL)
    .setColor(0xFFF000)
    .addField('Input: ', '```' + `${args.join(' ')}` + '```')
    .addField('Output: ', '```' + `${sreverse}` + '```')
  message.channel.send({
    embed: reverseEmbed
  })

}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["rev", "reverstext"],
  categories: ['Fun']
};

exports.help = {
  name: "reverse",
  description: "Text reverse command",
  usage: "reverse <text>"
};
