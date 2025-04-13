"use client";

import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "sonner";

export default function HeaderClient() {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (!isSignedIn || !user) return;

    const isUserSynced = localStorage.getItem("UserSynced");
    if (isUserSynced === user.id) return;

    const syncUser = async () => {
      try {
        const res = await axios.post("/api/auth/sync");
        if (res.status === 200) {
          localStorage.setItem("UserSynced", user.id);
          toast.success("User synced to DB");
        } else {
          toast.error("Failed to sync user to DB");
        }
      } catch (err) {
        toast.error("Failed to sync user to DB");
        console.error(err);
      }
    };

    syncUser();
  }, [isSignedIn, user]);

  return (
    <>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}
