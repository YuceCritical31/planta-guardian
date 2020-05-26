const Discord = require('discord.js')
const os = require('os')

module.exports = {
  name: "isim", //Komutun adı.
  category: "Genel", //Komutun kategorisi
  description: "Bakalım çalışıyor mu?", //Komutun açıklaması.
  run: async(client, message, args) => {
   
if (!message.member.hasPermission("MANAGE_NICKNAMES"))
    return message.channel.send(
      `Bu Komutu Kullanabilmek için \`İsimleri Yönet\` Yetkisine Sahip Olmalısın!`
    );

 var user = '';
        let member = message.mentions.users.first() || message.author
       


  }
}