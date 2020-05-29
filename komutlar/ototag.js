const { discord, MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'ototag',
  description: 'deneme',
  run: async(client, message, args) => {
    
if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`Bu Komudu Kullanabilmen İçin \`Sunucuyu Yönet\` Yetkisine Sahip Olmalısın ! `);

if (args[0] === 'sıfırla') {
    const embed = new MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Ototag`)
.setColor('BLACK')
.setDescription(`Ototag Başarıyla Sıfırlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(embed)
db.delete(`ototag_${message.guild.id}`)
db.delete(`ototaglog_${message.guild.id}`)
return;
}
   let rol = args[0]
   let kanal = message.mentions.channels.first()
if (!rol) return message.channel.send(`Bir Tag Belirtiniz ! `)
if (!kanal) return message.channel.send(`Ototag Log Kanalını Belirtiniz ! `)

 const embed = new MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Ototag`)
.setColor('BLACK')
.setDescription(`Tag **${rol}** , Log Kanalı İse ${kanal} Olarak Ayarlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(embed)
db.set(`ototag_${message.guild.id}`, rol)
db.set(`ototaglog_${message.guild.id}`, kanal.id)

  }
}