const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(` Bu komutu kullanabilmek için "\`yönetici\`" yetkisine sahip olmalısın`);

if(args[0] === "sıfırla") {
const darkcodeee = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL)  
.setTitle(`${client.user.username} -Kayıtçı Rol Sıfırla `)
.setColor('BLACK')
.setDescription(`Sunucu İçin Ayarladığınız Kayıtçı Rolü Başarıyla Sıfırlandı !`)
.setThumbnail(client.user.avatarURL)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(darkcodeee)
db.delete(`kayıtçırol_${message.guild.id}`)
return;
}

let rol = message.mentions.roles.first();   
if (!rol) {
  const darkcodee = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL)  
.setTitle(`${client.user.username} - Kayıtçı Rol Ayarla `)
.setColor('BLACK')
.setDescription(`Ayarlayacağınız Kayıtçı Rolünü Belirtiniz ! `)
.setThumbnail(client.user.avatarURL)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(darkcodee)
}
db.set(`kayıtçırol_${message.guild.id}`, rol.id)
const darkcode = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL)  
.setTitle(`${client.user.username} - Kayıtçı Rol Ayarlandı `)
.setColor('BLACK')
.setDescription(`Kayıtçı Rolü Başarıyla ${rol} Olarak Ayarlandı ! `)
.setThumbnail(client.user.avatarURL)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(darkcode)
  
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['kayıtçı-rol' ],
  permlevel: 0
}
exports.help = {
  name: 'kayıtçı',
  description: 'erkek rolünü ayarlar',
  usage: '!erkek-rol @rol'
}