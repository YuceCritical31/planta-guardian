const { Discord, Client, MessageEmbed } = require('discord.js');
const client = global.client = new Client({fetchAllMembers: true});
const ayarlar = require('./ayarlar.json');
const fs = require('fs');
const express = require('express');
const http = require('http');


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



// Güvenli tanım fonksiyonu
function guvenli(kisiID) {
  let uye = client.guilds.cache.get(ayarlar.guildID).members.cache.get(kisiID);
  let guvenliler = ayarlar.whitelist || [];
  if (!uye || uye.id === client.user.id || uye.id === ayarlar.owner || uye.id === uye.guild.owner.id || guvenliler.some(g => uye.id === g.slice(1) || uye.roles.cache.has(g.slice(1)))) return true
  else return false;
};
//Cezaladırma fonksiyonu
const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS"];
function cezalandir(kisiID, tur) {
  let uye = client.guilds.cache.get(ayarlar.guildID).members.cache.get(kisiID);
  if (!uye) return;
  if (tur == "cezalandır") return uye.roles.cache.has(ayarlar.boosterRole) ? uye.roles.set([ayarlar.boosterRole, ayarlar.jailRole]) : uye.roles.set([ayarlar.jailRole]);
  if (tur == "ban") return uye.ban({ reason: null }).catch();
};

