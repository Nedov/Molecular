const Discord = require('discord.js');


exports.run = async (bot, message, args, tools) => {


  var user = message.mentions.users.first() || message.author;
  if (user.presence.game.name !== 'Spotify' && user.presence.game.type !== 2) return message.channel.send(`${user.username} is not listening to spotify`);
  if (user.presence.game.name === 'Spotify' && user.presence.game.type === 2) {
    try {
      let trackIMG = `https://i.scdn.co/image/${user.presence.game.assets.largeImage.slice(8)}`; // This fetches a url image using the largeImage asset after slicing off the first 8 characters.
      let trackURL = `https://open.spotify.com/track/${user.presence.game.syncID}`; // This grabs the syncID and adds it to the end of a spotify URL.
      let trackName = user.presence.game.details;
      let trackAuthor = user.presence.game.state;
      let trackAlbum = user.presence.game.assets.largeText; // These all hold the info for the song, grabbed from the user's presence.

      // Create embed object
      const embed = new Discord.RichEmbed() // This will create the start of the embed, we will now add to it.
        .setAuthor('Spotify Track Info', 'https://cdn.discordapp.com/emojis/408668371039682560.png') // This url will be in the description, it is setting the author & icon field for the embed.
        .setColor(0x1ED760) // This sets the color of the embed
        .setThumbnail(trackIMG) // This sets the thumbnail of the embed, using the variable from before.
        .addField('<a:music_notes:522072299487100929>Song Name', trackName, true) // These are fields, and can be added easily, the true signifies that they can be on the same line.
        .addField('📀Album', trackAlbum, true)
        .addField('🎤Author', trackAuthor, false) // This signifies only two can be on the line above, the third will be on a new line
        .addField('Listen to Track:', `[${trackURL}](${trackURL})`, false); // This here sets a clickable link, to the trackURL, while still showing the URL in ``.

      // Sending Embed
      message.channel.send(embed);

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
