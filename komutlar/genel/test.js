module.exports= {
  name: 'test', //Komutun adı (${prefix}test).
  aliases: ['test1'], //Komutun diğer isimleri.
  category: 'genel', //Komutun kategorisi.
  description: 'test komutu', //Komutun açıklaması.

  run: async(message) => { //Komut yükleyici modülleri
  	message.channel.send('Çalışıyorum :D') //Botun kanala mesaj göndermesini sağlar
  }
}