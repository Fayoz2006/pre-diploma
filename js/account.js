let api = `https://frozen-beach-39942.herokuapp.com`

// Рендер аккаунта на странице account
let userData = JSON.parse(localStorage.user)
let h3_userName = document.querySelector(`.userName`)
let p_posts = document.querySelector(`.posts`)
let p_followers = document.querySelector(`.followers`)
let p_likes = document.querySelector(`.likes`)
let first_second_name = document.querySelector(`.name_surname`)

let total_likes = 0
h3_userName.innerHTML = userData.username
p_followers.innerHTML = userData.followers.length
first_second_name.innerHTML = `${userData.firstName} ${userData.secondName}`
p_likes.innerHTML = total_likes

let edit_profile = document.querySelector(`.edit_profile`)
edit_profile.onclick = () => {
    window.location.href = `createPost.html`
}

// Создание постов
let arr = []
const GET_REQUEST = () => {
    axios.get(api + `/Posts`)
        .then(res => { arr = res.data, ALL_POSTS(arr) })
        .catch(err => { console.log(err) })
}
GET_REQUEST()

let body = document.querySelector(`body`)
function ALL_POSTS(arr) {
    arr = arr.filter(item => item.userId._id === userData._id)
    let wrapper = document.querySelector(`.wrapper`)
    let no_posts = document.createElement(`b`)
    for (let props of arr) {
        let item = document.createElement(`div`)
        let author = document.createElement(`div`)
        let profile_img = document.createElement(`div`)
        let userName = document.createElement(`p`)

        item.classList.add(`item`)
        author.classList.add(`author`)
        profile_img.classList.add(`profile-img`)
        userName.classList.add(`userName`)

        wrapper.prepend(item)
        item.prepend(author)
        author.prepend(profile_img, userName)

        p_posts.innerHTML = arr.length
        userName.innerHTML = props.userId.username
        item.style.background = `url("${props.content}") center center/cover no-repeat`
        total_likes += props.likes

        item.onclick = () => {
            FIND_ITEM(props._id)
            background.style.left = '0'
            setTimeout(() => {
                post_modal_window.style.left = '70%'
                setTimeout(() => {
                    post_modal_window.style.left = '50%'
                }, 450);
            }, 200);
            body.style.overflow = `hidden`
        }
    }
    if (wrapper.innerHTML == ``) {
        wrapper.prepend(no_posts)
        no_posts.style.color = `rgb(70, 70, 70)`
        no_posts.style.fontSize = `34px`
        no_posts.style.position = `absolute`
        no_posts.style.left = `50%`
        no_posts.style.transform = `translateX(-50%)`
        no_posts.innerHTML = `No posts`
    } else {
        no_posts.style.display = `none`
    }
}
/////////////////////////////////////////////////////
function FIND_ITEM(id) {
    let finder = arr.filter(item => item._id === id)[0]
    let post_img = document.querySelector(`.post-img`)
    let userName = document.querySelector(`.post-userName`)
    let likes_of_posts = document.querySelector(`.likes-of-posts`)
    let comment_post = document.querySelector(`.comment-post`)
    post_img.style.background = `url("${finder.content}") center center/cover no-repeat`
    userName.innerHTML = finder.userId.username
    likes_of_posts.innerHTML = `${finder.likes} likes`
    comment_post.innerHTML = `Comment: ${finder.text}`
}

/////////////////////////////////////////////////////
// modal window
let background = document.querySelector('.background')
let post_modal_window = document.querySelector('.post-modal-window')

background.onclick = () => {
    post_modal_window.style.left = '70%'
    setTimeout(() => {
        post_modal_window.style.left = '-100%'
        setTimeout(() => {
            background.style.left = '-100%'
        }, 500);
    }, 100);
    body.style.overflow = `visible`
}

///////////////////////////////////////////////////////

let posts = document.querySelector(`.my_posts`)
let saved = document.querySelector(`.saved`)
let archive = document.querySelector(`.archive`)

saved.onclick = () => {
    saved.classList.add(`active`)
    posts.classList.remove(`active`)
    archive.classList.remove(`active`)
}

archive.onclick = () => {
    archive.classList.add(`active`)
    saved.classList.remove(`active`)
    posts.classList.remove(`active`)
}

posts.onclick = () => {
    posts.classList.add(`active`)
    saved.classList.remove(`active`)
    archive.classList.remove(`active`)
}
