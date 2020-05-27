const { readdirSync } = require('fs');
const ascii = require('ascii-table'); 


let table = new ascii("Komutlar");
table.setHeading('Komut', 'Durum'); 


module.exports  = (client) => {
    readdirSync("./komutlar/").forEach(dir => { 
        const commands = readdirSync(`./komutlar/`).filter(file => file.endsWith('.js')); 
        for(let file of commands) { 
            let pull = require(`../komutlar/${file}`);
            if(pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅') 
            } else { //Eğer bir hata varsa
                table.addRow(file, '❌')
                continue; 
            } if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));


        }
    })
    console.log(table.toString()); 
}