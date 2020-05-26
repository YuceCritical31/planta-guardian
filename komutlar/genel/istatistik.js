const Discord = require('discord.js')
module.exports = {
  name: "i", //Komutun adı.
  category: "Genel", //Komutun kategorisi
  description: "Bakalım çalışıyor mu?", //Komutun açıklaması.
  run: async(client, message, args) => {
   

     const i = new Discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - İstatistik`)
.setColor('BLACK')
.setDescription(`Hizmet Verdiği Sunucu Sayısı = **${client.guilds.cache.size.toLocaleString()}** \n Hizmet Verdiği Kullanıcı Sayısı = **${client.users.cache.size.toLocaleString}`)

message.channel.send(i)



  }
}