// Kick koruması
client.on("guildMemberRemove", async üyecik => {
  let yetkili = await üyecik.guild.fetchAuditLogs({type: 'MEMBER_KICK'}).then(audit => audit.entries.first());
  if (!yetkili || !yetkili.executor ||  !ayarlar.kickGuard) return;
  cezalandir(yetkili.executor.id, "cezalandır");
  let logKanali = client.channels.cache.get(ayarlar.logChannelID);
  if (logKanali) { logKanali.send(
    new MessageEmbed()
    .setColor("#00ffdd")
    .setDescription("**__Birisine Sağ Tık İle Kick Atıldı__**")
    .addField(`Sunucudan Kicklenen Kullanıcı`,`${üyecik}`)
    .addField(`Sunucudan Kickleyen Yetkili`,`${yetkili.executor}`)
    .addField(`Yetkiliye Yapılan İşlem`,`Jaile Atılma`)
    .setFooter(`Bu Sunucu Benim Sayemde Korunuyor`)
  .setTimestamp())
   
    .catch(); };
});
// Ban koruması
client.on("guildBanAdd", async (guild, üyecik) => {
  let yetkili = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first());
  if (!yetkili || !yetkili.executor || guvenli(yetkili.executor.id) || !ayarlar.banGuard) return;
   cezalandir(yetkili.executor.id, "cezalandır");
  guild.members.unban(üyecik.id, "Sağ Tık İle Banlandığı İçin Geri Açıldı!").catch(console.error);
  let logKanali = client.channels.cache.get(ayarlar.logChannelID);
  if (logKanali) { logKanali.send(
    new MessageEmbed()
    .setColor("#00ffdd")
    .setDescription("**__Birisine Sağ Tık İle Ban Atıldı!__**")
    .addField(`Sunucudan Banlanan Kullanıcı`,`${üyecik}`)
    .addField(`Sunucudan Banlayan Yetkili`,`${yetkili.executor}`)
    .addField(`Yetkiliye Yapılan İşlem`,`Jaile Atılma`)
    .setFooter(`Bu Sunucu Benim Sayemde Korunuyor`)
    .setTimestamp()).catch();};
});
// Bot koruması
client.on("guildMemberAdd", async eklenenbotsunsen => {
  let yetkili = await eklenenbotsunsen.guild.fetchAuditLogs({type: 'BOT_ADD'}).then(audit => audit.entries.first());
  if (!yetkili.user.bot || !yetkili || !yetkili.executor || Date.now()-yetkili.createdTimestamp > 5000 || guvenli(yetkili.executor.id) || !ayarlar.botGuard) return;
  cezalandir(yetkili.executor.id, "cezalandır");
  cezalandir(eklenenbotsunsen.id, "ban");
  let logKanali = client.channels.cache.get(ayarlar.logChannelID);
  if (logKanali) { logKanali.send(
    new MessageEmbed()
    .setColor("#00ffdd")
    .setDescription("**__Birisi Sunuya Bir Bot Ekledi!__**")
    .addField(`Eklenen Bot Adı`,`${eklenenbotsunsen}`)
    .addField(`Ekleyen Yetkili`,`${yetkili.executor}`)
    .addField(`Yetkiliye Yapılan İşlem`,`Jaile Atılma`)
    .addField(`Bota Yapılan İşlem`,`Banlanma`)
    .setFooter(`Bu Sunucu Benim Sayemde Korunuyor`)
    .setTimestamp()).catch();};
});
// GuildUpdate - Sunucu ayarları koruması
client.on("guildUpdate", async (oldGuild, newGuild) => {
  let yetkili = await newGuild.fetchAuditLogs({type: 'GUILD_UPDATE'}).then(audit => audit.entries.first());
  if (!yetkili || !yetkili.executor || Date.now()-yetkili.createdTimestamp > 5000 || guvenli(yetkili.executor.id) || !ayarlar.serverGuard) return;
  cezalandir(yetkili.executor.id, "cezalandır");
  if (newGuild.name !== oldGuild.name) newGuild.setName(oldGuild.name);
  if (newGuild.iconURL({dynamic: true, size: 2048}) !== oldGuild.iconURL({dynamic: true, size: 2048})) newGuild.setIcon(oldGuild.iconURL({dynamic: true, size: 2048}));
  let logKanali = client.channels.cache.get(ayarlar.logChannelID);
  if (logKanali) { logKanali.send(
    new MessageEmbed()
    .setDescription("**__Birisi Sunucunun Ayarlarıyla Oynadı!__**")
    .addField(`Sunucu Ayarlarını Değiştiren Yetkili`,`${yetkili.executor}`)
    .addField(`Yetkiliye Yapılan İşlem`,`Jaile Atılma`)
    .addField(`Sunucuya Yapılan İşlem`,`Eski Haline Getirilme`)
    .setFooter(`Bu Sunucu Benim Sayemde Korunuyor`)
    .setColor("#00ffdd")
    .setTimestamp()).catch();};
});
// Kanal açtırmama
client.on("channelCreate", async channel => {
  let yetkili = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
  if (!yetkili || !yetkili.executor || Date.now()-yetkili.createdTimestamp > 5000 || guvenli(yetkili.executor.id) || !ayarlar.channelGuard) return;
  channel.delete({reason: null});
  cezalandir(yetkili.executor.id, "cezalandır");
  let logKanali = client.channels.cache.get(ayarlar.logChannelID);
  if (logKanali) { logKanali.send(
    new MessageEmbed()
    .setColor("#00ffdd")
    .setDescription("**__Birisi Bir Kanal Oluşturdu!__**")
    .addField(`Kanalı Oluşturan Yetkili`,`${yetkili.executor}`)
    .addField(`Yetkiliye Yapılan İşlem`,`Jaile Atılma`)
    .addField(`Açılan Kanala Yapılan İşlem`,`Silinme`) 
    .setFooter(`Bu Sunucu Benim Sayemde Korunuyor`)
    .setTimestamp()).catch(); };
});
// Kanal güncelleme koruması
client.on("channelUpdate", async (oldChannel, newChannel) => {
  let yetkili = await newChannel.guild.fetchAuditLogs({type: 'CHANNEL_UPDATE'}).then(audit => audit.entries.first());
  if (!yetkili || !yetkili.executor || !newChannel.guild.channels.cache.has(newChannel.id) || Date.now()-yetkili.createdTimestamp > 5000 || guvenli(yetkili.executor.id) || !ayarlar.channelGuard) return;
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
  let logKanali = client.channels.cache.get(ayarlar.logChannelID);
  if (logKanali) { logKanali.send(
    new MessageEmbed()
    .setColor("#00ffdd")
    .setDescription("**__Birisi Kanal Ayarlarıyla Oynadı!__**")
    .addField(`Kanalı Güncelleyen Yetkili`,`${yetkili.executor}`)
    .addField(`Yetkiliye Yapılan İşlem`,`Jaile Atılma`)
    .addField(`Düzenlenen Kanala Yapılan İşlem`,`Eski Haline Getirildi`)    
    .setFooter(`Bu Sunucu Benim Sayemde Korunuyor`)
    .setTimestamp()).catch();};
});
// Kanal sililince geri açma
client.on("channelDelete", async channel => {
  let yetkili = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
  if (!yetkili || !yetkili.executor || Date.now()-yetkili.createdTimestamp > 5000 || guvenli(yetkili.executor.id) || !ayarlar.channelGuard) return;
  cezalandir(yetkili.executor.id, "cezalandır");
  await channel.clone({ reason: "Kanal Koruma Sistemi" }).then(async kanal => {
    if (channel.parentID != null) await kanal.setParent(channel.parentID);
    await kanal.setPosition(channel.position);
    if (channel.type == "category") await channel.guild.channels.cache.filter(k => k.parentID == channel.id).forEach(x => x.setParent(kanal.id));
  });
  let logKanali = client.channels.cache.get(ayarlar.logChannelID);
  if (logKanali) { logKanali.send(
    new MessageEmbed()
    .setColor("#00ffdd")
    .setDescription("**__Birisi Bir Kanalı Sildi!__**")
    .addField(`Kanalı Silen Yetkili`,`${yetkili.executor}`)
    .addField(`Yetkiliye Yapılan İşlem`,`Jaile Atılma`)
    .addField(`Silinen Kanala Yapılan İşlem`,`Kanal Geri Açılıp İzinler Düzenlendi.`)    
    .setFooter(`Bu Sunucu Benim Sayemde Korunuyor`)
    .setTimestamp()).catch(); };
});

