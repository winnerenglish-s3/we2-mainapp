import { db } from "src/router";

const student = () => {
  let uid = sessionStorage.getItem("uid").split("|")[1];

  const course = async () => {
    let getCourse = await db
      .collection("course")
      .where("studentId", "==", uid)
      .get();

    let temp = [];

    getCourse.forEach((element) => {
      temp.push({ ...element.data(), courseId: element.id });
    });
    temp.sort((a, b) => a.timestamp.seconds - b.timestamp.seconds);
    return temp;
  };

  return { course };
};

export default { student };
