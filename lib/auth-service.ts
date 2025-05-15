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
export const getSelfByUsername = async (username: string) => {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (self.username !== username) {
    throw new Error("Unauthorized");
  }

  return user;
};
