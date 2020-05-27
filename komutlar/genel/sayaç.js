const { discord, MessageEmbed } = require('discord.js')
const db = require('quick.db') 
  
module.exports = {
  name: 'sayaç',
  description: 'deneme',
  run: async(client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`Bu Komudu Kullanabilmen İçin \`Sunucuyu Yönet\` Yetkisine Sahip Olmalısın ! `);

if (args[0] === 'sıfırla') {
    const embed = new MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Sayaç`)
.setColor('BLACK')
.setDescription(`Sayaç Başarıyla Sıfırlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(embed)
db.delete(`sayaç_${message.guild.id}`)
db.delete(`sayaçlog_${message.guild.id}`)
return;
}

let sayı = args[0]
   let kanal = message.mentions.channels.first()
if (!sayı) return message.channel.send(`Bir Sayı Belirtiniz ! `)
if (!sayı < message.guild.memberCount) return message.channel.send(`Sayaç Sayısı En Az **${message.guild.memberCount}** Olmalıdır ! `)
if (!kanal) return message.channel.send(`Syaaç Log Kanalını Belirtiniz ! `)

const embed = new MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Ototag`)
.setColor('BLACK')
.setDescription(`Sayı **${sayı}** , Log Kanalı İse ${kanal} Olarak Ayarlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(embed)
db.set(`sayaç_${message.guild.id}`, sayı)
db.set(`sayaçlog_${message.guild.id}`, kanal.id)
  }
}
