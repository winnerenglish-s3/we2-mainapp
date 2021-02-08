import { db } from "src/router";

const gameStatus = async (schoolId) => {
  let gameRef = await db.collection("school").doc(schoolId).get();
  // สถานะเปิด / ปิด เกม
  const isEnable = gameRef.data().isEnableGame;
  return { isEnable };
};

// ข้อมูลตัวละครทั่วไป
// {"hat":2,"bottom":2,"color":6,"star":0,"top":2,"name":"lnwza5678"}
const characterInfomation = async (userId) => {
  let characterRef = await db.collection("student").doc(userId).get();

  if (characterRef.data().character) {
    return characterRef.data().character;
  } else {
    return false;
  }
};

export default { gameStatus, characterInfomation };
