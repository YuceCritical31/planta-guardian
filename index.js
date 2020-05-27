const Discord = require("discord.js");
const client = new Discord.Client();
const express = require('express');
const http = require('http')
const fs = require("fs"); //Dosya okuyucu modülü
const config = require('./config.json')

//Bu bot altyapısı BloodStains tarafından geliştirilmiştir, TheSourceCode'un eğitim amaçlı paylaştığı altyapı üzerine kuruludur!   

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("./komutlar/");

["command", "event"].forEach(handler => {

  require(`./işleyiciler/${handler}`)(client);


}); //Temel komut yükleyicisi, komutların çalışması için gereklidir.

client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(ch => ch.name === 'genel');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`discord v.12 hg aşaması tamamdır ! `);
});

client.on('message', async message => {
    if (message.content === 'fakegiriş') {
        client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    }
});


client.on('message', async message => {
    if (message.content === 'fakeçıkış') {
        client.emit('guildMemberRemove', message.member || await message.guild.fetchMember(message.author));
    }
});


client.login(config.token);
