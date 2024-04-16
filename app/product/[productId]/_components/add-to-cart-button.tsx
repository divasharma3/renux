"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/payload-types";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

interface AddToCartButtonProps {
  data: Product;
}

export const AddToCartButton = ({ 
  data
}: AddToCartButtonProps) => {
  const {addItem} = useCart();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [isLoading]);

  return (
    <Button
      size="lg"
      disabled={isLoading}
      className="lg:w-64 flex items-center w-full"
      onClick={() => {
        setIsLoading(true);
        addItem(data);
      }}
    >
      {isLoading ? (
        <>
          <Loader className="h-4 w-4 animate-spin mr-2" />
          <p>Loading</p>
        </>
      ) : (
        "Add To Cart"
      )}
    </Button>
  );
};
