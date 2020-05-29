const { discord, MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'otorol',
  description: 'deneme',
  run: async(client, message, args) => {
    
if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`Bu Komudu Kullanabilmen İçin \`Sunucuyu Yönet\` Yetkisine Sahip Olmalısın ! `);

if (args[0] === 'sıfırla') {
    const embed = new MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Otorol`)
.setColor('BLACK')
.setDescription(`Otorol Başarıyla Sıfırlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(embed)
db.delete(`otorol_${message.guild.id}`)
db.delete(`otorollog_${message.guild.id}`)
return;
}
   let rol = message.mentions.roles.first()
   let kanal = message.mentions.channels.first()
if (!rol) return message.channel.send(`Otomatik Verilecek Rolü Belirtiniz ! `)
if (!kanal) return message.channel.send(`Otorol Log Kanalını Belirtiniz ! `)

 const embed = new MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Otorol`)
.setColor('BLACK')
.setDescription(`Otorol ${rol} , Log Kanalı İse ${kanal} Olarak Ayarlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(embed)
db.set(`otorol_${message.guild.id}`, rol.id)
db.set(`otorollog_${message.guild.id}`, kanal.id)

  }
}