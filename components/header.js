let header = document.createElement("header")
let headerStyle = document.createElement("style")

headerStyle.innerHTML = `
body {
    background-color: #000;
}

header {
    max-width: 1781px;
    height: 83px;
    margin: 20px auto;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #000;
}

.no_under_line {
    text-decoration: none;
    color: black;
}

.search {
    width: 300px;
    height: 45px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    background-color: #151515;
}

.search img {
    margin-left: 9px;
}

.search input {
    background-color: transparent;
    color: white;
    width: fit-content;
    border: none;
    margin-left: 11px;
    outline: none;
}

.search input::placeholder {
    color: rgba(255, 255, 255, 0.45);
}

.right {
    width: 110px;
    height: 83px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

.people {
    height: 83px;
    border-radius: 100%;
}

.menu_people {
    position: absolute;
    width: 224px;
    height: auto;
    border-radius: 14px;
    background-color: white;
    left: -210px;
    top: 50px;
    display: none;
    box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.25);
    z-index: 8;
    cursor: pointer;
}

.blocks_menu {
    font-size: 20px;
    padding: 13px 22px;
    border-bottom: 1px solid #6A6A6A;
}

.open:hover {
    cursor: pointer;
}

.your_friends {
    width: 400px;
    height: 355px;
    position: absolute;
    right: 180px;
    top: 150px;
    z-index: 7;
    border-radius: 22px;
    background-color: white;
    display: none;
    padding: 22px;
}

.your_friends p {
    margin: 0;
    padding-bottom: 10px;
    font-size: 24px;
}

.your_friends .all-users {
    height: 267px;
    padding: 20px 0px 20px 0px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow-y: scroll;
}

.your_friends .all-users::-webkit-scrollbar {
    width: 5px;
    height: 0px;
    background-color: transparent;
}

.your_friends .all-users::-webkit-scrollbar-thumb {
    width: 5px;
    background: rgba(0, 0, 0, 0.596);
    border-radius: 10px;
}

.your_friends .all-users .user-profile {
    margin-top: 10px;
    display: flex;
    align-items: center;
    grid-gap: 16px;
    cursor: pointer;
}

.your_friends .all-users .user-profile .user-profile-img {
    width: 60px;
    height: 60px;
    background: url("./public/images/user.png") center center/cover no-repeat;
}

.your_friends .all-users .user-profile .user-username {
    color: #000;
    font-size: 24px;
}
`

header.innerHTML = `
<div class="left">
<a href="./ribbon.html" class="no_under_line">
    <img src="./public/icons/logo.svg" class="logo">
</a>
</div>

<div>
<div class="search">
    <img src="./public/icons/search (1) 1.svg" alt="">
    <input type="text" placeholder="Search">
</div>
</div>

<div class="right">
<img src="./public/icons/Vector 1.svg" class="open">
<img src="./public/images/user.png" class="people">

<div class="menu_people">
    <div class="blocks_menu your_profile">Your profile</div>
    <div class="blocks_menu show_friend">All users</div>
    <div class="blocks_menu setting">Edit </div>
    <div class="blocks_menu ribbon">Ribbon</div>
    <div class="blocks_menu log_out" style="border-bottom: none; color: red;">Log out</div>
</div>
<div class="your_friends">
    <p>Users:</p>
    <div class="all-users">
        <div class="user-profile">
            <div class="user-profile-img"></div>
            <p class="user-username">Hello</p>
        </div>
    </div>
</div>
</div>
</div>
`

document.body.prepend(header, headerStyle)

let your_profile = document.querySelector('.your_profile')
let show_friend = document.querySelector('.show_friend')
let setting = document.querySelector('.setting')
let log_out = document.querySelector('.log_out')
let ribbon = document.querySelector('.ribbon')

let menu_people = document.querySelector('.menu_people')
let open_menu = document.querySelector('.open')
let your_friends = document.querySelector('.your_friends')

open_menu.setAttribute('active', 'active')

open_menu.onclick = () => {
    if (open_menu.getAttribute("close")) {
        open_menu.style.transform = 'rotate(0deg)'
        menu_people.style.display = 'none'

        your_friends.style.display = 'none'

        open_menu.removeAttribute('close')
        open_menu.setAttribute('active', 'active')
    } else {
        open_menu.style.transform = 'rotate(180deg)'
        menu_people.style.display = 'block'

        your_profile.onclick = () => {
            window.location.href = './account.html'
        }

        show_friend.onclick = () => {
            if (your_friends.style.display == 'block') {
                your_friends.style.display = 'none'
            } else {
                your_friends.style.display = 'block'
            }
        }

        setting.onclick = () => {

        }

        log_out.onclick = () => {
            window.location.href = './registration.html'
            localStorage.clear()
        }

        ribbon.onclick = () => {
            window.location.href = './ribbon.html'
        }


        open_menu.removeAttribute('active')
        open_menu.setAttribute('close', false)
    }
}

let arr_all_users = []
axios.get(`${api}/Users`)
    .then(res => { arr_all_users = res.data, ALL_USERS(arr_all_users) })
    .catch(error => { console.log(error) })


function ALL_USERS(users) {
    let all_users = document.querySelector(`.all-users`)
    all_users.innerHTML = ``
    for (let item of users) {
        let user_profile = document.createElement(`div`)
        let user_profile_img = document.createElement(`div`)
        let user_username = document.createElement(`p`)

        all_users.prepend(user_profile)
        user_profile.prepend(user_profile_img, user_username)

        user_profile.classList.add(`user-profile`)
        user_profile_img.classList.add(`user-profile-img`)
        user_username.classList.add(`user-username`)

        user_profile_img.style.background = `background: url("./public/images/user.png") center center/cover no-repeat;`
        user_username.innerHTML = item.username
    }
}