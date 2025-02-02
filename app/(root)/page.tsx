import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ProductInstaReel } from "@/components/product-insta-reel";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Leaf, Package } from "lucide-react";
import {} from "next";
import Link from "next/link";
import { TbTruckDelivery } from "react-icons/tb";

const perks = [
  {
    name: "Instant Delivery",
    Icon: TbTruckDelivery,
    description:
      "Get your assets delivered to your email in seconds and download them right away.",
  },
  {
    name: "Guaranteed Quality",
    Icon: CheckCircle,
    description:
      "Every asset on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-day refund guarantee.",
  },
  {
    name: "For the Planet",
    Icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
];

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="lg:text-4xl text-5xl font-semibold tracking-tight">
            Your marketplace for high-quality{" "}
            <span className="text-blue-600">digital assets.</span>
          </h1>
          <p className="mt-6 lg:mx-0 mx-2 text-lg max-w-prose text-muted-foreground">
            Welcome to Renux. Every asset on our platform is verified by our
            team to ensure our highest quality standards.
          </p>
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mt-6">
            <Button className="px-3">
              <Link href="/products" className="flex items-center">
                View Trending
              </Link>
            </Button>
          </div>
        </div>
        <ProductInstaReel
          query={{ sort: "desc" }}
          title="New Items"
          href="/products"
        />
      </MaxWidthWrapper>
      <Separator />
      <section className="bg-blue-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-200 text-blue-700">
                    {<perk.Icon className="w-8 h-8" />}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 lg:mx-0 mx-5 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
