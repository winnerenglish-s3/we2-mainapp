import axios from "src/boot/axios";
import { db, auth } from "src/router";

const practice = (level) => {
  // GET PRACTICE LIST FROM LEVEL
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

  // GET PRACTICE NAME
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
  const log = async () => {
    const getPracticeList = await practiceList();
    const uid = firebase.auth().currentUser.uid
    const getCourseId = await db.collection("student")
      .doc(uid)
      .get()
    const courseId = getCourseId.data().currentCourseId
    let practiceLog = await db
      .collection("practiceLog")
      .where("courseId", "==", courseId)
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

// Get All Level
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

// GET PRACTICE INFOMATION
const practiceListInfo = async (practiceListId) => {
  let response = await db.collection("practiceList").doc(practiceListId).get();
  let result = response.data();
  return result;
};

const getCourseId = async (uid) => {
  const getCourseId = await db.collection("student").doc(uid).get();
  const courseId = getCourseId.data().currentCourseId;
  return courseId;
};

const checkPracticePermission = async (courseId, practiceListId) => {
  const response = await db
    .collection("practiceLog")
    .where("courseId", "==", courseId)
    .where("practiceListId", "==", practiceListId)
    .get();

  // console.log(response.docs[0].data());

  if (response.size) {
    console.log(response.docs[0].data());
    if (response.docs[0].data().counter >= 2) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
};

export default {
  practice,
  level,
  practiceListInfo,
  checkPracticePermission,
  getCourseId,
};
