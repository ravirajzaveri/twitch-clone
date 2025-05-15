import { currentUser } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const getSelf = async () => {
  const self = await currentUser();

  console.log("🔍 Clerk currentUser:", self);

  if (!self) {
    console.log("❌ currentUser returned null. No session?");
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      externalUserId: self.id,
    },
  });

  console.log("🧑‍💻 User from DB:", user);

  if (!user) {
    console.log("❌ No user found in DB for Clerk ID:", self.id);
    throw new Error("Not found");
  }

  return user;
};
