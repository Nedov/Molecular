const Discord = require('discord.js');
  var user = message.mentions.users.first() || message.author;
  if (user.presence.game.name !== 'Spotify' && user.presence.game.type !== 2) return message.channel.send('**This user isn\'t listening to Spotify!**'); // This will notify in chat that the specified user isn't listening to Spotify.

  if (user.presence.game.name === 'Spotify' && user.presence.game.type === 2) { // This checks all of these if statements, and if they are all true, it runs the following.

    // Variables - These are the variables we will be using in the embed
    let trackIMG = user.presence.game.assets.largeImageURL; // This fetches a url image using the largeImage asset after slicing off the first 8 characters.
    let trackURL = `https://open.spotify.com/track/${user.presence.game.syncID}`;
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
      .addField('🎤Author(s)', trackAuthor, false) // This signifies only two can be on the line above, the third will be on a new line
      .addField('Listen to Track:', `[\`${trackURL}\`](trackURL)`, false); // This here sets a clickable link, to the trackURL, while still showing the URL in ``.

    // Sending Embed
    message.channel.send(embed); // This sends the formed embed to the channel.

    // Now, we can test it.

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
