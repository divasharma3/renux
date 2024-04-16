"use client";

import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { EmptyCart } from "./empty-cart";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import CartItem from "@/app/product/[productId]/_components/cart-item";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Cart = () => {
  const { items } = useCart();
  const itemsCount = items.length;
  const [isMounted, setIsMounted] = useState(false);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <Sheet>
        <SheetTrigger className="flex items-center">
          <ShoppingCart className="flex-shrink-0 items-center" />
          <span className="text-sm mb-4 font-medium text-white px-2 bg-red-600 rounded-full">
            {isMounted ? items.length : 0}
          </span>
        </SheetTrigger>
        <SheetContent side="right" className="flex lg:w-full flex-col max-w-lg">
          <SheetHeader>
            <SheetTitle className="mr-auto">
              Cart
              <span className="ml-2 text-sm mb-4 font-medium text-white px-2 bg-red-600 rounded-full">
                {isMounted ? items.length : 0}
              </span>
            </SheetTitle>
            {itemsCount > 0 ? (
              <>
                <ScrollArea className="lg:h-[28rem] h-[40rem]">
                  {items.map((product) => (
                    <CartItem data={product} key={product.id} />
                  ))}
                </ScrollArea>
                <div className="space-y-4 pr-6">
                  <Separator className="my-2" />
                  <div className="space-y-1.5 text-sm">
                    <div className="flex font-semibold text-base">
                      <span className="flex-1 mr-32">Total fee</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                  </div>

                  <SheetFooter>
                    <SheetTrigger>
                      <Button className="lg:w-[21rem] w-full">
                        <Link href="/cart">Process to checkout</Link>
                      </Button>
                    </SheetTrigger>
                  </SheetFooter>
                </div>
              </>
            ) : (
              <>
                <SheetDescription>
                  Your all cart items are showing here
                </SheetDescription>
                <div className="flex w-full flex-col pr-6">
                  <EmptyCart />
                </div>
              </>
            )}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};
