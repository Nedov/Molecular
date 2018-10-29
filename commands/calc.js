const math = require('mathjs');
const Discord = require('discord.js');

module.exports.run = async (bot, message, args, tools) => {

  if(!args[0]) return message.channel.send('Please input a calulation');

  let resp;
  try {
    resp = math.eval(args.join(" "));
  } catch (e) {
    message.channel.send("Sorry, please input valid calulation");
    return;
  }

  const embed = new Discord.RichEmbed()
  .setColor(0xffffff)
  .setTitle('Math calulation')
  .addField('Input', `\`\`\`js\n${args.join(' ')}\`\`\``)
  .addField('Output', `\`\`\`js\n${resp}\`\`\``)
  message.channel.send(embed);
}
