let block = JSON.parse(localStorage.getItem('block'));
let apt = JSON.parse(localStorage.getItem('apt'));

let title = document.querySelector('h1');
let from = document.getElementById('ap');
let content = document.getElementById('msg');

window.addEventListener("message", (event) => {
    if (event.data.action === "updateShowMsgPopup") {
        let msgId = event.data.msgId;
        console.log("Received ID in iframe:", event.data.msgId);

        let message = apt['messages'].find(x => x.id == msgId);

        console.log(message);

        title.textContent = message['title'];

        let fromApt = block['apartments'].find(x => x.id == message['from']);
        from.textContent = `ап. ${fromApt['id']} (${fromApt['name']})`;

        content.value = message['content'];
        
    }
});