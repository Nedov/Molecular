const Discord = require('discord.js');

module.exports.run = async (bot, member) => {


    if(member.guild.id !== "504005061186420757") return;

    var role = member.guild.roles.find("id", "505441738417111055");

    const embed = new Discord.RichEmbed()
    .setTitle("Member left")
    .setDescription(`<@${member.user.id}> has left **${member.guild.name}** server.
      ────── Roles Information ──────
      And lost ${member.roles.map(r => `<@&${r.id}>`).slice(1).join("  |  ")} roles[${member.roles.size - 1}]`)
    .setThumbnail(member.user.avatarURL)
    .setColor("#FF0000")
    .setFooter("Mod logs v3.0");

    member.guild.channels.get("505815219482918935").send(embed);



}
