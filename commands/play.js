const ytdl = require('ytdl-core');

module.exports.run = async (message, bot, args, ops) => {

  if (!message.member.voiceChannel) return message.channel.send('Please connect to a voice channel.');

  if (message.guild.me.voiceChannel) return message.channel.send('I am already connected to a voice channel.');

  if (!args[0]) return message.channel.send('Input URL');

  let validate = await ytdl.validateURL(args[0]);

  if (!validate) return message.channel.send('Please input a **validate** URL');

  let info = await ytdl.getInfo(args[0]);

  let data = ops.active.get(message.guild.id) || {};

  if (!data.connection) data.connection = await message.member.voiceChannel.join();
  if (!data.queue) data.queue = [];
  data.guildID = message.guild.id;

  data.queue.push({
    songTitle: info.title,
    requester: message.author.tag,
    url: args[0],
    announceChannel: message.channel.id
  });

  if (!data.dispatcher) play();
  else {

    message.channel.send(`Added to Queue: ${info.title} | Requested By: ${message.author.tag}`);

  }

  ops.active.set(message.guild.id, data)

};
