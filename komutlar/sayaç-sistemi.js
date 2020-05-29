const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

const embed = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Sayaç`)
.setColor('BLACK')
.setDescription(`**-sayaç sayı #kanal** Sayaç Sistemini Ayarlar \n **-sayaç sıfırla** Sayaç Sistemini Sıfırlar \n **-sayaç-hoşgeldin-mesaj mesaj** Sayaç Hoşgeldin Mesajını Ayarlar \n **-sayaç-hoşgeldin-mesaj sıfırla** Sayaç Hoşgeldin Mesajını Sıfırlar \n **-sayaç-görüşürüz-mesaj mesaj** Sayaç Görüşürüz Mesajını Ayarlar \n **-sayaç-görüşürüz-mesaj sıfırla** Sayaç Görüşürüz Mesajını Sıfırlar `)
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
  name: 'sayaç-sistemi'
}