const discord = require('discord.js')

module.exports= {
  name: 'test',
  description: 'test',
  run: async(client, message, args) => {

    
const embed = new discord.RichEmbed()
.setAuthor(client.user.username, client.user.avatarURL)
.setTitle('Deneme')
.setColor('RANDOM')
.setDescription('deneme')
.setFooter('Deneme')
.setImage('https://cdn.discordapp.com/attachments/715553636259987586/715556213747613786/download.jpg')
.setThumbnail(client.user.avatarURL)
.setTimestamp()
.addField('deneme', 'test', true)
.addField('deneme', 'test', true)
.addField('deneme', 'test', true)
message.channel.send(embed)

  }
}