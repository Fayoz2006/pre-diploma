// Проверка пользователя на существование
if(localStorage.user) {
    if(!JSON.parse(localStorage.user).firstName) window.location.href = "registration.html"
} else {
    window.location.href = "registration.html"
}
