import { db,auth } from "src/router";

const student =  (uid) => {
 
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
