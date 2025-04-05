import { html, render } from 'https://cdn.skypack.dev/lit';

let position = localStorage.getItem('position');

renderOptions(position);

window.addEventListener('DOMContentLoaded', function(e){
    let exitBlockBtn = document.querySelector('button');
    let blockIdField = document.getElementById('block-id');

    if(position == "manager") {
        let changeBlockNameBtn = document.getElementById('change-block-name');
        let changeBlockPassBtn = document.getElementById('change-block-pass');
        let changeBlockKeyBtn = document.getElementById('change-block-key');
        let showAptPassBtn = document.getElementById('show-apt-passwords');
        let deleteBlockBtn = document.getElementById('delete-block');

        changeBlockNameBtn.addEventListener("click", () => {
            window.parent.postMessage({ action: "showChangeBlockNamePopup" }, "*");
        });

        changeBlockPassBtn.addEventListener("click", () => {
            window.parent.postMessage({ action: "showChangeBlockPassPopup" }, "*");
        });

        changeBlockKeyBtn.addEventListener("click", () => {
            window.parent.postMessage({ action: "showChangeBlockKeyPopup" }, "*");
        });

        showAptPassBtn.addEventListener("click", () => {
            window.parent.postMessage({ action: "showAptPassPopup" }, "*");
        });

        deleteBlockBtn.addEventListener("click", () => {
            window.parent.postMessage({ action: "showDeleteBlockPopup" }, "*");
        });
    }

    exitBlockBtn.addEventListener('click', function(e) {
        localStorage.clear();
        setTimeout(() => {
            window.open("../../index.html?nocache=" + Date.now(), "_self");
          }, 100);
    });

    blockIdField.textContent = `(ID: ${localStorage.getItem('id')})`;
});

function renderOptions(pos){
    let managerTemplate = html`
        <p class="p" id="change-block-name">Промяна на името на блока</p>
        <p class="p" id="change-block-pass">Промяна на паролата на блока</p>
        <p class="p" id="change-block-key">Промяна на общия ключ на блока</p>
        <p class="p" id="show-apt-passwords">Пароли на апартаментите</p>
        <p class="p" id="delete-block">Изтриване на блока</p>
        
        <button>Изход</button>
        <p id="block-id"></p>
    `;

    let memberTemplate = html`
        <button>Изход</button>
        <p id="block-id"></p>
    `;

    if(pos == 'manager') render(managerTemplate, document.getElementById('block-settings'));
    else render(memberTemplate, document.getElementById('block-settings'));
}