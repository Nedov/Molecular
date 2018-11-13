const base64 = require("js-base64").Base64;

module.exports.run = async (bot, message, args) => {
  message.delete();
  const b64Encoded = base64.encode(args.join(" "));
  message.channel.send(`\`\`\`\n${b64Encoded}\`\`\``);
}
