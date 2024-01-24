const username = document.getElementById('username')
const password = document.getElementById('password')
const loginBtn = document.getElementById('submit')
const form = document.querySelector("form")

//logs user out when sent back to login page
sessionStorage.removeItem('userId')


// verify login info to match user in database
form.addEventListener('submit', async (event) => {

    event.preventDefault()

    let flag = false

    const userData = await getUsers()
    console.log(userData)
    for (i in userData) {
        if (userData[i].username == username.value && userData[i].password == password.value) {
            sessionStorage.setItem('userId', userData[i].id)
            window.location.href = 'homePage.html'
            flag = true
        }
    }
    if (!flag) {
        alert('This username and password does not match an existing account.')
        username.value = ''
        password.value = ''
        return
    }
}
)


// set user as logged in

// redirect to home page (list of lists)