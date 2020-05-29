const discord = require('discord.js')

module.exports = {
  name: 'yasakla',
  description: 'deneme',
 run: async(client, message, args) => {

const embed = new discord.MessageEmbed()
message.channel.send(embed)

 }
}