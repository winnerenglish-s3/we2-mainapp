import { db } from "src/router";

const gameInfomation = async schoolId => {
  let gameRef = await db
    .collection("school")
    .doc(schoolId)
    .get();
  // สถานะเปิด / ปิด เกม
  const isEnable = gameRef.data().isEnableGame;
  return { isEnable };
};

const characterInfomation = async userId => {
   let characterRef = await db.collection("character")
      .where("userId", "==", userId)
        .get()
    
    if (characterRef.size) {
        return characterRef.docs[0].data()
    } else {
        return false
    }
};

export default { gameInfomation, characterInfomation };
