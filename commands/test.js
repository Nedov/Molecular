const Discord = require('discord.js'); // I'm requiring discord.js since we will be using Embeds.

exports.run = (bot, message, args, tools) => {

  let pages = ['The most part of the commands', 'Draw', '6 NSFW commands']; // Here we will define an array of pages
  let page = 1; // We will define what page we are on here, the default page will be 1. (You can change the default page)
  let ptitles = ['Edited', 'Deleted', 'Added'];
  const embed = new Discord.RichEmbed() // Define a new embed, if you are on the `stable` branch it will be new Discord.RichEmbed()
    .setColor(0xffffff) // You can set your color here
    .setFooter(`Page ${page} of ${pages.length}`) // This is the default value, showing the default page and the amount of pages in the array.
    .setTitle(ptitles[page - 1])
    .setDescription(pages[page - 1]) // This sets the description as the default page (we are subtracting 1 since arrays start at 0)

  message.channel.send(embed).then(msg => { // Now, we will send the embed and pass the new msg object

    msg.react('⏪').then(r => { // We need to make sure we start the first two reactions, this is the first one
      msg.react('⏩') // This is the second one, it will run this one after the first one

      // Filters - These make sure the variables are correct before running a part of code
      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id; // We need two filters, one for forwards and one for backwards

      const backwards = msg.createReactionCollector(backwardsFilter, {
        time: 60000
      }); // This creates the collector, which has the filter passed through it. The time is in milliseconds so you can change that for however you want the user to be able to react
      const forwards = msg.createReactionCollector(forwardsFilter, {
        time: 60000
      }); // This is the second collector, collecting for the forwardsFilter

      // Next, we need to handle the collections
      backwards.on('collect', r => { // This runs when the backwards reaction is found
        if (page === 1) return; // We want to make sure if they are on the first page, they cant go back a page.
        page--; // If it can go back, push back the page number
        embed.setDescription(pages[page - 1]); // Just like setting the first one, reset the Description to the new page
        embed.setTitle(ptitles[page - 1]);
        embed.setFooter(`Page ${page} of ${pages.length}`); // This also sets the footer to view the current pagenumber
        msg.edit(embed) // Then, we can push the edit to the message
      })

      forwards.on('collect', r => { // This runs when the forwards reaction is found
        if (page === pages.length) return; // We can use copy and paste since it is basically the same thing, although now it checks if the page is currently on the highest possible, so it can't go any higher.
        page++; // If it can go forwards, push forwards the page number
        embed.setDescription(pages[page - 1]); // Just like setting the first one, reset the Description to the new page
        embed.setTitle(ptitles[page - 1]);
        embed.setFooter(`Page ${page} of ${pages.length}`); // This also sets the footer to view the current pagenumber
        msg.edit(embed) // Then, we can push the edit to the message
      })

    })

  })

}

// ⏪⏩
// Now, we can test it. Make sure you add some pages though.
exports.conf = {
  enabled: true, // not used yet
  guildOnly: false, // not used yet
  aliases: [],
  categories: ['tests']
};

exports.help = {
  name: "test",
  description: "test command",
  usage: "test"
};
