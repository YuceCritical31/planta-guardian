const Discord = require("discord.js")
const client = new Discord.Client()
const express = require('express')
const http = require('http')
const fs = require("fs")
const config = require('./config.json')
const db = require('quick.db')


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
});


client.on("guildMemberAdd", async member => {

  let kanal = db.fetch(`hgkanal_${member.guild.id}`)
  let mesaj = db.fetch(`hgmesaj_${member.guild.id}`)


  
  if (!kanal) return;

  if (!mesaj) {
    client.channels.get(kanal).send(`${member} Sunucumuza Hoşgeldin `);
  }
    
  
  if (mesaj) {
    var mesajs = mesaj.replace("-uye-", `<@${member.user.id}>`).replace("-sunucu-", `${member.guild.name}`).replace("-uyesayısı-", `${member.guild.memberCount}`);
      return client.channels.cache.get(kanal).send(mesajs)

  }}
);
  



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
