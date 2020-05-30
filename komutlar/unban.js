const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
  
let yetkili = db.fetch(`banyetkilisi_${message.guild.id}`)
let kanal = db.fetch(`banlog_${message.guild.id}`)

if(!message.member.roles.cache.has(yetkili)) return message.channel.send(`Bu Komudu Kullanabilmen İçin <@&${yetkili}> Rolüne Sahip Olmalısın ! `)

let kisi = args[0]
let reason = args.slice(1).join(' ')
if (!kisi) return message.channel.send(`Banını Kaldıracağın Kullanıcının İD'sini Belirtmelisin ! `)
if (!reason) return message.channel.send(`Bir Sebep Belirtmelisiniz ! `)

const embed = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Unban`)
.setColor('BLACK')
.setDescription(`<@${kisi}> Adlı Kullanıcı **${reason}** Sebebiyle Banı Kalktı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(embed)

 
 let bantasi = db.get(`banlog_${message.guild.id}`)
  const banka = client.channels.cache.get(bantasi)
banka.send(
new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Unban`)
.setColor('BLACK')
.setDescription(`Banı Kalkan Kullanıcı:<@${kisi}> \n Banı Kalkan Yetkili: <@!${message.author.id}> \n Ban Kalkma Sebebi: **${reason}**`)
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
  name: 'unban'
}