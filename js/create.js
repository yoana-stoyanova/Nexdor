let continueBtn = document.getElementById('continue-btn');
let createBtn = document.getElementById('create-btn');

continueBtn.addEventListener('click', function(e) {
    e.preventDefault();

    let id = document.getElementById('id').value;
    let password = document.getElementById('password').value;
    let rePass = document.getElementById('re-pass').value;

    if(!(id.trim() != '' && password.trim() != 0 && password == rePass)) return;

    console.log(11);
    

    document.getElementById("part-one").style.display = "none";
    document.getElementById("part-two").style.display = "flex";

    createBtn.addEventListener('click', function(e) {
        e.preventDefault();

        let num = document.getElementById('num').value;
        let key = document.getElementById('key').value;
        let reKey = document.getElementById('re-key').value;

        if(!(num.trim() != '' && key.trim() != 0 && key == reKey)) return;

        //add error identification & limits

        let apartments = Array.from({ length: num }, (_, i) => ({
            id: i + 1,
            name: `${i + 1}`,
            password: generatePassword(),
            messages: [],
            events: []
        }));

        let block = {
            id,
            password,
            key,
            apartments
        }

        //publish block

        window.location.href = "./enter.html";
        window.alert("Блокът е успешно създаден.");

        console.log(block);
        

    });

});

function generatePassword(length = 6) {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}