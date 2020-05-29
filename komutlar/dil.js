const Discord = require("discord.js"),
  db = require("quick.db");

module.exports.run = async (client, message, args) => {
  let kontrol = await db.fetch(`dil_${message.guild.id}`);
  if (kontrol == "TR_tr") {
    let dil = args[0];
    if (!dil) {
      message.channel.send(
        "Litfen Bir Dil Belirtiniz . Seçenekler **TR_tr , EN_us**"
      );
      return;
    }
    if (dil === "EN_us") {
      db.set(`dil_${message.guild.id}`, dil);
      message.channel.send(`New language set to \`${dil}\``);
    } else if (dil === "TR_tr") {
      db.set(`dil_${message.guild.id}`, dil);
      message.channel.send(`Yeni dil \`${dil}\` olarak ayarlandı`);
    } else {
      message.channel.send("Lütfen Düzgün Bir Dil Belirtiniz . Seçenekler **TR_tr , EN_us**");
      return;
    }
  } else {
    let dil = args[0];
    if (!dil) {
      message.channel.send(
        "__Please specify a language! Languages: `TR_tr`, `EN_us`"
      );
      return;
    }
    if (dil === "EN_us") {
      db.set(`dil_${message.guild.id}`, dil);
      message.channel.send(`New language set to \`${dil}\``);
    } else if (dil === "TR_tr") {
      db.set(`dil_${message.guild.id}`, dil);
      message.channel.send(`Yeni dil \`${dil}\` olarak ayarlandı!`);
    } else {
      message.channel.send(
        "Incorrect language! Languages: `TR_tr`, `EN_us`"
      );
      return;
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["language", "lang"],
  permLevel: 3
};

exports.help = {
  name: "dil",
  description: "dil",
  usage: "dil"
};