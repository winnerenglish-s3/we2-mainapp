import { db } from "src/router"

const gameInfomation = async schoolId => {
    let gameRef = await db.collection("school").doc(schoolId)
        .get()
    // สถานะเปิด / ปิด เกม
    const isEnable = gameRef.data().isEnableGame
    return {isEnable}
}

export default {gameInfomation}