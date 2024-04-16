import { Button } from "@/components/ui/button";
import Link from "next/link";
import NotFoundItem from "./not-found-item";

import { SheetClose } from "@/components/ui/sheet";

export const EmptyCart = () => {
  return (
    <div className="w-full flex-1 h-[26rem]">
      <div className="flex flex-col items-center justify-center">
        <NotFoundItem title={<>No items found in this cart...</>} />
        <Button className="mt-3">
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
};
