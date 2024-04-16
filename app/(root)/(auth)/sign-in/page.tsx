"use client";

import { Icon } from "@/app/(root)/_components/_sidebar-components/icon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  AuthCredentialsValidator,
  AuthCredentialsValidatorType,
} from "@/schema";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignUpPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSeller = searchParams.get("as") === "seller";
  const origin = searchParams.get("origin");
  const [isShow, setIsShow] = useState(false);

  const continueAsSeller = () => {
    router.push("?as=seller");
  };

  const continueAsBuyer = () => {
    router.replace("/sign-in", undefined);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthCredentialsValidatorType>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: () => {
      toast.success("Signed In");
      
      if (origin) {
        router.push(`/${origin}`);
      }
      
      if (isSeller) {
        router.push("/sell");
        return;
      }
      
      router.push("/");
      router.refresh();
    },

    onError: (error) => {
      if (error.data?.code === "UNAUTHORIZED") {
        toast.error("The email or password provided is incorrect.");
      }
    },
  });

  const onSubmit = async ({
    email,
    password,
  }: AuthCredentialsValidatorType) => {
    signIn({ email, password });
  };

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex lg:w-full w-[350px] flex-col justify-center space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <Icon />
          <h1 className="text-2xl font-semibold">
            Sign In to your {isSeller && "seller"} account
          </h1>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-2">
                <Label>Email</Label>
                <Input
                  disabled={isLoading}
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
                    disabled={isLoading}
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
                <Button disabled={isLoading} className="w-full" type="submit">
                  Sign In
                </Button>
              </div>
            </form>
          </div>
          <div className="flex items-center mb-3">
            <p className="text-muted-foreground">Don&apos;t have a account?</p>
            <Link
              href="/sign-up"
              className="text-blue-600 ml-2 text-base flex items-center"
            >
              Sign Up
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-slate-400 border-t" />
            </div>
            <div className="relative flex justify-center uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>

          {isSeller ? (
            <Button
              onClick={continueAsBuyer}
              disabled={isLoading}
              className="w-72"
              variant="outline"
            >
              Continue as Customer
            </Button>
          ) : (
            <Button
              onClick={continueAsSeller}
              disabled={isLoading}
              className="w-72"
              variant="outline"
            >
              Continue as Seller
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
