const discord = require('discord.js')
const Discord = require('discord.js')

const db = require('quick.db')

exports.run = async(client, message, args) => {

let kayıtsayı = db.fetch(`kayıtsayı_${message.author.id}`)
  

let member = message.mentions.members.first();

const başarılı = new discord.MessageEmbed()
.setColor('PURPLE')
.setDescription(`<a:sagok:757855573554233396> Toplam Yaptığın Kayıt Sayısı: **${kayıtsayı ? `**${kayıtsayı}**` : "0"}**`)
.setFooter(`Developer by qmi `)
message.channel.send(başarılı)
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['kayıt-sayım'],
  permlevel: 0
}
exports.help = {
  name: 'kayıt-sayım',
  description: 'erkek olarak kayıt eder',
  usage: '!erkek @kullanıcı isim yaş'
}