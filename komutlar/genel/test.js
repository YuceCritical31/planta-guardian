const Discord = require('discord.js')
module.exports = {
  name: "test", //Komutun adı.
  category: "Genel", //Komutun kategorisi
  description: "Bakalım çalışıyor mu?", //Komutun açıklaması.
  run: async(client, message, args) => {
    
     const embed = new Discord.MessageEmbed()
.setAuthor(client.user.tag)    
.setDescription(`pingim ${client.ws.ping}`)
    

message.channel.send(embed)

  }
}