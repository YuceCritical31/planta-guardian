const { discord, MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'hoşgeldin-mesaj',
  description: 'deneme',
  run: async(client, message, args) => {

if (args[0] === 'sıfırla') {
    const embed = new MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Hoşgeldin Mesaj`)
.setColor('BLACK')
.setDescription(`Hoşgeldin Mesajı Başarıyla Sıfırlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(embed)
db.delete(`hgmesaj_${message.guild.id}`)
return;
}

let mesaj = args.slice(0).join(' ')
if (!mesaj) return message.channel.send(`Lütfen Bir Mesaj belirtiniz ! Örnek \`-hoşgeldin-mesaj **-sunucu-** Adlı Sunucumuza Hoşgeldin -uye- . Seninle Beraber **-uyesayısı-** Kişi Olduk ! \`  `)

}
}