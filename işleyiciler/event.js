const { readdirSync } = require('fs');
module.exports = (client) => {
    const load = dirs => {
        const events = readdirSync(`./etkinlikler/${dirs}/`).filter(bs => bs.endsWith('.js')); //.JS Uzantısıyla biten dosyaları botun okumasını sağlar.
        for(let file of events) {
            const evt = require (`../etkinlikler/${dirs}/${file}`);
            let eName = file.split('.')[0];
            client.on(eName,evt.bind(null,client));

        }
    }
    ["client", "guild"].forEach(x => load(x)); //Temel komut ve etkinlik yükleyicisi

}