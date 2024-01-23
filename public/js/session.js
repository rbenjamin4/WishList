let currentUser

if(!sessionStorage.getItem('userId')){
    window.location.href = 'index.html'
}else{
    currentUser = sessionStorage.getItem('userId')
}