const discord = require('discord.js')

module.exports = {
  name: 'yasakla',
  description: 'deneme',
 run: async(client, message, args) => {
   message.channel.send('deneme')
 }
}