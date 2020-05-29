const discord = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'ban-yetkili',
  description: 'deneme',
  run: async(client, message, args) => {
    
if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`Bu Komudu Kullanabilmen İçin \`Sunucuyu Yönet\` Yetkisine Sahip Olmalısın ! `);

if (args[0] === 'sıfırla') {
    const embed = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Ban`)
.setColor('BLACK')
.setDescription(`Ban Yetkili Rolü Başarıyla Sıfırlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(embed)
db.delete(`banyetkilisi_${message.guild.id}`)
return;
}

   let rol = message.mentions.roles.first()
if (!rol) return message.channel.send(`Lütfen Bir Ban Yetkili Rolü Belirtiniz ! `)

 const embed = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Ban`)
.setColor('BLACK')
.setDescription(`Ban Yetkili Rolü Başarıyla ${rol} Olarak Ayarlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(embed)
db.set(`banyetkilisi_${message.guild.id}`, rol.id)

  }
}