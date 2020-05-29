const Discord = require('discord.js');

exports.run = function(client, message, args) {
 

        message.channel.send('sa')
    

};  

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ['hesap'],
  permLevel: 0 
};

exports.help = {
  name: 'hesapla', 
  description: 'Belirtilen işlemi yapar.',
  usage: 'hesapla <işlem>'
};    