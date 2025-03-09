//change block num
//fill page with apts
//check if user is a resident/manager
//add settings
//work around popups
//add individual msg option

let inputField = document.getElementById("search-bar");
let searchBtn = document.getElementById("search-btn");
let aptList = document.getElementById("apt-list");
let apts = aptList.getElementsByTagName("div");

console.log(apts);


searchBtn.addEventListener('click', function(e){
    console.log('click');
    
    let searchNum = inputField.value;

    if(searchNum == '') return;

    let aptsArr = Array.from(apts)

    aptsArr = aptsArr.filter(x => x.getElementsByTagName("p")[0].textContent.includes(searchNum));

    aptsArr.map(x => aptList.appendChild(x));
    

});