import { db } from "./firebaseConfig.js";
import { getFirestore, collection } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

export async function addBlock(newBlockData) {
    try {
      const blockRef = doc(db, "blocks", newBlockData.id);
      await setDoc(blockRef, newBlockData);
      console.log("Block added successfully!");
    } catch (error) {
      console.error("Error adding block:", error);
    }
}

export async function getAllBlocks() {
    try {
      const blocksCollectionRef = collection(db, "blocks");
      const querySnapshot = await getDocs(blocksCollectionRef);
      const blocks = [];
  
      querySnapshot.forEach((doc) => {
        blocks.push({ id: doc.id, ...doc.data() });
      });

      return blocks;
    } catch (error) {
      console.error("Error fetching blocks:", error);
      return [];
    }
}

export async function allBlocksArr() {
    let arr = await getAllBlocks();

    return arr;
}

export async function getBlockById(blockId) {
    try {
      const blockDocRef = doc(db, "blocks", blockId);
      const docSnapshot = await getDoc(blockDocRef);
  
      if (docSnapshot.exists()) {
        return { id: docSnapshot.id, ...docSnapshot.data() };
      } else {
        console.log("No such block!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching block:", error);
      return null;
    }
}

export async function updateBlockName(blockId, newName) {
  try {
    const blockRef = doc(db, "blocks", blockId);
    await updateDoc(blockRef, { name: newName });

    console.log("Block name updated successfully!");
  } catch (error) {
    console.error("Error updating block name:", error);
  }
}

export async function updateBlockPassword(blockId, newPassword) {
  try {
    const blockRef = doc(db, "blocks", blockId);
    await updateDoc(blockRef, { password: newPassword });

    console.log("Block password updated successfully!");
  } catch (error) {
    console.error("Error updating block password:", error);
  }
}

export async function updateBlockKey(blockId, newKey) {
  try {
    const blockRef = doc(db, "blocks", blockId);
    await updateDoc(blockRef, { key: newKey });

    console.log("Block key updated successfully!");
  } catch (error) {
    console.error("Error updating block key:", error);
  }
}

export async function deleteBlock(blockId) {
  try {
    const blockRef = doc(db, "blocks", blockId);
    await deleteDoc(blockRef);
    console.log(`Block ${blockId} deleted successfully!`);
    window.location.href = 'window.location.href = "https://yoana-stoyanova.github.io/Nexdor/index.html";';
  } catch (error) {
    console.error("Error deleting block:", error);
  }
}

export async function addMessageToApartment(blockId, aptId, messageObj) {
  try {
    const blockRef = doc(db, "blocks", blockId);
    const blockSnap = await getDoc(blockRef);

    let blockData = blockSnap.data();
    let apartments = blockData.apartments || [];
    
    let aptIndex = apartments.findIndex(apt => apt.id === aptId);
    if (aptIndex === -1) {
      console.error("Apartment not found!");
      return;
    }

    apartments[aptIndex].messages.push(messageObj);

    await updateDoc(blockRef, { apartments });
    console.log("Message added successfully!");
  } catch (error) {
    console.error("Error adding message:", error);
  }
}

export async function deleteMessage(blockId, aptId, msgId) {
  try {
    const blockRef = doc(db, `blocks/${blockId}`);
    const blockSnap = await getDoc(blockRef);

    if (!blockSnap.exists()) {
        console.error("Block not found");
        return;
    }

    let blockData = blockSnap.data();
    let apartments = blockData.apartments || [];

    let aptIndex = apartments.findIndex(a => a.id === aptId);
    if (aptIndex === -1) {
        console.error("Apartment not found");
        return;
    }

    apartments[aptIndex].messages = apartments[aptIndex].messages.filter(msg => msg.id !== msgId);

    await updateDoc(blockRef, { apartments });

} catch (error) {
    console.error("Error deleting message:", error);
}
}

export async function addEventToApartments(blockId, evtObj) {
  try {
    const blockRef = doc(db, "blocks", blockId);
    const blockSnap = await getDoc(blockRef);

    let blockData = blockSnap.data();
    let apartments = blockData.apartments || [];
    
    apartments.forEach(apt => apt.events.push(evtObj));

    await updateDoc(blockRef, { apartments });
    console.log("Event added successfully!");
  } catch (error) {
    console.error("Error adding event:", error);
  }
}

export async function deleteEvent(blockId, aptId, evtId) {
  try {
    const blockRef = doc(db, `blocks/${blockId}`);
    const blockSnap = await getDoc(blockRef);

    if (!blockSnap.exists()) {
        console.error("Block not found");
        return;
    }

    let blockData = blockSnap.data();
    let apartments = blockData.apartments || [];

    let aptIndex = apartments.findIndex(a => a.id === aptId);
    if (aptIndex === -1) {
        console.error("Apartment not found");
        return;
    }

    apartments[aptIndex].events = apartments[aptIndex].events.filter(evt => evt.id !== evtId);

    await updateDoc(blockRef, { apartments });

} catch (error) {
    console.error("Error deleting event:", error);
}
}

export async function updateAptName(blockId, aptId, newName) {
  try {
    const blockRef = doc(db, "blocks", blockId);
    const blockSnap = await getDoc(blockRef);

    let blockData = blockSnap.data();
    let apartments = blockData.apartments || [];
    
    let aptIndex = apartments.findIndex(apt => apt.id === aptId);
    if (aptIndex === -1) {
      console.error("Apartment not found!");
      return;
    }

    apartments[aptIndex].name = newName;

    await updateDoc(blockRef, { apartments });
    console.log("Name updated successfully!");
  } catch (error) {
    console.error("Error updating name:", error);
  }
}

export async function updateAptPassword(blockId, aptId, newPass) {
  try {
    const blockRef = doc(db, "blocks", blockId);
    const blockSnap = await getDoc(blockRef);

    let blockData = blockSnap.data();
    let apartments = blockData.apartments || [];
    
    let aptIndex = apartments.findIndex(apt => apt.id === aptId);
    if (aptIndex === -1) {
      console.error("Apartment not found!");
      return;
    }

    apartments[aptIndex].password = newPass;

    await updateDoc(blockRef, { apartments });
    console.log("Password updated successfully!");
  } catch (error) {
    console.error("Error updating password:", error);
  }
}