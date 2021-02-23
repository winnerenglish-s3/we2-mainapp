import { db } from "src/router";

const lesson = () => {

  const grammar = async (level, unit) => {
      
    let refsURL = "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/grammar/vdoGrammar/image/";

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
        let newData = {
          order:res.data().order,
          id:res.id
        }
        tempList.push(newData);
      })

      tempList = [...new Set(tempList)]

      tempList.sort((a,b) => a.order - b.order)

      for (let i = 0; i < tempList.length; i++) {
        
        let getLesson = await db.collection("practiceData")
          .doc("server")
          .collection("practice")
          .where("practiceListId", "==", tempList[i].id)
          .get()
        
        getLesson.forEach(resLesson => {
          let newData = {
            listOrder: tempList[i].order,
            lessOrder: resLesson.data().order,
            id: resLesson.id,
            imageUrl: refsURL + resLesson.id,
          };
          tempLesson.push(newData);
        })

      }

      tempLesson.sort((a, b) => a.listOrder - b.listOrder || a.lessOrder - b.lessOrder);

      return tempLesson;

    };

    return { grammar };

}

export default { lesson };