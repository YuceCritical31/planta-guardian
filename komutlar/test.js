const discord = require('discord.js')

module.exports= {
  name: 'test',
  description: 'test',
  run: async(client, message, args) => {
    
const embed = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle('Deneme')
.setColor('RANDOM')
.setDescription('deneme')
.setFooter('Deneme')
.setImage('')
message.channel.send(embed)

  }
}