const ascii = require('ascii-art');


module.exports.run = async (bot, message, args) => {

  ascii.font(args.join(' '), 'Doom', function(rendered) {

    rendered = rendered.trimRight();

    if (rendered.length > 2000) return message.channel.send('Sorry (');

    message.channel.send(rendered, {
      code: 'md'
    });

  });

}
