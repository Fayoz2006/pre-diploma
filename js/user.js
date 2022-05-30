let api = `https://frozen-beach-39942.herokuapp.com`

const saveUserLocally = (user) => {
    // Сохранить юзера локально
    localStorage.user = JSON.stringify(user.body)
}

// Вход
let to_come_in = document.forms.to_come_in
to_come_in.onsubmit = () => {
    event.preventDefault()
    let userData = {}
    let fm = new FormData(event.target)
    fm.forEach((value, key) => {
        userData[key] = value
    })
    axios.post(`${api}/Users/login`, userData)
        .then(res => { saveUserLocally(res.data) })
        .catch(error => { console.log(error) })
    open_modal_window()
    setInterval(() => {
        close_modal_window()
        setInterval(() => {
            window.location.href = `account.html`
        }, 250);
    }, 10000);
}


// Регистрация
let register = document.querySelector("#register")
let modal_w = document.querySelector('.instagram')
let bg_modal = document.querySelector('.bg-modal')

const open_modal_window = () => {
    modal_w.classList.add("loading")
    bg_modal.style.display = "block"

    setTimeout(() => {
        bg_modal.style.opacity = "1"
    }, 100);

}

const close_modal_window = () => {
    modal_w.classList.remove("loading")
    bg_modal.style.display = "none"
}

register.onsubmit = () => {
    event.preventDefault()
    let fm = new FormData(event.target)
    let obj = {}
    fm.forEach((value, key) => {
        obj[key] = value
    })
    axios.post(api + "/users", obj)
        .then(res => {
            saveUserLocally(res.data)
        })
        .catch(err => {
            console.log(err);
        })
    open_modal_window()
    setInterval(() => {
        close_modal_window()
        setInterval(() => {
            window.location.href = `account.html`
        }, 250);
    }, 10000);
}

// Выход

// Удаление аккаунта

// Изменение аккаунта