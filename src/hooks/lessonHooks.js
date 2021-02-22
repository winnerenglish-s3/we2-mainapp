import { db } from "src/router";

const lesson = () => {

    const grammar = async (level, unit) => {

      let getData = await db
        .collection("practiceList")
        .where("level", "==", level)
        .where("unit", "==", unit)
        .where("skill", "==", 'Grammar')
        .where("practiceType", "==", "grammarlesson")
        .get();
        
      let tempList = [];
      let tempLesson = []
        
      getData.forEach((res) => {
        tempList.push(res.id)
      })

      tempList = [...new Set(tempList)]

      for (let i = 0; i < tempList.length; i++) {
        

      }


      return tempList;

    };

    return { grammar };

}

export default { lesson };