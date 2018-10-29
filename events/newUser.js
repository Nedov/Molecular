const Discord = require('discord.js');

module.exports.run = async (bot, member) => {


    if(member.guild.id !== "504005061186420757") return;

    var role = member.guild.roles.find("id", "505441738417111055");

    const embed = new Discord.RichEmbed()
    .setTitle("New member")
    .setDescription(`<@${member.user.id}> has joined **${member.guild.name}** server.
      ────── Roles Information ──────
      And get ${role} role`)
    .setThumbnail(member.user.avatarURL)
    .setColor("#50C713")
    .setFooter("Mod logs v3.0");

    member.guild.channels.get("505815219482918935").send(embed);

    member.addRole(role);


}
