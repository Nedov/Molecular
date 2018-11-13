const base64 = require("js-base64").Base64;

module.exports.run = async (bot, message, args) => {
  message.delete();
  const b64Decoded = base64.decode(args.join(" "));
  message.channel.send(`\`\`\`\n${b64Decoded}\`\`\``);
}
