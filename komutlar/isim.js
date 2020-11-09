const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

  
  
 let hata = new discord.MessageEmbed()
 .setDescription('<a:basarisiz:757851005483221022> **Bu komudu kullanabilmek için** <@&770890151181549580> **yetkisine sahip olmalısın!**')
 .setColor('RED')
 
if (!message.member.roles.cache.get("770890151181549580")) return message.channel.send(hata) 
 let member = message.mentions.members.first();
if (!member) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(`<a:basarisiz:757851005483221022>  İsim Değiştireceğin Kullanıcıyı Belirtmelisin ! `))
let isim = args[1]
if (!isim) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(`<a:basarisiz:757851005483221022>  İsmini Belirtmelisin ! `))
let yaş = args[2]
if (!yaş) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(`<a:basarisiz:757851005483221022>  Yaşını Belirtmelisin ! `))
member.setNickname(`∡ ${isim} | ${yaş}`)

const darkcode = new discord.MessageEmbed()
.setColor('BLUE')
.setDescription(`**${member} kullanıcının ismini  \`∡ ${isim} | ${yaş}\` istediğiniz gibi ayarladım**`)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(darkcode)
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['i'],
  permlevel: 0
}
exports.help = {
  name: 'isim',
  description: 'erkek olarak kayıt eder',
  usage: 'İsim Değiştirmeye yarar qmi'
}