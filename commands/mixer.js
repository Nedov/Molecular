const Discord = require('discord.js'); // I'm requiring discord.js since we will be using Embeds.
const config = require('../config.json')
const request = require("request");
const moment = require('moment')
exports.run = (bot, message, args, tools) => {

  var suffix = message.content.split(" ").slice(1).join(" ");
  if (suffix == "" || suffix == null) return message.channel.sendMessage("Do " + config.prefix + "mixer <username?> for Online Status!");
  request("https://mixer.com/api/v1/channels/" + suffix, function(error, response, body) { //set info for the streamer in JSON
    if (error) {
      console.log('Error encounterd: ' + err);
      message.channel.send("Horrible stuff happend D:. Try again later.");
      return;
    }
    if (!error && response.statusCode == 200) {
      var stream = JSON.parse(body);
      if (stream.online) {
        let embed = new Discord.RichEmbed();
        embed.setColor(0x9900FF)
        embed.setTitle(suffix + "'s Mixer Channel")
        if (stream.bannerUrl) {
          embed.setImage(stream.bannerUrl)
        } else {
          embed.setImage(stream.thumbnail.url)
        }
        embed.setThumbnail("https://firebottle.tv/projects/mixiversary/images/logo-ball.png")
        embed.setURL("https://mixer.com/" + suffix)
        if (stream.online == true) {
          embed.addField("Status", "Live!", true)
        }
        if (stream.partnered == true) {
          embed.addField("Partner", "Partner Stream!", true)
        } else {
          embed.addField("Partner", "Not Partner Stream!", true)
        }
        embed.addField("Title", stream.name, true)
        embed.addField("Followers", stream.numFollowers, true)
        if (stream.type) {
          embed.addField("Game", stream.type.name, true)
        } else {
          embed.addField("Game", "No Game SET!", true)
        }
        embed.addField("Watching", stream.viewersCurrent, true)
        embed.addField("Total Views", stream.viewersTotal, true)
        embed.addField("Joined Mixer", moment(stream.createdAt).format('D MMM YYYY, h:mm:ss A'), true)
        embed.setFooter("Sent via " + bot.user.username, bot.user.avatarURL)
        embed.setTimestamp()

        message.channel.send({
          embed
        })
      } else {
        let embed = new Discord.RichEmbed();
        embed.setColor(0x9900FF)
        embed.setTitle(suffix + "'s Mixer Channel")
        if (stream.bannerUrl) {
          embed.setImage(stream.bannerUrl)
        } else {
          embed.setImage(stream.thumbnail.url)
        }
        embed.setThumbnail("https://firebottle.tv/projects/mixiversary/images/logo-ball.png")
        embed.setURL("https://mixer.com/" + suffix)
        if (stream.online == false) {
          embed.addField("Status", "Offline!", true)
        }
        if (stream.partnered == true) {
          embed.addField("Partner", "Partner Stream!", true)
        } else {
          embed.addField("Partner", "Not Partner Stream!", true)
        }
        embed.addField("Title", stream.name, true)
        embed.addField("Followers", stream.numFollowers, true)
        if (stream.type) {
          embed.addField("Game", stream.type.name, true)
        } else {
          embed.addField("Game", "No Game SET!", true)
        }
        embed.addField("Watching", stream.viewersCurrent, true)
        embed.addField("Total Views", stream.viewersTotal, true)
        embed.addField("Joined Mixer", moment(stream.createdAt).format('D MMM YYYY, h:mm:ss A'), true)
        embed.setFooter("Sent via " + bot.user.username, bot.user.avatarURL)
        embed.setTimestamp()

        message.channel.send({
          embed
        })
      }
    } else if (response.statusCode == 404) {
      let embed = new Discord.RichEmbed();
      embed.setColor(0x9900FF)
      embed.setTitle(suffix + "'s Mixer Channel")
      embed.setThumbnail("https://firebottle.tv/projects/mixiversary/images/logo-ball.png")
      embed.setURL("http://mixer.com/" + suffix)
      embed.addField("Error", "Channel not found.", true)
      embed.setFooter("Sent via " + bot.user.username, bot.user.avatarURL)
      embed.setTimestamp()

      message.channel.send({
        embed
      })
    }
  })

}

// ⏪⏩
// Now, we can test it. Make sure you add some pages though.
exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  categories: ['General']
};

exports.help = {
  name: "mixer",
  description: "Mixer command",
  usage: "mixer <account>"
};
