import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ProductInstaReel } from "@/components/product-insta-reel";
import { PRODUCT_CATEGORIES } from "@/config";
import { getPayloadClient } from "@/get-payload";
import { formatPrice } from "@/lib/utils";
import { CheckCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "./_components/add-to-cart-button";
import { ImageSlider } from "./_components/image-slider";

interface ProductIdPageProps {
  params: {
    productId: string;
  };
}

const ProductIdPage = async ({ params }: ProductIdPageProps) => {
  const payload = await getPayloadClient();

  const { docs: products } = await payload.find({
    collection: "products",
    limit: 1,
    where: {
      id: {
        equals: params.productId,
      },
      approvedForSale: {
        equals: "approved",
      },
    },
  });

  const [product] = products;

  if (!product) {
    return notFound();
  }

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  const validUrls = product.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  const BreadCrumbs = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Product", href: "/products" },
    { id: 3, name: `${product.name}`, href: `${params.productId}` },
  ];

  return (
    <MaxWidthWrapper>
      <div className="mx-auto max-w-2xl lg:px-4 lg:py-14 md:py-24 px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8">
        {/* Product Det */}
        <div className="lg:max-w-lg lg:self-end">
          <ol className="flex items-center space-x-2">
            {BreadCrumbs.map((breadcrumb, i) => (
              <li key={breadcrumb.href}>
                <div className="flex items-center text-sm">
                  <Link
                    href={breadcrumb.href}
                    className="font-medium text-sm text-muted-foreground hover:text-black"
                  >
                    {breadcrumb.name}
                  </Link>
                  {i !== BreadCrumbs.length - 1 && (
                    <span className="text-muted-foreground ml-2">/</span>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-4">
            <h1 className="lg:text-3xl font-bold tracking-tight text-gray-900 text-4xl">
              {product.name}
            </h1>
          </div>

          <section className="mt-4">
            <div className="flex items-center">
              <p className="font-medium">{formatPrice(product.price)}</p>
              <p className="font-medium ml-4 border-l text-muted-foreground border-gray-300 pl-4">
                {label}
              </p>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-muted-foreground">
                {product.description}
              </p>
            </div>

            <div className="mt-6 flex items-center">
              <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500 mr-2" />
              <p className="text-sm text-muted-foreground">
                Eligible for instant delivery
              </p>
            </div>
          </section>
        </div>
        {/* Product Image */}
        <div className="mt-10 lg:col-start-2 lg:row-start-2 lg:-mt-[206px] lg:-ml-8 lg:self-center">
          <div className="aspect-square rounded-lg">
            <ImageSlider urls={validUrls} />
          </div>
        </div>
        <div className="mt-6 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <div>
            <div className="mt-10">
              <AddToCartButton data={product}/>
            </div>
            <div className="mt-6 lg:text-left text-center">
              <div className="group inline-flex text-sm font-medium">
                <ShieldCheck className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400" />
                <span className="text-sm text-muted-foreground capitalize">
                  30 day return guarante
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:ml-4">
        <ProductInstaReel
          href="/products"
          query={{ category: product.category, limit: 4 }}
          title={`Similar ${label}`}
          subtitle={`Browse similar high-quality ${label} just like '${product.name}'`}
        />
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductIdPage;
