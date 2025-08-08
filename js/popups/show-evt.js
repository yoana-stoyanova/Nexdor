let block = JSON.parse(localStorage.getItem('block'));
let apt = JSON.parse(localStorage.getItem('apt'));

let title = document.querySelector('h1');
let from = document.getElementById('ap');
let content = document.getElementById('msg');

window.addEventListener("message", (event) => {
    if (event.data.action === "updateShowEvtPopup") {
        let evtId = event.data.evtId;

        let evt = apt['events'].find(x => x.id == evtId);

        title.textContent = evt['title'];

        let fromApt = block['apartments'].find(x => x.id == evt['from']);
        from.textContent = `ап. ${fromApt['id']} (${fromApt['name']})`;

        content.value = evt['content'];
        
    }
});