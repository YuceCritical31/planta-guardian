const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

 const embed = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Ping's`)  
.setDescription(`pingim = **${client.ws.ping}**`)
.setThumbnail(client.user.avatarURL())
  
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'ping'
}