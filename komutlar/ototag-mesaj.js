const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`Bu Komudu Kullanabilmen İçin \`Sunucuyu Yönet\` Yetkisine Sahip Olmalısın ! `);

if (args[0] === 'sıfırla') {
    const embed = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Ototag`)
.setColor('BLACK')
.setDescription(`Ototag Mesajı Başarıyla Sıfırlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(embed)
db.delete(`ototagmesaj_${message.guild.id}`)
return;
}

let mesaj = args.slice(0).join(' ')
if (!mesaj) return message.channel.send(`Lütfen Bir Mesaj belirtiniz ! Örnek \`-ototag-mesaj **-sunucu-** Adlı Sunucumuza -uye- Adlı Kullanıcı Katıldı . Otomatik Olarak **-tag-** Adlı Tag Verildi ! \`  `)

const embed = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Ototag`)
.setColor('BLACK')
.setDescription(`Ototag Mesajı Başarıyla \`${mesaj}\` Olarak Ayarlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(embed)
db.set(`otorolmesaj_${message.guild.id}`, mesaj)
  
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'ototag-mesaj'
}