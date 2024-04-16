import Image from "next/image";
import React from "react";
import { VerificationEmail } from "./_components/verify-email";

interface VerifyEmailProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const VerifyEmail = ({ searchParams }: VerifyEmailProps) => {
  const token = searchParams.token;
  const toEmail = searchParams.to;

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex flex-col justify-center space-y-6 w-[350px]">
        {token && typeof token === "string" ? (
          <div className="grid gap-6">
            <VerificationEmail token={token} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
              <Image src="/mail-sent.svg" alt="" fill />
            </div>
            <h3 className="font-semibold text-2xl">Please check your email</h3>
            {toEmail ? (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a email verification link to{" "}
                <span className="font-semibold">{toEmail}</span>.
              </p>
            ) : (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a email verification link to your email
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
