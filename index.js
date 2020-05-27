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
   return client.channels.cache.get(kanal).send(`Sunucumuza ${member} Adlı Kullanıcı Katıldı ! `);
  }
    
  
  if (mesaj) {
    var mesajs = mesaj.replace("-uye-", `<@${member.user.id}>`).replace("-sunucu-", `${member.guild.name}`).replace("-uyesayısı-", `${member.guild.memberCount}`);
      return client.channels.cache.get(kanal).send(mesajs)

  }}
);

client.on("guildMemberAdd", async member => {
  let rol = db.fetch(`otorol_${member.guild.id}`)
  let kanal = db.fetch(`otorollog_${member.guild.id}`)
  let mesaj = db.fetch(`otorolmesaj_${member.guild.id}`)

  if (!kanal) return;

member.roles.add(rol)

  if (!mesaj) {
   return client.channels.cache.get(kanal).send(`Sunucumuza ${member} Adlı Kullanıcı Katıldı . Otomatik Rolü Verildi ! `);
  }
    
  
  if (mesaj) {
    var mesajs = mesaj.replace("-uye-", `<@${member.user.id}>`).replace("-sunucu-", `${member.guild.name}`).replace("-rol-", `<@&${rol}>`);
 const embed = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setTitle(`Rol Verildi ! `)
      .setColor("BLACK")
      .setDescription(mesajs)
return member.guild.channels.cache.get(kanal).send(embed)

  }}
);
client.on("guildMemberAdd", async member => {
  let rol = db.fetch(`ototag_${member.guild.id}`)
  let kanal = db.fetch(`ototaglog_${member.guild.id}`)
  let mesaj = db.fetch(`ototagmesaj_${member.guild.id}`)

  if (!kanal) return;

member.setNickname(`${rol} | ${member.user.username}`)
  if (!mesaj) {
   return client.channels.cache.get(kanal).send(`Sunucumuza ${member} Adlı Kullanıcı Katıldı . Otomatik Tagı Verildi ! `);
  }
    
  
  if (mesaj) {
    var mesajs = mesaj.replace("-uye-", `<@${member.user.id}>`).replace("-sunucu-", `${member.guild.name}`).replace("-tag-", `${rol}`);
return member.guild.channels.cache.get(kanal).send(mesajs)

  }}
);

client.on("guildMemberRemove", async member => {
let kanal = db.fetch(`bbkanal_${member.guild.id}`)
let mesaj = db.fetch(`bbmesaj_${member.guild.id}`)

if (!kanal) return;
  
if (!mesaj) {
  client.channels.cache.get(kanal).send(`Sunucumuzdan ${member} Adlı Kullanıcı Ayrıldı ! `)
}

if (mesaj) {
  var mesajs = mesaj.replace("-uye-", `${member}`).replace("-sunucu-", `${member.guild.name}`).replace("-uyesayısı-", `${member.guild.memberCount}`)
return client.channels.cache.get(kanal).send(mesajs)      
}
  
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
