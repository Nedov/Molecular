fconst Discord = require('discord.js')

exports.run = async (bot, message, args) => {

    let start = Date.now(); message.channel.send(message.channel.id, 'Pong! ').then(message => { 
    let diff = (Date.now() - start); 
    let API = (bot.ping).toFixed(2)
        
        let embed = new Discord.RichEmbed()
        .setTitle(`🔔 Pong!`)
        .setColor("#c294e3")
        .addField("📶 Latency", `${diff}ms`, true)
        .addField("💻 API", `${API}ms`, true)
        message.edit(embed);
      
    });

}
