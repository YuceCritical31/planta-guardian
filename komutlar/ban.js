const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
  
let yetkili = db.fetch(`banyetkilisi_${message.guild.id}`)
let kanal = db.fetch(`banlog_${message.guild.id}`)

if(!message.member.roles.cache.has(yetkili)) return message.channel.send(`Bu Komudu Kullanabilmen İçin <@&${yetkili}> Rolüne Sahip Olmalısın ! `)

  const kisi = message.mentions.users.first()
let reason = args.slice(1).join(' ')
if (!kisi) return message.channel.send(`Banlayacağın Kullanıcıyı Belirtmelisin ! `)
if (!reason) return message.channel.send(`Banlama Sebebini Belirtmelisin ! `)

const embed = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - ban`)
.setColor('BLACK')
.setDescription(`${kisi} Adlı Kullanıcı **${reason}** Sebebiyle Banladı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(embed)

kisi.send(`**${message.guild.name}** Adlı Sunucudan **${reason}** Sebebiyle Banlandın ! `)

message.guild.members.ban(kisi, {
  reason: reason
})

 let bantasi = db.get(`banlog_${message.guild.id}`)
  const banka = client.channels.cache.get(bantasi)
banka.send(
new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Ban`)
.setColor('BLACK')
.setDescription(`Banlanan Kullanıcı: ${kisi} \n Banlayan Yetkili: <@!${message.author.id}> \n Banlanma Sebebi: **${reason}**`)
.setThumbnail(client.user.avatarURL())
)

}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'ban'
}