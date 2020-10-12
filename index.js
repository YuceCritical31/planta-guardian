const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]}); //eğer en yukarıda client tanımlı ise bunu burdan kaldırıp yukarıya eklemelisin
const ayarlar = require('./ayarlar.json');
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

/////////////////////////////////////////////////tagalanarol

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = '乡'
  const sunucu = '752509868807553044'
  const kanal = '752513115236728912'
  const rol = '752869478227771512'

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("GREEN").setDescription(`<a:basarili:757851040346538084> ${newUser} \`${tag}\` Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RED").setDescription(`<a:basarisiz:757851005483221022> ${newUser} \`${tag}\` Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
}
});

client.on('guildMemberAdd', member => {
     let kanal = db.fetch(`güvenlik.${member.guild.id}`)
     if(!kanal) return;
  const rol = '754782912498499665'


       let aylar = {
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

  let bitiş = member.user.createdAt
      let günü = moment(new Date(bitiş).toISOString()).format('DD')
      let ayı = moment(new Date(bitiş).toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık").replace("13","CodAre")//codare
     let yılı =  moment(new Date(bitiş).toISOString()).format('YYYY')
     let saati = moment(new Date(bitiş).toISOString()).format('HH:mm')

let günay = `${günü} ${ayı} ${yılı} ${saati}`  

      let süre = member.user.createdAt
      let gün = moment(new Date(süre).toISOString()).format('DD')
      let hafta = moment(new Date(süre).toISOString()).format('WW')
      let ay = moment(new Date(süre).toISOString()).format('MM')
      let ayy = moment(new Date(süre).toISOString()).format('MM')
      let yıl =  moment(new Date(süre).toISOString()).format('YYYY')
     let yıl2 = moment(new Date().toISOString()).format('YYYY')

     let netyıl = yıl2 - yıl

     let created = ` ${netyıl} yıl  ${ay} ay ${hafta} hafta ${gün} gün önce`

     let kontrol;
     if(süre < 1296000000) kontrol = 'Bu hesap şüpheli!'
     if(süre > 1296000000) kontrol = 'Bu hesap güvenli!'

     let codare = new Discord.MessageEmbed()
     .setColor('GREEN')
     .setDescription('<a:sagok:757855573554233396> Sunucumuza hoş geldin <@'+member.id+'> \n\n <a:sagok:757855573554233396> Teyit kanalına geçerek kayıt olabilirsiniz. \n \n <a:sagok:757855573554233396> Hesap oluşturulma tarihi (`' + günay + '`) \n\n<a:sagok:757855573554233396>  Hesap durumu : **' + kontrol + '**')//codare
     .setImage('https://images-ext-2.discordapp.net/external/ugqqPrJ0ucBEQwPacBbsJ-AlNWrjV2diCWLEpG5GQyo/https/cdn.glitch.com/4ea1e74d-1c99-490a-9c13-d46ec11bc464%252Fgiphy.gif')
     .setTimestamp()
     client.channels.cache.get(kanal).send(codare)
  
     
     client.channels.cache.get(kanal).send(`<@&${rol}> sunucuya yeni üye katıldı...`)

})

//Serendia'dan alınıp V12 Çevirilmiştir!
//@Efe#9110


client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch(); 
  if (reaction.partial) await reaction.fetch();
  
  if (user.bot) return; 
  if (!reaction.message.guild) return; 
  if (reaction.message.guild.id !== "752509868807553044") return; //Sunucu idnizi sola girin
  
  if (reaction.message.channel.id === "765322395446804500") { //Kanal idnizi sola girin
    if (reaction.emoji.name === "1️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("754782883264069744") // İstediğiniz Rol idsini girin
      return user.send("Partner rolü başarıyla alındı!").catch(() => console.log("Dmden Mesaj Gönderemedim"));
    } 
  }
})


client.on('message', async message => {
  if (message.author.bot) return; 
  
  let pref = db.get(`prefix.${message.guild.id}`);
  let prefix;
  
  if (!pref) {
    prefix = "."; //ayarladığınız komutu kullanabilmek için prefixinizi ayarlayabilirsiniz
  } else {
    prefix = pref;
  }
  
  if (!message.content.startsWith(prefix)) return;
  
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let msg = message.content.toLowerCase();
  let cmd = args.shift().toLowerCase();
  
  if (msg.startsWith(prefix + "Partner Görme")) { //solda ki rolü istediğiniz gibi ayarlayabilirsiniz gerekli ayarlamaları yaptıktan sonra sola ayarladığınız komutu kullanacaksınız
    let channel = client.channels.cache.get(""); 
    const embed = new Discord.MessageEmbed()
    .setColor(0xffffff)
    .setTitle("Emoji Rol!")
    .setDescription(`1️⃣ Blue`) //emoji almak için herhangi bir kanala \:emojiadı: şeklinde yazıp alabilirsiniz
    channel.send(embed).then(async msg => {
      await msg.react("1️⃣");
    });
   };
});
//codare

