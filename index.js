const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs"); //Dosya okuyucu modülü

//Bu bot altyapısı BloodStains tarafından geliştirilmiştir, TheSourceCode'un eğitim amaçlı paylaştığı altyapı üzerine kuruludur!                                                                         

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("./komutlar/");

["command", "event"].forEach(handler => {

  require(`./işleyiciler/${handler}`)(client);


}); //Temel komut yükleyicisi, komutların çalışması için gereklidir.

client.login('NzE0NDQ4NzAwNTU0MDg0Mzky.Xsu0vQ.73Q5eusI5HIInM4-rK1hJdC_kxc');
