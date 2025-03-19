//add settings
//work around popups
//add individual msg option
import { html, render } from 'https://cdn.skypack.dev/lit';

let position = localStorage.getItem('position');
let block = JSON.parse(localStorage.getItem('block'));

block = {
    "id": "666",
    "password": "666",
    "apartments": [
        {
            "events": [],
            "id": 1,
            "name": "1",
            "messages": [],
            "password": "m2i9iG"
        },
        {
            "messages": [],
            "name": "2",
            "id": 2,
            "password": "w7jGIN",
            "events": []
        },
        {
            "events": [],
            "password": "ocXbes",
            "name": "3",
            "id": 3,
            "messages": []
        },
        {
            "id": 4,
            "password": "5a833U",
            "events": [],
            "name": "4",
            "messages": []
        },
        {
            "password": "VcktuQ",
            "events": [],
            "id": 5,
            "name": "5",
            "messages": []
        }
    ],
    "name": "\"666\"",
    "key": "66"
}

let settingsBtn = document.getElementById("profile-icon");
let inputField = document.getElementById("search-bar");
let searchBtn = document.getElementById("search-btn");
let title = document.getElementById("block-apt")
let aptList = document.getElementById("apt-list");

if(position == 'member') settingsBtn.style.display = 'none';

title.textContent = `Бл. ${block["name"]} - Апартаменти`;

let apts = block["apartments"];
render(fillAptList(apts), aptList);

searchBtn.addEventListener('click', function(e){
    let input = inputField.value;

    if(input.trim() == '') return;

    let res = apts.filter(x => String(x["id"]).includes(input));
    render(fillAptList(res), aptList);

    history.pushState({ search: input }, "", `?search=${input}`);
});

function createDoor(apt){
    return html`
        <div id="${apt["id"]}" class="apt">
            <img src="./icons/apt-door.png" alt="door">
            <p>${apt["id"]}</p>
        </div>
    `;
}

function fillAptList(apts){
    return html`
     ${apts.map(apt => createDoor(apt))}
     `;
}

window.addEventListener("popstate", (event) => {
    let input = event.state ? event.state.search : "";
    let filteredApts = apts.filter(x => String(x.id).includes(input));

    render(fillAptList(filteredApts), aptList);
});