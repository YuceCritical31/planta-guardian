const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  
 let hata = new Discord.MessageEmbed()
 .setDescription('**Bu komudu kullanabilmek için** <@&754782912498499665> **yetkisine sahip olmalısın!**')
 .setColor('RED')
 
if (!message.member.roles.cache.get("YETKILI ROL ID")) return message.channel.send(hata) //Bu Komutu Kullanabilecek Yetkili Rol Id'si

let member = message.mentions.members.first();
let isim = args.slice(1).join(" ");
let yas = args.slice(1).join(" ");
if (!member) return message.channel.send(new Discord.MessageEmbed()
 .setDescription("**Bir Üye Etiketlemelisin.**"));
if (!isim) return message.channel.send(new Discord.MessageEmbed()
 .setDescription"**Bir İsim Yazmalısın.**"));
  if (!yas) return message.channel.send("**Bir Yaş Yazmalısın.**");

member.setNickname(`乡 ${isim} | ${yas}`); 
member.roles.remove('754288519798718515') //Kayıt Edince Alınacak Rol
member.roles.add('756798079859949588') //Kayıt Edince Verilecek Rol
const embed = new Discord.MessageEmbed()

.setDescription(`${member.user} adlı üyeye başarıyla <@&756798079859949588> rolünü verip ismini \`乡 ${isim} | ${yas}\` olarak ayarladım.`)
client.channels.cache.get('754652799412731954').send(embed)
  //Kayıt Loglarını Kaydetmesini İstediğiniz Kanalın ID'si
};

exports.conf = {
enabled: true,
guildOnly: true,
aliases: [''],
permLevel: 0
};
exports.help = {
name: "erkek",
description: "Erkek Kayıt",
usage: "prefix!erkek"
};