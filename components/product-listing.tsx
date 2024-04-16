"use client";

import { Product } from "@/payload-types";
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import { PRODUCT_CATEGORIES } from "@/config";
import { ImageSlider } from "./image-slider";

interface ProductListingProps {
  product: Product | null;
  index: number;
}

export const ProductListing = ({ product, index }: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => {
      clearTimeout(timer);
    };
  }, [index]);

  if (!product || !isVisible) {
    return <ProductPlaceholder />;
  }

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  const validUrls = product.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  if (isVisible && product) {
    return (
      <Link
        className={cn(
          "invisible h-full w-full cursor-pointer group/main",
          isVisible && "visible animate-in fade-in-5"
        )}
        href={`/product/${product.id}`}
      >
        <div className="flex group flex-col w-full">
          <ImageSlider urls={validUrls} />
          <h3 className="mt-4 font-medium group-hover:text-blue-600 transition">{product.name}</h3>
          <div className="flex items-center w-80">
            <p className="mt-1 text-sm text-slate-400">{label}</p>
            <p className="mt-1 text-sm font-medium lg:ml-48 ml-24">
              {formatPrice(product.price)}
            </p>
          </div>
        </div>
      </Link>
    );
  }
};

const ProductPlaceholder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-slate-300 aspect-video w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-4 w-2/3 h-4 bg-slate-300 rounded-lg" />
      <Skeleton className="mt-2 w-16 h-4 bg-slate-300 rounded-lg" />
      <Skeleton className="mt-4 w-12 h-4 bg-slate-300 rounded-lg" />
    </div>
  );
};
