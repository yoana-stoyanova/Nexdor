import { allBlocksArr } from "../db-config/firebaseFunctions.js";

export let position = localStorage.getItem('position');
export let blockId = localStorage.getItem('id');

export async function updateBlockStorage(){
    let arr = await allBlocksArr();
    
    let block = arr.find(x => x.id == blockId);

    localStorage.setItem('block', JSON.stringify(block));

    console.log(localStorage.getItem('block'));
    
}

export async function updateAptStorage() {
    let arr = await allBlocksArr();
    
    let block = arr.find(x => x.id == blockId);

    let oldApt = JSON.parse(localStorage.getItem('apt'));
    let apt = block['apartments'].find(x => x.id == oldApt.id)

    localStorage.setItem('block', JSON.stringify(block));
    localStorage.setItem('apt', JSON.stringify(apt));
}

// block = {
//         "id": "666",
//         "password": "666",
//         "apartments": [
//             {
//                 "events": [],
//                 "id": 1,
//                 "name": "1",
//                 "messages": [],
//                 "password": "m2i9iG"
//             },
//             {
//                 "messages": [],
//                 "name": "2",
//                 "id": 2,
//                 "password": "w7jGIN",
//                 "events": []
//             },
//             {
//                 "events": [],
//                 "password": "ocXbes",
//                 "name": "3",
//                 "id": 3,
//                 "messages": []
//             },
//             {
//                 "id": 4,
//                 "password": "5a833U",
//                 "events": [],
//                 "name": "4",
//                 "messages": []
//             },
//             {
//                 "password": "VcktuQ",
//                 "events": [],
//                 "id": 5,
//                 "name": "5",
//                 "messages": []
//             }
//         ],
//         "name": "\"666\"",
//         "key": "66"
//     }
