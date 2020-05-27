module.exports = client => {
client.user.setActivity('Discord.js v12')
//WATCHING: İzliyor
//PLAYING: Oynuyor
//LISTENINIG: Dinliyor
client.user.setStatus(`PLAYING`)
//dnd: Rahatsız Etme
//idle: Boşta
//online: Çevrimiçi
console.log(`${client.user.tag} ismi ile giriş yapıldı`); 

}


