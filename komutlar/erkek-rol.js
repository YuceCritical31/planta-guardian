const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDesciption(`<a:basarisiz:757851005483221022> Bu komutu kullanabilmek için "\`yönetici\`" yetkisine sahip olmalısın`));

if(args[0] === "sıfırla") {
const darkcodeee = new discord.MessageEmbed()
.setColor('GREEN')
.setDescription(`<a:basarili:757851040346538084> Sunucu İçin Ayarladığınız Erkek Rolü Başarıyla Sıfırlandı !`)
.setThumbnail(client.user.avatarURL)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(darkcodeee)
db.delete(`erkekrol_${message.guild.id}`)
return;
}

let rol = message.mentions.roles.first();   
if (!rol) {
  const darkcodee = new discord.MessageEmbed()
.setColor('RED')
.setDescription(`<a:basarisiz:757851005483221022> Ayarlayacağınız Erkek Rolünü Belirtiniz ! `)
.setThumbnail(client.user.avatarURL)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(darkcodee)
}
db.set(`erkekrol_${message.guild.id}`, rol.id)
const darkcode = new discord.MessageEmbed()
.setColor('GREEN')
.setDescription(`<a:basarili:757851040346538084> Erkek Rolü Başarıyla ${rol} Olarak Ayarlandı ! `)
.setThumbnail(client.user.avatarURL)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(darkcode)
  
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['erkekrol', 'erol', 'e-rol'],
  permlevel: 0
}
exports.help = {
  name: 'erkek-rol',
  description: 'erkek rolünü ayarlar',
  usage: '!erkek-rol @rol'
}