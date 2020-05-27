module.exports = client => {
client.user.setActivity('PLAYING')
//WATCHING: İzliyor
//PLAYING: Oynuyor
//LISTENINIG: Dinliyor
client.user.setStatus(`online`)
//dnd: Rahatsız Etme
//idle: Boşta
//online: Çevrimiçi
console.log(`${client.user.tag} ismi ile giriş yapıldı`); 

}


