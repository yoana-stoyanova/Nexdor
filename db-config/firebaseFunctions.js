import { db } from "./firebaseConfig.js";
import { getFirestore, doc, setDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

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