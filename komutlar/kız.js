const discord = require('discord.js')
const Discord = require('discord.js')

const db = require('quick.db')

exports.run = async(client, message, args) => {

let kanal = db.fetch(`kayıtkanal_${message.guild.id}`)
let kayıtsayı = db.fetch(`kayıtsayı_${message.author.id}`)
  
if(!message.member.roles.has('755779189969256479')) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:basarisiz:757851005483221022> Bu Komudu Kullanabilmen İçin <@755779189969256479> Adlı Role Sahip olman Lazım ! `))
if(message.channel.id !== kanal) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:basarisiz:757851005483221022> Bu Komudu Sadece <#${kanal}> Adlı Kanalda Kullanabilirsin ! `))

let member = message.mentions.members.first();
if (!member) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:basarisiz:757851005483221022> Erkek Olarak Kayıt Edeceğin Kullanıcıyı Belirtmelisin ! `))
let isim = args[1]
if (!isim) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:basarisiz:757851005483221022> İsmini Belirtmelisin ! `))
let yaş = args[2]
if (!yaş) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:basarisiz:757851005483221022> Yaşını Belirtmelisin ! `))
member.setNickname(`乡 ${isim} | ${yaş}`)
member.roles.remove('755779192393564240')
member.roles.add('755779188753039471')

const darkcode = new discord.MessageEmbed()
.setColor('BLUE')
.setDescription(` ${member} **Adlı üyeye** <@755779188753039471> rolünü verip ismini \`乡 ${isim} | ${yaş}\` **olarak ayarladım**
                 \n <a:sagok:757855573554233396> Erkek Olarak Kayıt Eden Kullanıcının Kayıt Sayısı: **${kayıtsayı ? `${kayıtsayı}` : "0"}**`)
.setThumbnail(member.avatarURL)
.setFooter(`Developer by qmi `)
message.channel.send(darkcode)
db.add(`kayıtsayı_${message.author.id}`, 1)
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['e'],
  permlevel: 0
}
exports.help = {
  name: 'erkek',
  description: 'erkek olarak kayıt eder',
  usage: '!erkek @kullanıcı isim yaş'
}