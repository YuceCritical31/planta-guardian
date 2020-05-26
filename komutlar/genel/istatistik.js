const Discord = require('discord.js')
module.exports = {
  name: "i", //Komutun adı.
  category: "Genel", //Komutun kategorisi
  description: "Bakalım çalışıyor mu?", //Komutun açıklaması.
  run: async(client, message, args) => {
   

const i = new Discord.messageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())

  }
}