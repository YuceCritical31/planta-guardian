const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

 const embed = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Otorol`)
.setColor('BLACK')
.setDescription(`**-otorol-mesaj mesaj** Otorol Mesajını Ayarlar \n **-otorol-mesaj sıfırla** Otorol Mesajını Sıfırlar \n **-otorol @rol #kanal** Otorolü Veri Logu Ayarlar \n **-otorol sıfırla** Otorolü ve Logu Sıfırlar `)
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
  name: 'otorol-sistemi'
}