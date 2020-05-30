const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

  let kontrol = await db.fetch(`dil_${message.guild.id}`);

  if (kontrol == "TR_tr") {


     const i = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - İstatistik`)
.setColor('BLACK')
.setDescription(`Hizmet Verdiği Sunucu Sayısı = **${client.guilds.cache.size.toLocaleString()}** \n Hizmet Verdiği Kullanıcı Sayısı = **${client.users.cache.size.toLocaleString()}** \n Hizmet Verdiği Kanal Sayısı = **${client.channels.cache.size.toLocaleString()}** \n\n Botun Pingi = **${client.ws.ping}** \n Node.js Sürümü = **${process.version}** \n Discord.js Sürümü = **${discord.version}**`)
.setThumbnail(client.user.avatarURL())
message.channel.send(i)
  } else {
    
     const i = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - statistics`)
.setColor('BLACK')
.setDescription(`number of guilds = **${client.guilds.cache.size.toLocaleString()}** \n number of members = **${client.users.cache.size.toLocaleString()}** \n member of channels = **${client.channels.cache.size.toLocaleString()}** \n\n Bot Ping = **${client.ws.ping}** \n Node.js version = **${process.version}** \n Discord.js version = **${discord.version}**`)
.setThumbnail(client.user.avatarURL())
message.channel.send(i)
  }

  
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['i'],
  permlevel: 0
}
exports.help = {
  name: 'istatistik'
}