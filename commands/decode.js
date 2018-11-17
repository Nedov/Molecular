const base64 = require("js-base64").Base64;

module.exports.run = async (bot, message, args) => {
  message.delete();
  const b64Decoded = base64.decode(args.join(" "));
  message.channel.send(`\`\`\`\n${b64Decoded}\`\`\``);
}


exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["dcode", "dc"],
  categories: ['Fun']
};

exports.help = {
  name: "decode",
  description: "base64 decode command",
  usage: "decode <text>"
};
