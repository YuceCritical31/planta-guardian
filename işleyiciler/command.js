const { readdirSync } = require('fs');
const ascii = require('ascii-table'); // npm install ascii-table 
// ASCİİ şeklinde komut yükleyicisidir, bir hata olsa bile komutları yüklemeye devam eder. TheSourceCode'den alıntıdır, bizde yalan yok :D.

let table = new ascii("Komutlar");
table.setHeading('Komut', 'Durum'); //Türkçeye çevrildi 


module.exports  = (client) => {
    readdirSync("./komutlar/").forEach(dir => { //Komutlar klasörünü okumayı sağlar
        const commands = readdirSync(`./komutlar/${dir}/`).filter(file => file.endsWith('.js')); //.JS Uzantısıyla biten dosyaları botun okumasını sağlar.
        for(let file of commands) { //Hatasız komutları yükler
            let pull = require(`../komutlar/${dir}/${file}`);
            if(pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅') //Hatasız komutları yükleme son.
            } else { //Eğer bir hata varsa
                table.addRow(file, '❌')
                continue; // Bir hata olsa bile komutları yüklemeye devam eder.
            } if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));


        }
    })
    console.log(table.toString()); 
}