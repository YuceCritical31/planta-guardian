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

        let member = message.mentions.users.first() 
if (!member) return message.channel.send(`İsmini Değiştireceğiniz Kullanıcıyı Belirtiniz ! `)
let isim = args[1]
if (!isim) return message.channel.send(`Yeni Bir İsim Belirtiniz ! `)   

member.setNickname(isim)

const embed = new Discord.messageEmbed()
.setAuthor(client.user.username, client.user.avtarURL())
.setTitle(`${client.user.username} - İsim Değiştirme`)
.setColor('BLACK')
.setDescription(`İsmi Değişen Kullanıcı: ${member} \n İsmi Değiştiren Yetkili: <@${message.author.id} \n Yeni İsim: **${isim}**`)    


  }
}