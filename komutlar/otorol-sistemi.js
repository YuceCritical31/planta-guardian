const { discord, MessageEmbed } = require('discord.js')

module.exports = {
  name: 'otorol-sistemi',
  description: 'deneme',
  run: async(client, message, args) => {

  const embed = new MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Otorol`)
.setColor('BLACK')
.setDescription(`**-otorol-mesaj mesaj** Otorol Mesajını Ayarlar \n **-otorol-mesaj sıfırla** Otorol Mesajını Sıfırlar \n **-otorol @rol #kanal** Otorolü Veri Logu Ayarlar \n **-otorol sıfırla** Otorolü ve Logu Sıfırlar `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(embed)
   
 }
}