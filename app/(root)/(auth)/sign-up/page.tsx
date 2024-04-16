"use client";

import { Icon } from "@/app/(root)/_components/_sidebar-components/icon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getError } from "@/lib/get-error-message";
import { cn } from "@/lib/utils";
import {
  AuthCredentialsValidator,
  AuthCredentialsValidatorType,
} from "@/schema";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const SignUpPage = () => {
  const router = useRouter();
  const [isShow, setIsShow] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthCredentialsValidatorType>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
    onError: (error) => {
      if (error.data?.code === "CONFLICT") {
        toast.error(
          "This email is already been in use. Please try with another email"
        );
        return;
      }

      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message);
        return;
      }

      toast.error("Something went wrong. Please try again");
    },

    onSuccess: ({ sentToEmail }) => {
      toast.info(`Verification email sent to ${sentToEmail}.`);
      router.push("/verify-email?to=" + sentToEmail);
    },
  });

  const onSubmit = async ({
    email,
    password,
  }: AuthCredentialsValidatorType) => {
    mutate({ email, password });
  };

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex lg:w-full w-[350px] flex-col justify-center space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <Icon />
          <h1 className="text-2xl font-semibold">Create an account</h1>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-2">
                <Label>Email</Label>
                <Input
                  className={cn("w-72 my-2", {
                    "focus-visible:ring-red-600": errors.email,
                  })}
                  placeholder="user@example.com"
                  {...register("email")}
                />
                {errors && (
                  <>
                    <p className="font-semibold text-sm text-red-600">
                      {errors.email?.message}
                    </p>
                  </>
                )}
              </div>
              <div>
                <Label>Password</Label>
                <div className="relative flex items-center">
                  <Input
                    type={isShow ? "text" : "password"}
                    className={cn("w-72 mt-2", {
                      "focus-visible:ring-red-600": errors.password,
                    })}
                    placeholder="Password"
                    {...register("password")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground absolute top-2.5 right-2 cursor-pointer hover:opacity-75 transition"
                    onClick={() => setIsShow(!isShow)}
                  >
                    {isShow ? (
                      <Eye className="h-5 w-5" />
                    ) : (
                      <EyeOff className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                {errors && (
                  <>
                    <p className="font-semibold text-sm mt-2 text-red-600">
                      {errors.password?.message}
                    </p>
                  </>
                )}
              </div>
              <div className="flex items-center mt-5">
                <Button className="w-full" type="submit">
                  Sign Up
                </Button>
              </div>
            </form>
          </div>
          <div className="flex items-center">
            <p className="text-muted-foreground">Already have a account?</p>
            <Link
              href="/sign-in"
              className="text-blue-600 ml-2 text-base flex items-center"
            >
              Sign In
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
