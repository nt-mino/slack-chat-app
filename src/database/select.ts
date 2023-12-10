import { db } from ".";
import { users } from "./schema";

const select = async () => {
  try {
    // 全ユーザー情報
    const allUsers = await db.select().from(users);
    console.log(allUsers);
  } catch (error) {
    console.log(error);
  }
};
select();
