const Discord = require("discord.js");
const db = require('quick.db')

exports.run = async (client, message, args) => {
  let kayıtsayı = db.fetch(`kayıtsayı_${message.author.id}`)
if(message.channel.id !== '774349626081148958') return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:basarisiz:757851005483221022> Bu Komudu Sadece \`register-chat\` Adlı Kanalda Kullanabilirsin ! `))

  
 let hata = new Discord.MessageEmbed()
 .setDescription('<a:basarisiz:757851005483221022> **Bu komudu kullanabilmek için** <@&774353380611981312> **yetkisine sahip olmalısın!**')
 .setColor('RED')
 
if (!message.member.roles.cache.get("774353380611981312")) return message.channel.send(hata)

let member = message.mentions.members.first();
  if (!member) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:basarisiz:757851005483221022>  Kız Olarak Kaydedeceğin Kullanıcıyı Belirtmelisin ! `))

  
member.roles.remove('774353422316601394') //Kayıt Edince Alınacak Rol
member.roles.add('774353419954814996') //Kayıt Edince Verilecek Rol
  member.roles.add('774576865183793163') //Kayıt Edince Verilecek Rol

const embed = new Discord.MessageEmbed()
.setDescription(`<a:basarili:757851040346538084> ${member.user} adlı üyenin <@&768109675358191616> rolünü alıp <@&774353419954814996>, <@&774576865183793163>  rollerini verdim. \n <a:sagok:757855573554233396> Toplam Kayıt Sayın: **${kayıtsayı ? `**${kayıtsayı}**` : "0"}**`)
.setColor('PURPLE')
  .setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
db.add(`kayıtsayı_${message.author.id}`, 1)

client.channels.cache.get('774349626081148958').send(embed)
  
  const embed2 = new Discord.MessageEmbed()
.setDescription(`<a:welcome:755812679037485127> ${member.user} adlı üye sunucumuza kayıt oldu. Aramıza Hoşgeldin :) `)
    .setColor('PURPLE')
client.channels.cache.get('774349649946476571').send(embed2)
};

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ['k'],
permLevel: 0
};
exports.help = {
name: "kız",
description: ".kız",
usage: ".kız"
};