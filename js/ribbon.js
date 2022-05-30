let api = 'https://frozen-beach-39942.herokuapp.com'
let arr = []
// Создание постов
const GET_REQUEST = () => {
    axios.get(api + `/Posts`)
        .then(res => { arr = res.data, ALL_POSTS(arr) })
        .catch(err => { console.log(err) })
}
GET_REQUEST()

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

let log_out2 = document.querySelector(`.log-out`)
log_out2.onclick = () => {
    window.location.href = './registration.html'
    localStorage.clear()
}

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

let body = document.querySelector(`body`)
function ALL_POSTS(arr) {
    let screen_all_posts = document.querySelector(`.screen-all-posts`)
    screen_all_posts.innerHTML = ``
    let my_posts = arr.filter(item => item.userId._id === userData._id)
    p_posts.innerHTML = my_posts.length
    for (let props of arr) {
        let item = document.createElement(`div`)
        let top_side = document.createElement(`div`)
        let center_side = document.createElement(`div`)
        let bottom_side = document.createElement(`div`)
        let author = document.createElement(`div`)
        let profile_img = document.createElement(`div`)
        let post_username = document.createElement(`p`)
        let img_options = document.createElement(`img`)
        let top = document.createElement(`div`)
        let center = document.createElement(`div`)
        let bottom = document.createElement(`div`)
        let left_side = document.createElement(`div`)
        let img_like = document.createElement(`img`)
        let img_comment = document.createElement(`img`)
        let img_save = document.createElement(`img`)
        let img_archive = document.createElement(`img`)
        let likes_of_posts = document.createElement(`b`)
        let show_comments = document.createElement(`p`)
        let time_of_publication = document.createElement(`p`)
        let add_comment = document.createElement(`p`)

        screen_all_posts.prepend(item)
        item.prepend(top_side, center_side, bottom_side)
        top_side.prepend(author, img_options)
        author.prepend(profile_img, post_username)
        bottom_side.prepend(top, center, bottom)
        top.prepend(left_side, img_archive)
        left_side.prepend(img_like, img_comment, img_save)
        center.prepend(likes_of_posts, show_comments, time_of_publication)
        bottom.prepend(add_comment)

        item.classList.add(`item`)
        top_side.classList.add(`top-side`)
        center_side.classList.add(`center-side`)
        bottom_side.classList.add(`bottom-side`)
        author.classList.add(`author`)
        profile_img.classList.add(`profile-img`)
        post_username.classList.add(`post-username`)
        top.classList.add(`top`)
        center.classList.add(`center`)
        bottom.classList.add(`bottom`)
        left_side.classList.add(`left-side`)
        img_like.classList.add(`img-like`)
        img_comment.classList.add(`img-comment`)
        img_save.classList.add(`img-save`)
        img_archive.classList.add(`img-archive`)
        likes_of_posts.classList.add(`likes_of_posts`)
        show_comments.classList.add(`show-comments`)
        time_of_publication.classList.add(`time-of-publication`)
        add_comment.classList.add(`add-comment`)

        img_like.setAttribute(`src`, `./public/icons/unactive-like.svg`)
        img_comment.setAttribute(`src`, `./public/icons/comment.svg`)
        img_save.setAttribute(`src`, `./public/icons/unsaved.svg`)
        img_archive.setAttribute(`src`, `./public/icons/archive 1.svg`)
        likes_of_posts.innerHTML = `${props.likes} likes`
        show_comments.innerHTML = `Посмотреть все коментарии (${props.comments})`
        time_of_publication.innerHTML = `4 часа назад`
        add_comment.innerHTML = `Добавить коментарий...`

        post_username.innerHTML = props.userId.username
        center_side.style.background = `url("${props.content}") center center/cover no-repeat`

        center_side.onclick = () => {
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
}

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