const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {

//page 1

if(args[0] == 1) {
  const help1 = new Discord.RichEmbed() // sets a embed box to the variable embedhelpmember
              .setTitle("**Help menu (Page: 1 / 3)**\n") // sets the title to List of Commands
              .setDescription(`\`role-info <role> | say | whois [user] | stats \``)
              .setFooter("Commands type: \"main\"; [ ] - not obligatory")
              .setColor("#F8585A"); // sets the color of the embed box to orange
          message.channel.send(help1); // sends the embed box "embedhelpmember" to the chatif
return;
}

//page 2
          if(args[0] == 2){
            const help2 = new Discord.RichEmbed()
          .setTitle("**Help menu (Page: 2 / 3)**\n")
          .setDescription(`\`cat | lmgtfy <question> | slap | avatar | poll <question>?\``)
          .setFooter("Commands type: \"for fun\"; [ ] - not obligatory")
          .setColor("#F8585A");
          message.channel.send(help2);
            return;
          }

          if(args[0] == 3){
            const help2 = new Discord.RichEmbed()
          .setTitle("**Help menu (Page: 3 / 3)**\n")
          .setDescription(`\`arole <user> <role> | rrole <user> <role> | purge <2-100> | kick <user> <reason> | ban <user> <reason>\``)
          .setFooter("Commands type: \"mod commands\"; [ ] - not obligatory")
          .setColor("#F8585A");
          message.channel.send(help2);
            return;
          }

        }
