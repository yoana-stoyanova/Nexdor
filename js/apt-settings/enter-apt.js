let block = JSON.parse(localStorage.getItem('block'));
let aptId = localStorage.getItem('apt-id');

console.log(block, aptId)
document.addEventListener("DOMContentLoaded", function () {
    let passwordField = document.getElementById('password');
    let btn = document.querySelector('button');

    btn.addEventListener('click', function() {
        if(passwordField.value.trim() == '') return;
         
        let apt = block['apartments'][Number(aptId) - 1];

        console.log(Number(aptId) - 1, apt);
        
        if(passwordField.value != apt.password) return;

        localStorage.setItem('apt', JSON.stringify(apt));
        
        setTimeout(() => {

            console.log('bruh');
            
            window.location.href = "../../homepage.html?nocache=" + new Date().getTime();
          }, 200);
    });

});
