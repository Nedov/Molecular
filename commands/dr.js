const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {

  if (message.server.id == "478933393757962242") {
    let rando_imgs = [
      'http://www.playcast.ru/uploads/2017/04/03/22202169.jpg',
      'http://xn--h1adaolkc5e.u7.kz/admin/uploads/6/4/0/%D0%9B%D1%83%D1%87%D1%88%D0%B8%D0%B5-%D0%BE%D1%82%D0%BA%D1%80%D1%8B%D1%82%D0%BA%D0%B8-%D0%B4%D0%BB%D1%8F-%D0%BF%D0%BE%D0%B7%D0%B4%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F-%D0%BF%D0%B0%D0%BF%D1%8B-%D1%81-%D0%B4%D0%BD%D1%91%D0%BC-%D1%80%D0%BE%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F-%D0%A1%D0%BA%D0%B0%D1%87%D0%B0%D1%82%D1%8C-%D0%BE%D1%82%D0%BA%D1%80%D1%8B%D1%82%D0%BA%D0%B8-%D0%BD%D0%B0-%D0%B4%D0%B5%D0%BD%D1%8C-%D1%80%D0%BE%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F-%D0%BF%D0%B0%D0%BF%D0%B5-102.gif',
      'http://otkritki.u7.kz/admin/uploads/3/0/0/%D0%9E%D1%82%D0%BA%D1%80%D1%8B%D1%82%D0%BA%D0%B0-%D1%81-%D0%B4%D0%BD%D0%B5%D0%BC-%D1%80%D0%BE%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F-%D0%B4%D0%BB%D1%8F-%D0%BF%D0%B0%D0%BF%D1%8B-%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B0-%D0%B4%D0%B5%D0%BD%D1%8C-%D1%80%D0%BE%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F-%D0%BF%D0%B0%D0%BF%D1%8B-6963.gif',
    ]

    let rhex = [
      '#DD2B54',
      '#E6A116',
      '#59C2AF',
    ]

    const rhexc = rhex[Math.floor(Math.random() * rhex.length)]
    const rhug = rando_imgs[Math.floor(Math.random() * rando_imgs.length)]


    const embed = new Discord.RichEmbed()
      .setTitle("Поздравляю тебя с Днём Рождения!")
      .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬", "Желаю тебе")
      .addField("Здоровья!", "Чтобы ты не болел никогда!")
      .addField("Счастья", "Чтобы все твои дни были яркие и красочные!")
      .addField("Богатсва", "Чтобы ты был богатым!")
      .setFooter("Мы всегда будем любить тебя!")
      .setColor(rhexc)
      .setThumbnail(rhug);
    message.channel.send(embed)


  }
}
