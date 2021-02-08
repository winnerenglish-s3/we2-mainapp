import { db } from "src/router";

const practice = (level) => {
  const practiceList = async () => {
    let getPractice = await db
      .collection("practiceList")
      .where("level", "==", level)
      .get();

    let temp = [];

    getPractice.forEach((res) => {
      temp.push({ practiceListId: res.id, ...res.data() });
    });

    return temp;
  };

  const practiceName = async () => {
    let getPractice = await db
      .collection("practiceListName")
      .where("level", "==", level)
      .get();

    let temp = [];

    getPractice.forEach((res) => {
      temp.push(res.data());
    });

    return temp;
  };

  return { practiceList, practiceName };
};

export default { practice };
