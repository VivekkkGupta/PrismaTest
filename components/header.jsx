"use client"

import Link from "next/link"
import { use, useCallback, useEffect, useState } from "react"
import { LogIn, LogOut, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import { toast } from "sonner"

export default function Header() {

  const { isSignedIn, user } = useUser();

  const syncUser = useCallback(async () => {
    if (!isSignedIn || !user) return;

    const isUserSynced = localStorage.getItem("UserSynced")

    if (isUserSynced === user.id) return;

    try {
      const res = await axios.post("/api/auth/sync");
      if(res.status !== 200){
        console.log(res)
        toast.error("Failed to sync user to DB");
        return;
      } 
      localStorage.setItem("UserSynced", user.id);
      toast.success("User synced to DB");
    } catch (err) {
      console.error(err);
      toast.error("Failed to sync user to DB");
    }
  }, [isSignedIn, user]);

  useEffect(() => {
    syncUser();
  }, [syncUser]);


  return (
    <header className="sticky top-0 z-40 w-full border-b ">
      <div className="container flex h-16 items-center justify-between py-4 px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <h1 className="text-xl font-bold tracking-tight text-primary">Todo App</h1>
          </Link>
        </div>


        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>


        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle auth menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {isLoggedIn ? (
              <DropdownMenuItem onClick={handleAuth}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={handleAuth}>
                <LogIn className="mr-2 h-4 w-4" />
                <span>Sign in</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </header>
  );
}
