const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`Bu Komudu Kullanabilmen İçin \`Üyeleri Engelle\` Yetkisine Sahip Olmalısın ! `);
  
let yetkili = db.fetch(`banyetkilisi_${message.guild.id}`)
let kanal = db.fetch(`banlog_${message.guild.id}`)

if(!message.member.roles.cache.has(yetkili)) return message.channel.send(`Bu Komudu Kullanabilmen İçin <@&${yetkili}> Rolüne Sahip Olmalısın ! `)

  const kisi = message.mentions.users.first()
let reason = args.slice(1).join(' ');


}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'ban'
}