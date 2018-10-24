const Discord = require('discord.js')

exports.run = async (bot, message, args) => {


    let diff = message.createdTimestamp - Date.now();
    let API = Math.round(bot.ping);

        let embed = new Discord.RichEmbed()
        .setTitle(`🔔 Pong!`)
        .setColor("#c294e3")
        .addField("📶 Latency", `\`${diff}\``, true)
        .addField("💻 API", `\`${API}ms\``, true)
        message.channel.send(embed);



}
