const request = require("request");

module.exports.run = async (bot, message, args = []) => {

  request('http://artii.herokuapp.com/make?text=' + args.join(' '), function(error, response, body) {
    message.channel.send('Обрабатываю запрос...').then(function(message) {
      message.edit("```" + body + "```");
    }).catch(function() {});
  })
}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  categories: ['Fun']
};

exports.help = {
  name: "ascii",
  description: "Ascii text",
  usage: "ascii <text>"
};
