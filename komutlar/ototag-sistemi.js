const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

 const embed = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Ototag`)
.setColor('BLACK')
.setDescription(`**-ototag-mesaj mesaj** Ototag Mesajını Ayarlar \n **-ototag-mesaj sıfırla** Ototag Mesajını Sıfırlar \n **-ototag tag #kanal** Ototagı Veri Logu Ayarlar \n **-ototag sıfırla** Ototagı ve Logu Sıfırlar `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(embed)
  
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'ototag-sistemi'
}