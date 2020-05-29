const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../config.json');

var prefix = ayarlar.prefix;

module.exports = client => {
const aktiviteListesi = [
  client.user.setGame(`${client.guilds.size.toLocaleString()} Sunucu! ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Kullanıcı!`),
   
] 

  client.user.setStatus('Dnd')
  
  setInterval(() => {
    const Aktivite = Math.floor(Math.random() * (aktiviteListesi.length - 1))
    client.user.setActivity(aktiviteListesi[Aktivite])
  }, 7000)
};