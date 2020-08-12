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

client.on('guildMemberAdd', member => { 
 let aylartoplam = {
    "01": "Ocak",
        "02": "Şubat",
        "03": "Mart",
        "04": "Nisan",
        "05": "Mayıs",
        "06": "Haziran",
        "07": "Temmuz",
        "08": "Ağustos",
        "09": "Eylül",
        "10": "Ekim",
        "11": "Kasım",
        "12": "Aralık"
  }
 let aylar = aylartoplam 
let user = client.users.cache.get(member.id);
require("moment-duration-format");
let kayıtçı = db.fetch(`kayıtçırol_${member.guild.id}`)

    const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gün = moment.duration(kurulus).format("D")   
    var kontrol;
    if (gün < 30) kontrol = 'Güvenilir Değil'
    if (gün > 30) kontrol = 'Güvenilir'   
  let kanal = "716606027511889940"
  if(!kanal) return
 member.guild.channels.get(kanal).send(`**Hoşgeldin ${member} seninle Beraber ${member.guild.memberCount || "DiscordAPI"} Kişiye Ulaştık **  \n**Kayıt Olabilmen İçin Yetkililere İsmini Yaşını Söylemelisin **\n**Hesabın Kurulduğu Tarih: ${moment(user.createdAt).format('DD')} ${aylar[moment(user.createdAt).format('MM')]} ${moment(user.createdAt).format('YYYY HH:mm:ss')}**\n **Bu Kullanıcı: ${kontrol}**\n<@&${kayıtçı}> ** Rolündeki yetkililer seninle ilgilenecektir** `)
  

  
})


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

//////////////
const invites = {};

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.cache.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});



client.on("guildMemberAdd", async member => {
if(member.user.bot) return;
  member.guild.fetchInvites().then(async guildInvites => {
    let kanal = await db.fetch(`davetlog_${member.guild.id}`);
    if (!kanal) return;
    const ei = invites[member.guild.id];

    invites[member.guild.id] = guildInvites;
    const invite = await guildInvites.find(i => (ei.get(i.code) == null ? (i.uses - 1) : ei.get(i.code).uses) < i.uses);
    const daveteden = member.guild.members.cache.get(invite.inviter.id);

    db.add(`davet_${invite.inviter.id}_${member.guild.id}`, +1);
    db.set(`bunudavet_${member.id}`, invite.inviter.id);
    let davetsayiv2 = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);

    let davetsayi;
    if (!davetsayiv2) davetsayi = 0;
     else davetsayi = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);

client.channels.cache.get(kanal).send(`Sunucuya Katılan Kullanıcı: ${member} \n Davet Eden Kullanıcı: ${daveteden} \n Davet Sayısı: **${davetsayi}**`)  

      }
    
  );
});
client.on("guildMemberRemove", async member => {
  let kanal = await db.fetch(`davetlog_${member.guild.id}`);
  if (!kanal) return;
  let davetçi = await db.fetch(`bunudavet_${member.id}`);
  const daveteden = member.guild.members.cache.get(davetçi);
      let mesaj = db.fetch(`davetbbmesaj_${member.guild.id}`)
  db.add(`davet_${davetçi}_${member.guild.id}`, -1);
  let davetsayi = await db.fetch(`davet_${davetçi}_${member.guild.id}`);
  
  if (!davetçi) {
    return client.channels.cache.get(kanal).send(`Sunumuzdan ${member} Ayrıldı. Davet Eden Bulunamadı!`);
  } else {
     
client.channels.cache.get(kanal).send(`Sunucudan Ayrılan Kullanıcı: ${member} \n Davet Eden Kullanıcı: ${daveteden} \n Davet Sayısı: **${davetsayi}**`)  
  
      }
    }
);