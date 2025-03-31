let block = JSON.parse(localStorage.getItem('block'));
let apt = JSON.parse(localStorage.getItem('apt'));

let title = document.querySelector('h1');
let from = document.getElementById('ap');
let content = document.getElementById('msg');

window.addEventListener("message", (event) => {
    if (event.data.action === "updateShowEvtPopup") {
        let evtId = event.data.evtId;
        console.log("Received ID in iframe:", event.data.evtId);

        let evt = apt['events'].find(x => x.id == evtId);

        console.log(evt);

        title.textContent = evt['title'];

        content.value = evt['content'];
        
    }
});