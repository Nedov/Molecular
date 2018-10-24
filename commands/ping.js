const Discord = require('discord.js')

exports.run = async (bot, message, args) => {

    
    const m = await message.channel.send("Pinging....").then(message => { 
    let diff = m.createdTimestamp - message.createdTimestamp; 
    let API = Math.round(bot.ping);
        
        let embed = new Discord.RichEmbed()
        .setTitle(`🔔 Pong!`)
        .setColor("#c294e3")
        .addField("📶 Latency", `${diff}ms`, true)
        .addField("💻 API", `${API}ms`, true)
        m.edit(embed);
      
    });

}
