"use client";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PaymentStatusProps {
  orderEmail: string;
  orderId: string;
  isPaid: boolean;
}

export const PaymentStatus = ({
  orderEmail,
  orderId,
  isPaid,
}: PaymentStatusProps) => {
  const router = useRouter();

  const { data } = trpc.payment.peddingOrderStatus.useQuery(
    { orderId },
    {
      enabled: isPaid === false,
      refetchInterval: (data) => (data?.isPaid ? false : 1000),
    }
  );

  useEffect(() => {
    if (data?.isPaid) {
      router.refresh();
    }
  }, [data?.isPaid, router]);

  return (
    <div className="mt-4 grid lg:grid-cols-2 grid-cols-1 gap-x-4 text-black">
      <div>
        <h1 className="font-medium">Ordered by</h1>
        <p>{orderEmail}</p>
      </div>
      <div className="lg:mt-0 mt-3">
        <h1 className="font-medium">Payment Status:</h1>
        <p>{isPaid ? "Payment successful" : "Pending payment"}</p>
      </div>
    </div>
  );
};
