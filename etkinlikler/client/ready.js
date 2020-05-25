module.exports = client => {
client.user.setActivity('DarkCode Boş Altyapı | BloodStains Tarafından', {type: 'DURUM'}); //Botun oynuyor kısımı, eğer bir sorun çıkarsa, {type: 'DURUM'} kısmını silebilirsiniz.
//WATCHING: İzliyor
//PLAYING: Oynuyor
//LISTENINIG: Dinliyor
client.user.setStatus(`durum`)
//dnd: Rahatsız Etme
//idle: Boşta
//online: Çevrimiçi
console.log(`${client.user.tag} ismi ile giriş yapıldı, BloodStains'e aittir!`); //Bot giriş yaptığında konsola kaydeder.

}


