"use client";

import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import { useCart } from "@/hooks/use-cart";
import { trpc } from "@/trpc/client";
import { Loader } from "lucide-react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const ProductSummary = () => {
  const items = useCart((state) => state.items);
  const searchParams = useSearchParams();
  const router = useRouter();
  const removedAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed");
      removedAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Payment failed, Please try again");
      redirect("/cart");
    }
  }, [searchParams, removedAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const productIds = items.map(({ id }) => id);

  const { mutate: createCheckoutSession, isLoading } =
    trpc.payment.createSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) {
          router.push(url);
        }
      },
    });

  return (
    <div className="mt-16 rounded-lg bg-slate-200 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium">Order Summary</h2>
      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-300 pt-3 pb-2">
          {/* TODO: Add Choosing payment method */}
          <div className="text-base font-medium">Total Payment</div>
          <Currency value={totalPrice} />
        </div>
        <div className="flex items-center justify-between border-b border-slate-300 py-3">
          <div className="text-base font-medium">Product Cost</div>
          <span className="text-base font-medium">$0.6</span>
        </div>
      </div>
      <Button
        className="w-full mt-6"
        onClick={() => {
          createCheckoutSession({ productIds });
        }}
        disabled={items.length === 0 || isLoading}
      >
        {isLoading ? (
          <>
            <Loader className="h-4 w-4 animate-spin mr-2" />
            <p>Processing payment</p>
          </>
        ) : (
          "Check out with Stripe"
        )}
      </Button>
    </div>
  );
};

export default ProductSummary;
