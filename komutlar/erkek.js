const Discord = require("discord.js");
const db = require('quick.db')

exports.run = async (client, message, args) => {
  let kayıtsayı = db.fetch(`kayıtsayı_${message.author.id}`)
if(message.channel.id !== '754652799412731954') return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:basarisiz:757851005483221022> Bu Komudu Sadece \`register-chat\` Adlı Kanalda Kullanabilirsin ! `))

  
 let hata = new Discord.MessageEmbed()
 .setDescription('<a:basarisiz:757851005483221022> **Bu komudu kullanabilmek için** <@&754782912498499665> **yetkisine sahip olmalısın!**')
 .setColor('RED')
 
if (!message.member.roles.cache.get("754782912498499665")) return message.channel.send(hata) //Bu Komutu Kullanabilecek Yetkili Rol Id'si

let member = message.mentions.members.first();
let isim = args[1]
let yas = args[2]
if (!member) return message.channel.send(new Discord.MessageEmbed()
 .setDescription("<a:basarisiz:757851005483221022> **Bir _Üye_ Etiketlemelisin.**")  .setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
  .setThumbnail( message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })));
if (!isim) return message.channel.send(new Discord.MessageEmbed()
 .setDescription("<a:basarisiz:757851005483221022> **Bir _İsim_ Bazmalısın.**")  .setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
  .setThumbnail( message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })));
  if (!yas) return message.channel.send(new Discord.MessageEmbed()
 .setDescription("<a:basarisiz:757851005483221022> **Bir _Yaş_ Belirtmelisin.**")  .setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
  .setThumbnail( message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })));

member.setNickname(`乡 ${isim} | ${yas}`); 
member.roles.remove('754288519798718515') //Kayıt Edince Alınacak Rol
member.roles.add('756798079859949588') //Kayıt Edince Verilecek Rol
const embed = new Discord.MessageEmbed()
.setDescription(`<a:basarili:757851040346538084> ${member.user} adlı üyeye başarıyla <@&756798079859949588> rolünü verip ismini \`乡 ${isim} | ${yas}\` olarak ayarladım. \n <a:sagok:757855573554233396> Toplam Kayıt Sayın: **${kayıtsayı ? `**${kayıtsayı}**` : "0"}**`)
  .setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
  .setThumbnail( message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
.setColor('BLUE')
db.add(`kayıtsayı_${message.author.id}`, 1)

client.channels.cache.get('754652799412731954').send(embed)
  
  const embed2 = new Discord.MessageEmbed()
.setDescription(`<a:welcome:755812679037485127> ${member.user} adlı üye sunucumuza kayıt oldu. Seni aramızda görmekten zevk duyuyoruz :)`)
.setThumbnail(member.avatarURL)
  .setColor('BLUE')
client.channels.cache.get('752513115236728912').send(embed2)
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