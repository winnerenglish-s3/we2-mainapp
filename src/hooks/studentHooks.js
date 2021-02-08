import { db } from "src/router";

const student = () => {
  let uid = sessionStorage.getItem("uid").split("|")[1];

  const course = async () => {
    let getCourse = await db
      .collection("course")
      .where("studentId", "==", uid)
      .get();

    return getCourse.docs[0].data();
  };

  return { course };
};

export default { student };
