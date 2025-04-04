let block = JSON.parse(localStorage.getItem('block'));
let aptId = localStorage.getItem('apt-id');

document.addEventListener("DOMContentLoaded", function () {
    let passwordField = document.getElementById('password');
    let btn = document.querySelector('button');
    
    passwordField.value = 'MdkEvT';

    btn.addEventListener('click', function() {
        if(passwordField.value.trim() == '') return;
         
        let apt = block['apartments'][aptId - 1];

        if(passwordField.value != apt.password) return;

        localStorage.setItem('apt', JSON.stringify(apt));
        
        window.location.href = "https://yoana-stoyanova.github.io/Nexdor/homepage.html";
    });

});