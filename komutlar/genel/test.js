const Discord = require('discord.js')
module.exports = {
  name: "test", //Komutun adı.
  category: "Genel", //Komutun kategorisi
  description: "Bakalım çalışıyor mu?", //Komutun açıklaması.
  run: async(client, message, args) => {
    
     const embed = new Discord.MessageEmbed()
    
     .setDescription('**Çalışıyorum :)**')

message.channel.send(embed)

  }
}