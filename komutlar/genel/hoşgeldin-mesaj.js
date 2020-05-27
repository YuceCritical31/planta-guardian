const discord = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'hoşgeldin-mesaj',
  description: 'deneme',
  run: async(client, message, args) => {

let mesaj = args.slice(0).join(' ')


if (!mesaj) return message.channel.send(`Lütfen Bir Mesaj belirtiniz ! Örnek \`-hoşgeldin-mesaj **-sunucu-** Adlı \`  `)

}
}