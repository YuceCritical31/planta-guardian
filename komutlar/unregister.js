const Discord = require("discord.js");
const db = require('quick.db')

exports.run = async (client, message, args) => {

  
 let hata = new Discord.MessageEmbed()
 .setDescription('<a:basarisiz:757851005483221022> **Bu komudu kullanabilmek için** <@&754782912498499665> **yetkisine sahip olmalısın!**')
 .setColor('RED')
 
if (!message.member.roles.cache.get("754782912498499665")) return message.channel.send(hata) //Bu Komutu Kullanabilecek Yetkili Rol Id'si

let member = message.mentions.members.first();
if (!member) return message.channel.send(new Discord.MessageEmbed()
 .setDescription("<a:basarisiz:757851005483221022> **Bir _Üye_ Etiketlemelisin.**")  .setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
  .setThumbnail( message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })));

member.roles.remove('756798079859949588') //Kayıt Edince Alınacak Rol
member.roles.remove('754664235564400640') //Kayıt Edince Alınacak Rol
member.roles.add('754288519798718515') //Kayıt Edince Verilecek Rol
const embed = new Discord.MessageEmbed()
.setDescription(`<a:basarili:757851040346538084> ${member.user} adlı üye başarılı bir şekilde kayıtsıza atıldı`)
.setColor('PURPLE')
  .setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
  .setThumbnail( message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))

message.channel.send(embed)
  

  //Kayıt Loglarını Kaydetmesini İstediğiniz Kanalın ID'si
};

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ['u'],
permLevel: 0
};
exports.help = {
name: "kayıtsız",
description: "Erkek Kayıt",
usage: "prefix!erkek"
};