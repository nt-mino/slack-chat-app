import { db } from ".";
import { InsertUser } from "./helper";
import { users } from "./schema";

const seed = async () => {
  try {
    const newUser: InsertUser = {
      email: "m.noto@funda.jp",
      name: "みのる",
    };

    const user = await db.insert(users).values(newUser);
    console.log(user);

    console.log("success!!");
  } catch (error) {
    console.log(error);
  }
};

seed();
