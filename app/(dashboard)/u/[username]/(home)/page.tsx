import React from "react";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getUserByUsername } from "@/lib/user-service";
import { StreamPlayer } from "@/components/stream-player";

export default async function CreatorPage({
  params: { username },
}: {
  params: { username: string };
}) {
  const externalUser = await currentUser();
  const user = await getUserByUsername(username);

if (!externalUser || !user || user.externalUserId !== externalUser.id || !user.stream) {
  redirect("/sign-in");
}

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing={true} />
    </div>
  );
}
