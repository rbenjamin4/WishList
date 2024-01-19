const myInput = document.getElementById("password")
const letter = document.getElementById("letter")
const capital = document.getElementById("capital")
const number = document.getElementById("number")
const length = document.getElementById("length")
const form = document.querySelector("form")
const username = document.getElementById("username")

// When the user clicks on the password field, show the message box
myInput.onfocus = function() {
  document.getElementById("message").style.display = "block"
}

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function() {
  document.getElementById("message").style.display = "none"
}

// When the user starts to type something inside the password field
myInput.onkeyup = function() {
  // Validate lowercase letters
  let lowerCaseLetters = /[a-z]/g
  if(myInput.value.match(lowerCaseLetters)) {  
    letter.classList.remove("invalid")
    letter.classList.add("valid")
  } else {
    letter.classList.remove("valid")
    letter.classList.add("invalid")
  }
  
  // Validate capital letters
  let upperCaseLetters = /[A-Z]/g
  if(myInput.value.match(upperCaseLetters)) {  
    capital.classList.remove("invalid")
    capital.classList.add("valid")
  } else {
    capital.classList.remove("valid")
    capital.classList.add("invalid")
  }

  // Validate numbers
  let numbers = /[0-9]/g
  if(myInput.value.match(numbers)) {  
    number.classList.remove("invalid")
    number.classList.add("valid")
  } else {
    number.classList.remove("valid")
    number.classList.add("invalid")
  }
  
  // Validate length
  if(myInput.value.length >= 8) {
    length.classList.remove("invalid")
    length.classList.add("valid")
  } else {
    length.classList.remove("valid")
    length.classList.add("invalid")
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault()

  const userObj = {
    username: username.value,
    password: myInput.value
  }

const userData = await getUsers()

for (i in userData){
 if(userData[i].username == username.value){
 alert('This username already exists! Please create a different one.')
 return
}
}


  postUsers(userObj)
  alert('Your account has been created!')
  window.location.href = 'homePage.html'
})



