const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

 const embed = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - HGBB`)
.setColor('BLACK')
.setDescription(`**-görüşürüz-mesaj mesaj** Görüşürüz Mesajını Ayarlar \n **-görüşürüz-mesaj sıfırla** Görüşürüz Mesajını Sıfırlar \n **-hoşgeldin-mesaj mesaj** Hoşgeldin Mesajını Ayarlar \n **-hoşgeldin-mesaj sıfırla** Hoşgeldin Mesajını Sıfırlar \n **-görüşürüz-kanal #kanal** Görüşürüz Kanalını AYarlar \n **-görüşürüz-kanal sıfırla** Görüşürüz Kanalını Sıfırlar \n **-hoşgeldin-kanal #kanal** Hoşgeldin Kanalını Ayarlar \n **-hoşgeldin-kanal sıfırla** Hoşgeldin Kanalını Sıfırlar  `)
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
  name: 'hgbb'
}