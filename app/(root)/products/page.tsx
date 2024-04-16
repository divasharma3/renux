import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ProductInstaReel } from "@/components/product-insta-reel";
import { PRODUCT_CATEGORIES } from "@/config";
import React from "react";

type Param = string | string[] | undefined;

interface ProductsPagePros {
  searchParams: {
    [key: string]: Param;
  };
}

const parse = (param: Param) => {
  return typeof param === "string" ? param : undefined;
};

const ProductsPage = ({ searchParams }: ProductsPagePros) => {
  const sort = parse(searchParams.sort);
  const category = parse(searchParams.category);

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === category
  )?.label;

  return (
    <MaxWidthWrapper>
      <ProductInstaReel
        title={label ?? ""}
        query={{
          category,
          limit: 50,
          sort: sort === "desc" || sort === "asc" ? sort : undefined,
        }}
      />
    </MaxWidthWrapper>
  );
};

export default ProductsPage;
