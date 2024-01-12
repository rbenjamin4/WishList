const username = document.getElementById('username')
const password = document.getElementById('password')
const submitBtn = document.getElementById('submit')
const passwordLength = password.value



 // Validate input

const validate = () => {

 if (passwordLength < 8 || passwordLength > 20 || NaN) {
    alert('Your password length is outside the required range of 8 and 20 characters.')
    return;
  }

  console.log(passwordLength)

}

submitBtn.addEventListener('click', validate)