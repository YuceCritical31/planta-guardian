const { discord, MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'sayaç-görüşürüz-mesaj',
  description: 'deneme',
  run: async(client, message, args) => {

if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`Bu Komudu Kullanabilmen İçin \`Sunucuyu Yönet\` Yetkisine Sahip Olmalısın ! `);

if (args[0] === 'sıfırla') {
    const embed = new MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Sayaç`)
.setColor('BLACK')
.setDescription(`Sayaç Görüşürüz Mesajı Başarıyla Sıfırlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(embed)
db.delete(`sayaçgörüşürüzmesaj_${message.guild.id}`)
return;
}

let mesaj = args.slice(0).join(' ')
if (!mesaj) return message.channel.send(`Lütfen Bir Mesaj belirtiniz ! Örnek \`-sayaç-görüşürüz-mesaj **-sunucu-** Adlı Sunucudan -uye- Adlı Kullanıcı Ayrıldı . Toplam **-uyesayısı-** Kişi Kaldık . **-hedef-** Kişi Olmamıza **-kalan-** Kişi Kaldı !  \`  `)

const embed = new MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Sayaç`)
.setColor('BLACK')
.setDescription(`Sayaç Görüşürüz Mesajı Başarıyla \`${mesaj}\` Olarak Ayarlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(embed)
db.set(`sayaçgörüşürüzmesaj_${message.guild.id}`, mesaj)
}
}