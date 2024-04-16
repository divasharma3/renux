"use client";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { Loader, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const VerificationEmail = ({
  token
}: {
  token: string
}) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (isError) {
    return (
      <div className="flex flex-col justify-center text-center max-w-80 items-center font-medium p-2 border text-red-700 border-red-500 bg-red-800/35 rounded-sm">
        <XCircle className="h-6 w-6" />
        <h3 className="font-semibold text-xl">There was a problem</h3>
        <p>This token is not vaild or might be expired. Please try again.</p>
      </div>
    );
  }

  if (data?.success) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          <Image src="/mail-sent.svg" alt="img" fill />
        </div>
        <h3 className="font-semibold text-center text-2xl">
          Verification done and you&apos;re all set!
        </h3>
        <p className="text-muted-foreground text-center">
          Thank you for verifying your email
        </p>
        <Button className="w-32 mt-3">
          <Link href="/sign-in">Sign In</Link>
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <Loader className="h-8 w-8 animate-spin text-slate-500" />
        <h3 className="font-semibold text-xl">
          Verifying your email, please wait
        </h3>
        <p>This won&apos;t to couple of minutes.</p>
      </div>
    );
  }
};
