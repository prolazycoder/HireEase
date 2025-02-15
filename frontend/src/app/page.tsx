"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome to HireEase
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to continue
          </p>
        </div>
        <Button
          fullWidth
          variant="contained"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="bg-blue-600 hover:bg-blue-700 normal-case"
          startIcon={
            <Image
              src="/google.svg"
              alt="Google"
              width={20}
              height={20}
              className="mr-2"
            />
          }
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
