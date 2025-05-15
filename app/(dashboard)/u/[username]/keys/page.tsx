import React from "react";
import { redirect } from "next/navigation";

import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";

import { URLCard } from "./_components/url-card";
import { KeyCard } from "./_components/key-card";
import { ConnectModal } from "./_components/connect-modal";

export default async function KeysPage() {
  let self;
  let stream;

  try {
    self = await getSelf();
    stream = await getStreamByUserId(self.id);
  } catch {
    redirect("/sign-in"); // not signed in
  }

  if (!stream) {
    redirect("/u/" + self.username); // no stream yet, back to dashboard
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <URLCard value={stream.serverUrl} />
        <KeyCard value={stream.streamKey} />
      </div>
    </div>
  );
}
