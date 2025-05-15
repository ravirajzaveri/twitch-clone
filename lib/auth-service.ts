import { currentUser } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const getSelf = async () => {
  const self = await currentUser();

if (!self) {
  throw new Error("Unauthorized");
}

const fallbackUsername =
  self.username ??
  self.firstName ??
  self.lastName ??
  "user_" + Math.random().toString(36).substring(2, 6);

  const user = await db.user.findUnique({
    where: {
      externalUserId: self.id,
    },
  });

  if (!user) {
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
