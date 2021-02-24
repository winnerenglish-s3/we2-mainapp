import { db } from "src/router";

const practice = (level) => {
  const practiceList = async () => {
    try {
      let getPractice = await db
        .collection("practiceList")
        .where("level", "==", level)
        .where("status", "==", true)
        .get();

      let temp = [];

      const convertPracticeTypeToThai = (type) => {
        let result;
        if (type == "flashcard") {
          result = "การ์ดคำศัพท์";
        } else if (type == "grammaraction") {
          result = "ถามตอบ";
        } else if (type == "grammarlesson") {
          result = "ไวยากรณ์";
        } else if (type.includes("multiple")) {
          result = "เลือกคำตอบ";
        } else if (type == "phonicslesson") {
          result = "การออกเสียง";
        } else if (type == "translation") {
          result = "แต่งประโยค";
        } else if (type == "languagetips") {
          result = "เคล็ดลับภาษา";
        } else if (type == "matching") {
          result = "จับคู่";
        } else if (type == "clozetest") {
          result = "เนื้องเรื่องเติมคำ";
        } else {
          result = type;
        }

        return result;
      };

      getPractice.forEach((res) => {
        temp.push({
          practiceListId: res.id,
          ...res.data(),
          practiceTypeThai: convertPracticeTypeToThai(res.data().practiceType),
        });
      });

      return temp;
    } catch (error) {
      return error;
    }
  };

  const practiceName = async () => {
    try {
      let getPractice = await db
        .collection("practiceListName")
        .where("level", "==", level)
        .get();

      let temp = [];

      getPractice.forEach((res) => {
        temp.push(res.data());
      });

      return temp;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  // Get Practice Log
  const log = async (uid) => {
    const getPracticeList = await practiceList();

    let practiceLog = await db
      .collection("practiceLog")
      .where("studentId", "==", uid)
      .get();

    let getPracticeData = (practiceListId) => {
      let result = getPracticeList.filter(
        (x) => x.practiceListId == practiceListId
      );
      return result.length ? result[0] : {};
    };

    let temp = [];
    practiceLog.forEach((element) => {
      temp.push({
        ...element.data(),
        level: getPracticeData(element.data().practiceListId).level,
        unit: getPracticeData(element.data().practiceListId).unit,
        skill: getPracticeData(element.data().practiceListId).skill,
      });
    });
    return temp;
  };

  return { practiceList, practiceName, log };
};

const level = async () => {
  try {
    let getLevel = await db.collection("level").get();
    let temp = [];
    getLevel.forEach((element) => {
      temp.push({
        id: element.id,
        ...element.data(),
      });
    });
    return temp;
  } catch (error) {
    console.log(error);
    return;
  }
};

export default { practice, level };
