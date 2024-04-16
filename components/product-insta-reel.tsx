"use client";

import { Product } from "@/payload-types";
import { QueryValidatorType } from "@/schema/query-validator";
import { trpc } from "@/trpc/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProductListing } from "./product-listing";
import { ActionHint } from "./action-hint";

interface ProductInstaReelProps {
  title: string;
  price?: string;
  subtitle?: string;
  href?: string;
  query: QueryValidatorType;
}

export const ProductInstaReel = (props: ProductInstaReelProps) => {
  const { title, subtitle, href, query } = props;

  const FALLBACK_LIMIT = 5;

  const { data: QueryResults, isLoading } =
    trpc.getInfiniteProducts.useInfiniteQuery(
      {
        limit: query.limit ?? FALLBACK_LIMIT,
        query,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  const products = QueryResults?.pages.flatMap((page) => page.items);

  let map: (Product | null)[] = [];
  if (products && products.length) {
    map = products;
  } else if (isLoading) {
    map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
  }

  return (
    <section className="py-12">
      <div className="flex items-center lg:mr-0 mr-4 justify-between mb-4">
        <div className="max-w-2xl px-2 lg:max-w-4xl lg:px-0">
          {title && (
            <>
              <h1 className="lg:text-2xl text-3xl font-bold">{title}</h1>
            </>
          )}
          {subtitle && (
            <>
              <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
            </>
          )}
        </div>

        {href && (
          <Link
            href={href}
            className="flex hover:underline text-blue-500 hover:text-blue-600 items-center"
          >
            <p className="lg:block hidden">View More</p>
            <ActionHint
              description="View More"
              side="right"
              sideOffset={10}
              className="lg:hidden block"
            >
              <ArrowRight className="h-5 w-5 ml-1" />
            </ActionHint>
          </Link>
        )}
      </div>

      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 lg:ml-0 ml-2 md:grid-cols-4 lg:gap-x-8">
            {map.map((product, i) => (
              <ProductListing 
               product={product} 
               key={i} 
               index={i} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
