let api = `https://frozen-beach-39942.herokuapp.com`
let form = document.forms.createPost
let user_inp = form.querySelector(`[name="userId"]`)
let userData = JSON.parse(localStorage.user)

form.onsubmit = () => {
   event.preventDefault()
   user_inp.value = userData._id
   let post = {}
   let fm = new FormData(event.target)
   fm.forEach((value, key) => {
      post[key] = value
   })
   axios.post(`${api}/Posts`, post)
      .then(res => {
         console.log(res.data)
      })
      .catch(err => {
         console.log(err)
      })

   setInterval(() => {
      window.location.href = `account.html`
   }, 1000);
}