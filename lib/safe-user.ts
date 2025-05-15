import { redirect } from "next/navigation";
import { getSelf } from "@/lib/auth-service";

export const getSafeSelf = async () => {
  try {
    const self = await getSelf();
    return self;
  } catch {
    redirect("/sign-in");
  }
};
