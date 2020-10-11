const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

  
if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("Bu komudu kullanabilmek için `Kullanıcı Adlarını Yönet` yetkisine sahip olmanız gerek.");

let member = message.mentions.members.first();
if (!member) return message.channel.send(new discord.MessageEmbed().setDescription(`İsim Değiştireceğin Kullanıcıyı Belirtmelisin ! `))
let isim = args[1]
if (!isim) return message.channel.send(new discord.MessageEmbed().setDescription(`İsmini Belirtmelisin ! `))
let yaş = args[2]
if (!yaş) return message.channel.send(new discord.MessageEmbed().setDescription(`Yaşını Belirtmelisin ! `))
member.setNickname(`乡 ${isim} | ${yaş}`)

const darkcode = new discord.MessageEmbed()
.setColor('BLUE')
.setDescription(`${member} kullanıcının ismini  \`乡 ${isim} | ${yaş}\` istediğiniz gibi ayarladım**`)
.setThumbnail(member.avatarURL)
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
  usage: '!erkek @kullanıcı isim yaş'
}