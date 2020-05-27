const Discord = require('discord.js')
module.exports = {
  name: "ping",
  description: "pingini gösterir", 
  run: async(client, message, args) => {
    
     const embed = new Discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Ping`)  
.setDescription(`pingim = **${client.ws.ping}**`)
.setThumbnail(client.user.avatarURL())
    

message.channel.send(embed)

  }
}