//Role Koruma

client.on("roleDelete", async role => {
  let yetkili = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
  if (!yetkili || !yetkili.executor || Date.now()-yetkili.createdTimestamp > 5000 || guvenli(yetkili.executor.id) || !ayarlar.roleGuard) return;
  cezalandir(yetkili.executor.id, "cezalandır");
  
  let logKanali = client.channels.cache.get(ayarlar.logChannelID);
  if (logKanali) { logKanali.send(
    new MessageEmbed()
    .setColor("#00ffdd")
    .setDescription("**__Birisi Bir Rol Sildi__**")
    .addField(`Rolü Silen Yetkili`,`${yetkili.executor}`)
    .addField(`Yetkiliye Yapılan İşlem`,`Jaile Atılma`)
    .setFooter(`Bu Sunucu Benim Sayemde Korunuyor`)
    .setTimestamp()).catch(); };
});
// Yt kapat fonksiyonu


  // loglandırma fonksiyonu
client.on("roleUpdate", async (oldRole, newRole) => {
  let entry = await newRole.guild.fetchAuditLogs({type: 'ROLE_UPDATE'}).then(audit => audit.entries.first());
  if (!entry || !entry.executor || !newRole.guild.roles.cache.has(newRole.id) || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id) || !ayarlar.roleGuard) return;
  cezalandir(entry.executor.id, "cezalandır");
  if (yetkiPermleri.some(p => !oldRole.permissions.has(p) && newRole.permissions.has(p))) {
    newRole.setPermissions(oldRole.permissions);
    newRole.guild.roles.cache.filter(r => !r.managed && (r.permissions.has("ADMINISTRATOR") || r.permissions.has("MANAGE_ROLES") || r.permissions.has("MANAGE_GUILD"))).forEach(r => r.setPermissions(36818497));
  };
  newRole.edit({
    name: oldRole.name,
    color: oldRole.hexColor,
    hoist: oldRole.hoist,
    permissions: oldRole.permissions,
    mentionable: oldRole.mentionable
  });
  let logKanali = client.channels.cache.get(ayarlar.logChannelID);
  if (logKanali) { logKanali.send(
    new MessageEmbed()
    .setColor("#00ffdd")
    .setTitle('Rol Güncellendi!')
    .setDescription(`${entry.executor} (${entry.executor.id}) tarafından **${oldRole.name}** rolü güncellendi! Güncelleyen kişi jaile atıldı ve rol eski haline getirildi.`)
    .setFooter(`Bu Sunucu Benim Sayemde Korunuyor`)
    .setTimestamp()).catch();    };
});

client.login(ayarlar.token)