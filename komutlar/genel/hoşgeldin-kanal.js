const { discord, MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'hoşgeldin-kanal',
  description: 'deneme',
  run: async(client, message, args) => {

if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`Bu Komudu Kullanabilmen İçin \`Sunucuyu Yönet\` Yetkisine Sahip Olmalısın ! `);

if (args[0] === 'sıfırla') {
    const embed = new MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Hoşgeldin Kanal`)
.setColor('BLACK')
.setDescription(`Hoşgeldin Mesajı Başarıyla Sıfırlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(embed)
db.delete(`hgkanal_${message.guild.id}`)
return;
}

   let kanal = message.mentions.channels.first()

if (!kanal) return message.channel.send(`Lütfen Bir Kanal belirtiniz ! `)

const embed = new MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Hoşgeldin Kanal`)
.setColor('BLACK')
.setDescription(`Hoşgeldin Kanalı ${kanal} Olarak Ayarlandı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(embed)
db.set(`hgkanal_${message.guild.id}`, kanal.id)
}
}