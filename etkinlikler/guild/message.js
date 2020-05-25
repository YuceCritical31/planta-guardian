const config = require('../../config.json');
module.exports = async (client,message) => {
  let prefix = config.prefix;

  // Mesaj gönderenin bot olup olmadığını kontrol eder

  if (message.author.bot) return;

  // Bot, DM yoluyla yazılan mesajları görmezden gelir

  if (message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);

  // Prefixle başlamayan komutlara yanıt vermeyi engeller
  
  if (!command.startsWith(prefix)) return;

   // Komutu okumayı sağlar
   
  let cmd = client.commands.get(command.slice(prefix.length));

  if (!cmd) return;

  if (cmd) cmd.run(client, message, args);
}