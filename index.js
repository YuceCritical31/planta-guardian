const Discord = require("discord.js");
const client = new Discord.Client();
const express = require('express');
const http = require('http')
const fs = require("fs"); //Dosya okuyucu modülü

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

client.login();
