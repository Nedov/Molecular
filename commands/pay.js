const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (bot, message, args) => {


  if (!message.mentions.members.first()) return message.channel.send(`**Mention a user**`);

  let targetMember = message.mentions.members.first();
  let amount = parseInt(args.join(' ').replace(targetMember, ''));

  if (!isNaN(amount)) return message.channel.send(`**Please define an amount!**`);

  let targetBalance = await db.fetch(`userBalance_${targetMember.id}`),
    selfBalence = await db.fetch(`userBalance_${message.author.id}`);

  if (targetBalance === null) targetBalance = 50;
  if (selfBalence === null) selfBalence = 50;

  if (amount > selfBalence) return message.channel.send(`**Sorry, you don't have enough money!**`);

  db.add(`userBalance_${targetMember.id}`, amount);
  db.subtract(`userBalance_${message.author.id}`);

  message.channel.send(`**Sucessfully sent $${amount} to ${targetMember}!**`)

}

exports.conf = {
  enabled: false, // not used yet
  guildOnly: false, // not used yet
  aliases: ["send"],
  categories: ['Economy']
};

exports.help = {
  name: "pay",
  description: "Send money to user",
  usage: "pay <user> <amount>"
};
