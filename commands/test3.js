const snekfetch = require('snekfetch');

exports.run = (bot, message, args, tools) => {


  let [title, contents] = args.join(" ").split(" | ");
  if (!contents) {
    [title, contents] = ["Achievement Get!", title];
  }
  let rnd = Math.floor((Math.random() * 39) + 1);
  if (args.join(" ").toLowerCase().includes("burn")) rnd = 38;
  if (args.join(" ").toLowerCase().includes("cookie")) rnd = 21;
  if (args.join(" ").toLowerCase().includes("cake")) rnd = 10;
  if (args.join(" ").toLowerCase().includes("diamond")) rnd = 29;

  if (title.length > 10 || contents.length > 10) return message.edit("Max Length: 10 Characters. Soz.").then(message.delete.bind(message), 2000);
  const url = `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`;
  snekfetch.get(url)
    .then(r => message.channel.send("", {
      files: [{
        attachment: r.body
      }]
    }));
  message.delete();

}
exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ['t3'],
  categories: ['tests']
};

exports.help = {
  name: "test3",
  description: "test command",
  usage: "test"
};
