const Discord = require('discord.js');


exports.run = async (bot, message, args, tools) => {


  var user = message.mentions.users.first() || message.author;
  if (user.presence.game.name !== 'Spotify' && user.presence.game.type !== 2) return message.channel.send('**This user isn\'t listening to Spotify!**'); // This will notify in chat that the specified user isn't listening to Spotify.

  if (user.presence.game.name === 'Spotify' && user.presence.game.type === 2) {
    try {
      var trackImg = user.presence.game.assets.largeImageURL;
      var trackUrl = `https://open.spotify.com/track/${user.presence.game.syncID}`;
      var trackName = user.presence.game.details;
      var trackAlbum = user.presence.game.assets.largeText;
      var trackAuthor = user.presence.game.state;

      const embed = new Discord.RichEmbed()
        .setAuthor('Spotify Track Info', 'https://cdn.discordapp.com/emojis/408668371039682560.png') // This url will be in the description, it is setting the author & icon field for the embed.
        .setColor(0x1ED760) // This sets the color of the embed
        .setThumbnail(trackIMG) // This sets the thumbnail of the embed, using the variable from before.
        .addField('Song Name', trackName, true) // These are fields, and can be added easily, the true signifies that they can be on the same line.
        .addField('Album', trackAlbum, true)
        .addField('Author', trackAuthor, false)
        .addField('Listen to this track :', `[${trackUrl}](${trackUrl})`, false);

      return message.channel.send(embed);

    } catch (error) {
      return message.channel.send(`\`[ERROR ❌]\`, ${user.username} may not be listening to a registered sound`);
    }

  }

}

exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: ["spotfy", "sptfy"],
  categories: ['General']
};

exports.help = {
  name: "spotify",
  description: "Displays user track info",
  usage: "spotify"
};
