const Discord = require("discord.js");
const db = require('quick.db')

exports.run = async (client, message, args) => {
  let kayıtsayı = db.fetch(`kayıtsayı_${message.author.id}`)
  let user = message.mentions.users.first();
    if(!user) return message.channel.send(new Discord.MessageEmbed().setDescription('<a:nono:751840894868521010> Davet sayısını görmek istediğiniz yetkiyi etiketlemelisin'));




message.channel.send(new Discord.MessageEmbed()
.setDescription(`Etiketlediğiniz Kullanıcının Toplam Kayıt Sayısı: **${kayıtsayı ? `**${kayıtsayı}**` : "0"}**`))
.setColor('BLUE')
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)

  
 
};

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ['ks'],
permLevel: 0
};
exports.help = {
name: "kayıt-sayısı",
description: "Erkek Kayıt",
usage: "prefix!erkek"
};