const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./config.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');


const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.on("guildMemberAdd", async member => {

  let kanal = db.fetch(`hgkanal_${member.guild.id}`)
  let mesaj = db.fetch(`hgmesaj_${member.guild.id}`)
 

  
  if (!kanal) return;

  if (!mesaj) {
    client.channels.cache.get(kanal).send(`Sunucumuza ${member} Adlı Kullanıcı Katıldı ! `);
  }
    
  
  if (mesaj) {
    var mesajs = mesaj.replace("-uye-", `${member}`).replace("-sunucu-", `${member.guild.name}`).replace("-uyesayısı-", `${member.guild.memberCount}`);
      return client.channels.cache.get(kanal).send(mesajs)

  }
});

client.on("guildMemberRemove", async member => {

  let kanal = db.fetch(`bbkanal_${member.guild.id}`)
  let mesaj = db.fetch(`bbmesaj_${member.guild.id}`)
 

  
  if (!kanal) return;

  if (!mesaj) {
    client.channels.cache.get(kanal).send(`Sunucumuzdan ${member} Adlı Kullanıcı Ayrıldı ! `);
  }
    
  
  if (mesaj) {
    var mesajs = mesaj.replace("-uye-", `${member}`).replace("-sunucu-", `${member.guild.name}`).replace("-uyesayısı-", `${member.guild.memberCount}`);
      return client.channels.cache.get(kanal).send(mesajs)

  }
});

client.on("guildMemberAdd", async member => {

  let kanal = db.fetch(`otorollog_${member.guild.id}`)
  let mesaj = db.fetch(`otorolmesaj_${member.guild.id}`)
  let rol = db.fetch(`otorol_${member.guild.id}`)
 

  
  if (!kanal) return;

member.roles.add(rol)

  if (!mesaj) {
    client.channels.cache.get(kanal).send(
new Discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`Rol Verildi`)
.setColor('BLACK')
.setDescription(`Sunucumuza ${member} Adlı Kullanıcı Katıldı . Otomatik Olarak <@&${rol}> Adlı Rol Verildi ! `)
)
  }
    
  
  if (mesaj) {
    var mesajs = mesaj.replace("-uye-", `${member}`).replace("-sunucu-", `${member.guild.name}`).replace("-rol-", `<@&${rol}>`);
 const embed = new Discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`Rol Verildi`)
.setColor('BLACK')
.setDescription(mesajs)
      return client.channels.cache.get(kanal).send(embed)

  }
});

client.on("guildMemberAdd", async member => {

  let kanal = db.fetch(`ototaglog_${member.guild.id}`)
  let mesaj = db.fetch(`ototagmesaj_${member.guild.id}`)
  let tag = db.fetch(`ototag_${member.guild.id}`)
 
member.setNickname(`${tag} | ${member.user.username}`)
  
  if (!kanal) return;


  if (!mesaj) {
    client.channels.cache.get(kanal).send(
new Discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`Tag Verildi`)
.setColor('BLACK')
.setDescription(`Sunucumuza ${member} Adlı Kullanıcı Katıldı . Otomatik Olarak **${tag}** Adlı Tag Verildi ! `)
)
  }
    
  
  if (mesaj) {
    var mesajs = mesaj.replace("-uye-", `${member}`).replace("-sunucu-", `${member.guild.name}`).replace("-tag-", `${tag}`);
 const embed = new Discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`Tag Verildi`)
.setColor('BLACK')
.setDescription(mesajs)
      return client.channels.cache.get(kanal).send(embed)

  }
});

client.on("guildMemberAdd", async member => {

  let kanal = db.fetch(`sayaçlog_${member.guild.id}`)
  let mesaj = db.fetch(`sayaçhoşgeldinmesaj_${member.guild.id}`)
  let sayaç = db.fetch(`sayaç_${member.guild.id}`)
   
  if (!kanal) return;


  if (!mesaj) {
    client.channels.cache.get(kanal).send(`Sunucumuza ${member} Adlı Kullanıcı Katıldı . Toplam **${member.guild.memberCount}** Kişi Olduk . **${sayaç}** Kişi Olmamıza **${sayaç - member.guild.memberCount}** Kişi Kaldı !  `)


  }
    
  
  if (!mesaj) {
    var mesajs = mesaj.replace("-uye-", `${member}`).replace("-sunucu-", `${member.guild.name}`).replace("-uyesayısı-", `${member.guild.memberCount}`).replace("-hedef-", `${sayaç}`).replace("-kalan-", `${sayaç - member.guild.memberCount}`)

      return client.channels.cache.get(kanal).send(mesajs)
  }

if (sayaç = member.guild.memberCount) {
 client.channels.cache.get(kanal).send(`Hedefe Ulaşıldı ! `)
db.delete(`sayaç_${member.guild.id}`)
db.delete(``)
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

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
