const discord = require('discord.js')
const Discord = require('discord.js')

const db = require('quick.db')

exports.run = async(client, message, args) => {

    
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:basarisiz:757851005483221022>  Bu komutu kullanabilmek için "\`yönetici\`" yetkisine sahip olmalısın`));


if(args[0] === "sıfırla") {
const Darkcode = new discord.MessageEmbed()
.setColor('GREEN')
.setDescription(`<a:basarili:757851040346538084> Kayıt Olunacak Kanal Başarıyla Sıfırlandı ! `)
.setThumbnail(client.user.avatarURL)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(Darkcode)
db.delete(`kayıtkanal_${message.guild.id}`)
return;
}

let kanal = message.mentions.channels.first();   
if (!kanal) {
  const DarkCode = new discord.MessageEmbed()
.setColor('RED')
.setDescription(`<a:basarisiz:757851005483221022> Kayıt Olunacak Kanalı Belirtiniz !  `)
.setThumbnail(client.user.avatarURL)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(DarkCode)
}
db.set(`kayıtkanal_${message.guild.id}`, kanal.id)
const darkcode = new discord.MessageEmbed()
.setColor('GREEN')
.setDescription(`<a:basarili:757851040346538084> Kayıt Olunacak Kanal ${kanal} Olarak Ayarlandı ! `)
.setThumbnail(client.user.avatarURL)
.setFooter(`Developer by qmi! `)
message.channel.send(darkcode)
  
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['kayıtkanal', 'kkanal', 'k-kanal'],
  permlevel: 0
}
exports.help = {
  name: 'kayıt-kanal',
  description: 'Kayıt Olunacak Kanalı Ayarlar',
  usage: '!kayıt-kanal #kanal'
}