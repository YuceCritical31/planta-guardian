const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`Bu Komudu Kullanabilmen İçin \`Sunucuyu Yönet\` Yetkisine Sahip Olmalısın ! `);

if (args[0] === 'sıfırla') {
    const embed = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Ban`)
.setColor('BLACK')
.setDescription(`Ban Log Başarıyla Sıfırlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(embed)
db.delete(`banlog_${message.guild.id}`)
return;
}

   let kanal = message.mentions.channels.first()
if (!kanal) return message.channel.send(`Lütfen Bir Ban Log Kanalı Belirtiniz ! `)

 const embed = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Ban`)
.setColor('BLACK')
.setDescription(`Ban Log Kanalı Başarıyla ${kanal} Olarak Ayarlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(embed)
db.set(`banlog_${message.guild.id}`, kanal.id)
  
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['banlog'],
  permlevel: 0
}
exports.help = {
  name: 'ban-log'
}