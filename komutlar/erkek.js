const Discord = require("discord.js");
const db = require('quick.db')

exports.run = async (client, message, args) => {
  let kayıtsayı = db.fetch(`kayıtsayı_${message.author.id}`)
if(message.channel.id !== '770673146838646784') return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:basarisiz:757851005483221022> Bu Komudu Sadece \`register-chat\` Adlı Kanalda Kullanabilirsin ! `))

  
 let hata = new Discord.MessageEmbed()
 .setDescription('<a:basarisiz:757851005483221022> **Bu komudu kullanabilmek için** <@&770673146562871385> **yetkisine sahip olmalısın!**')
 .setColor('RED')
 
if (!message.member.roles.cache.get("770673146562871385")) return message.channel.send(hata) //Bu Komutu Kullanabilecek Yetkili Rol Id'si

let member = message.mentions.members.first();
if (!member) return message.channel.send(new Discord.MessageEmbed()
 .setDescription("<a:basarisiz:757851005483221022> **Bir _Üye_ Etiketlemelisin.**")  .setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
  .setThumbnail( message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })));


member.roles.remove('771071491579314207') //Kayıt Edince Alınacak Rol
member.roles.add('770673146583449601') //Kayıt Edince Verilecek Rol
const embed = new Discord.MessageEmbed()
.setDescription(`<a:basarili:757851040346538084> ${member.user} adlı üyeye başarıyla <@&770673146583449601> rolünü verdim. \n <a:sagok:757855573554233396> Toplam Kayıt Sayın: **${kayıtsayı ? `**${kayıtsayı}**` : "0"}**`)
.setColor('PURPLE')
  .setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
  .setThumbnail( message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
db.add(`kayıtsayı_${message.author.id}`, 1)

client.channels.cache.get('771071600799121459').send(embed)
  
  const embed2 = new Discord.MessageEmbed()
  .setColor('BLUE')
.setDescription(`<a:welcome:755812679037485127> ${member.user} adlı üye sunucumuza kayıt oldu. Seni aramızda gördüğümüz için şanslıyız..`)
  .setThumbnail( message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))  .setColor('PURPLE')
client.channels.cache.get('771071615777505320').send(embed2)
  //Kayıt Loglarını Kaydetmesini İstediğiniz Kanalın ID'si
};

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ['e'],
permLevel: 0
};
exports.help = {
name: "erkek",
description: "Erkek Kayıt",
usage: "prefix!erkek"
};