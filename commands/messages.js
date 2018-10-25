// const db = require('quick.db');
//
//
// module.exports.run = async (bot, message, args, tools, ops) => {
//
//   let member = message.mentions.members.first() || message.member;
//
//   db.fetchObject(`messageSent_${member.id}`).then(obj => {
//
//     message.channel.send(`**Messages Sent:** \`${obj.value}\``);
//
//   })
//
// }
