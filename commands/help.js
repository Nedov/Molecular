const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {

  //page 1

  if (!args[0]) {
    const help1 = new Discord.RichEmbed() // sets a embed box to the variable embedhelpmember
      .setTitle("**Help menu (Page: 1 / 3)**\n") // sets the title to List of Commands
      .setDescription(`\`role-info <role> | say | whois [user] | stats | serverinfo [serverID] | serverslist\``)
      .setFooter("Commands type: \"main\"; [ ] - not obligatory")
      .setColor("#F8585A"); // sets the color of the embed box to orange
    message.channel.send(help1); // sends the embed box "embedhelpmember" to the chatif
    return;
  }

  //page 2
  if (args[0] == 2) {
    const help2 = new Discord.RichEmbed()
      .setTitle("**Help menu (Page: 2 / 3)**\n")
      .setDescription(`\`roulette | reverse <text> | qrcode <text> | encode <text> | decode <text> | draw | discrim <discrim> | emoji :<emoji>: | saye <text> | gay | патент | cat | lmgtfy <question> | slap | avatar [user] | poll <question>? | cow <text> | ping | ква(Just symbol pepe) | death | ascii <text> | calc | \``)
      .setFooter("Commands type: \"fun\"; [ ] - not obligatory")
      .setColor("#F8585A");
    message.channel.send(help2);
    return;
  }

  if (args[0] == 3) {
    const help2 = new Discord.RichEmbed()
      .setTitle("**Help menu (Page: 3 / 3)**\n")
      .setDescription(`\`warn <@user> [reason] | arole <user> <role> | rrole <user> <role> | purge <2-100> | kick <user> <reason> | ban <user> <reason> | tempmute <user> <1s/m/h/d>\``)
      .setFooter("Commands type: \"mod\"; [ ] - not obligatory")
      .setColor("#F8585A");
    message.channel.send(help2);
    return;
  }

}
