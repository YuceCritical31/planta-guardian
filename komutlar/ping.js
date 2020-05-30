const discord = require('discord.js')

exports.run = async(client, message, args) => {

message.channel.send(`Pingim = **${client.ws.ping}**`)
  
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['ms'],
  permlevel: 0
}
exports.help = {
  name: 'ping',
  description: 'botun pingini gösterir',
  usage: 'prefix + ping'
}