const Discord = require('discord.js');

module.exports.run = async (not, message, args, tools) => {
    var userChoice;
    message.channel.send('Ты выибираешь камень, ножницы или бумагу?').then(() => {
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 60000 });
        collector.on('collect', msg => {
            collector.stop();
            if (msg.content == 'камень') {
                userChoice = 'камень';
            }
            else if (msg.content == 'бумага', 'бумагу') {
                userChoice = 'бумагу';
            }
            else if (msg.content == 'ножницы') {
                userChoice = 'ножницы';
            } else {
                userChoice = 'Incorrect';
            }
            let computerChoice = Math.random();
            if (computerChoice < 0.34) {
                computerChoice = "камень";
            } else if(computerChoice <= 0.67) {
                computerChoice = "бумагу";
            } else {
                computerChoice = "ножницы";
            } message.channel.send("Я выбрал " + computerChoice);
            function rspCW(userChoice, computerChoice) {
                if (userChoice === computerChoice) {
                    return "ничья!";
                }
                else if(userChoice === "камень") {
                    if(computerChoice === "ножницы") {
                        return "ты выиграл!";
                    }
                    else if (computerChoice === "бумагу") {
                        return "ты проиграл";
                    }
                }
                else if(userChoice === "бумагу") {
                    if(computerChoice === "камень") {
                        return "ты выиграл!";
                    } else if (computerChoice === "ножницы") {
                        return "ты проиграл";
                    }
                }
                else if(userChoice === "ножницы") {
                    if(computerChoice === "бумагу") {
                        return "ты выиграл!";
                    } else if (computerChoice === "камень") {
                        return "ты проиграл.";
                    }
                }
                else if (userChoice === 'Incorrect') {
                    return "ты не выбрал ни камень, ни ножницы, ни бумагу";
                }
            }
            if (userChoice === 'Incorrect') {
                message.channel.send(message.author + ", " + rspCW(userChoice, computerChoice))
            } else {
            message.channel.send(message.author + ", " + rspCW(userChoice, computerChoice) + ' Ты выбрал ' + userChoice + ' Я выбрал ' + computerChoice);
         }})
    });
}
