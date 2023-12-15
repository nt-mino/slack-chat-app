import { UserButton, SignedOut, SignedIn, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Page({}) {
  return (
    <div>
      <h1>トップページ</h1>
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton />
      </SignedOut>
    </div>
  );
}
