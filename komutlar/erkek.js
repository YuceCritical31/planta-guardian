const Discord = require("discord.js");
const db = require('quick.db')

exports.run = async (client, message, args) => {
  let kayıtsayı = db.fetch(`kayıtsayı_${message.author.id}`)
if(message.channel.id !== '772465191018954752') return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:basarisiz:757851005483221022> Bu Komudu Sadece \`║kayıt-chat\` Adlı Kanalda Kullanabilirsin ! `))

  
 let yetkiyok = new Discord.MessageEmbed()
 .setDescription('<a:basarisiz:757851005483221022> **Bu komudu kullanabilmek için** <@&770890151181549580> **yetkisine sahip olmalısın!**')
 .setColor('RED')
 
if (!message.member.roles.cache.get("770890151181549580")) return message.channel.send(yetkiyok) 

let member = message.mentions.members.first();
  if (!member) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:basarisiz:757851005483221022>  Erkek Olarak Kaydedeceğin Kullanıcıyı Belirtmelisin ! `))


   member.roles.remove('770898654546362368') //Kayıt Edince Alınacak Rol
   member.roles.add('770473551127248906') //Kayıt Edince Verilecek Rol1
   member.roles.add('770473550431518772') //Kayıt Edince Verilecek Rol2

  
const kayıtsohbet = new Discord.MessageEmbed()
  .setDescription(`<a:basarili:757851040346538084> ${member.user} adlı üyenin <@&770898654546362368> rolünü alıp <@&770473551127248906>, <@&770473550431518772>  rollerini verdim. \n <a:sagok:757855573554233396> Toplam Kayıt Sayın: **${kayıtsayı ? `**${kayıtsayı}**` : "0"}**`)
  .setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
  .setColor('#b2fae6')
db.add(`kayıtsayı_${message.author.id}`, 1)
message.channels.send(kayıtsohbet)
  
const genelsohbet = new Discord.MessageEmbed()
   .setDescription(`<a:welcome:755812679037485127> ${member.user} adlı üye sunucumuza kayıt oldu. Aramıza Hoşgeldin :) `)  .setColor('#0e3bfa')
client.channels.cache.get('772420774375850014').send(genelsohbet)
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