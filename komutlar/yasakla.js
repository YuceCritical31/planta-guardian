const discord = require('discord.js')

exports.run = async(client, message, args) => {

message.channel.send('deneme')
  
}
exports.conf = {
  enabled: true,
  guildonly: false,
  permlevel: 0,
  aliases: ['ban']
}
exports.help = {
  name: 'yasakla'
}