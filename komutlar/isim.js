const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

  
let hata = new discord.MessageEmbed()
 .setDescription('<a:basarisiz:757851005483221022> **Bu komudu kullanabilmek için** <@&770673146562871385> **yetkisine sahip olmalısın!**')
 .setColor('RED')
 
if (!message.member.roles.cache.get("770673146562871385")) return message.channel.send(hata) 
let member = message.mentions.members.first();
if (!member) return message.channel.send(new discord.MessageEmbed().setDescription(`İsim Değiştireceğin Kullanıcıyı Belirtmelisin ! `))
let isim = args[1]
if (!isim) return message.channel.send(new discord.MessageEmbed().setDescription(`İsmini Belirtmelisin ! `))
member.setNickname(`${isim}`)

const darkcode = new discord.MessageEmbed()
.setColor('BLUE')
.setDescription(`**${member} kullanıcının ismini  \`${isim}\` istediğiniz gibi ayarladım**`)
.setThumbnail(member.avatarURL)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(darkcode)
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['nick'],
  permlevel: 0
}
exports.help = {
  name: 'isim',
  description: 'erkek olarak kayıt eder',
  usage: '!erkek @kullanıcı isim yaş'
}