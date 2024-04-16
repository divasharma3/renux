import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PRODUCT_CATEGORIES } from "@/config";
import { getPayloadClient } from "@/get-payload";
import { getServerSideUser } from "@/lib/payload-utils";
import { cn, formatPrice } from "@/lib/utils";
import { Product, ProductFile, User } from "@/payload-types";
import { Download } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PaymentStatus } from "./_components/payment-status";

const ThankYouPage = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const orderId = searchParams.orderId;
  const nextCookies = cookies();

  const { user } = await getServerSideUser(nextCookies);
  const payload = await getPayloadClient();

  const { docs: orders } = await payload.find({
    collection: "orders",
    depth: 2,
    where: {
      id: {
        equals: orderId,
      },
    },
  });

  const [order] = orders;

  if (!order) {
    return notFound();
  }

  const orderUserId =
    typeof order.user === "string" ? order.user : order.user.id;

  if (orderUserId !== user?.id) {
    return redirect(`/sign-in?origin=thank-you?orderId=${order.id}`);
  }

  const productCost = 3;

  const products = order.products as Product[];

  const totalPrice = products.reduce((total, product) => {
    return total + Number(product.price);
  }, 0);

  return (
    <main className="relative lg:min-h-full">
      <div className="absolute lg:h-full xl:h-[90vh] xl:mt-14 lg:w-1/2 lg:pr-4 xl:pr-12 hidden lg:block">
        <Image
          src="/successful-purchase.svg"
          alt=""
          fill
          className="object-cover object-center"
        />
      </div>
      <div>
        <div className="mx-auto max-w-2xl px-4 pt-16 pb-4 sm:px-6 sm:pt-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:pt-20 xl:gap-x-24">
          <div className="lg:col-start-2">
            {order._isPaid ? (
              <>
                <div className="flex items-center text-blue-600">
                  <Image
                    src="/shopping-cart.svg"
                    alt=""
                    height={40}
                    width={40}
                  />
                  <p className="font-medium ml-2">Order successful</p>
                </div>
                <p className="mt-2 text-base text-muted-foreground">
                  Your order are still in processing please wait for few minutes
                  and your assets are available when your order are processed
                  successful then we&apos;ve sent your receipt and order details
                  to
                  <br />
                  {typeof order.user !== "string" && (
                    <span className="font-medium">{order.user.email}</span>
                  )}
                </p>
              </>
            ) : (
              <>
                <p className="mt-2 text-base text-muted-foreground">
                  <div className="flex items-center text-yellow-600">
                    <Image
                      src="/order-pendding.svg"
                      alt=""
                      height={40}
                      width={40}
                    />
                    <p className="font-medium ml-2">Order is pendding</p>
                  </div>
                  We appreciate your order, and we&apos;re currently processing
                  it. So hang tight and we&apos;ll send you confirmation very
                  soon!
                </p>
              </>
            )}

            <div className="my-6">
              <PaymentStatus
                orderEmail={(order.user as User).email}
                isPaid={order._isPaid}
                orderId={order.id}
              />
            </div>

            <div className="text-sm font-medium">
              <h1 className="text-lg text-muted-foreground">Order no</h1>
              <p>{order.id}</p>
              <Separator className="mt-3" />
              <ul className="font-medium text-muted-foreground">
                {(order.products as Product[]).map((prod) => {
                  const label = PRODUCT_CATEGORIES.find(
                    ({ value }) => value === prod.category
                  )?.label;

                  const downloadUrl = (prod.product_files as ProductFile)
                    .url as string;

                  const { image } = prod.images[0];

                  return (
                    <li className="flex sapce-x-6 py-4" key={prod.id}>
                      <div className="relative h-24 w-24">
                        {typeof image !== "string" && image.url && (
                          <Image
                            src={image.url}
                            alt=""
                            fill
                            className="flex-none rounded-md bg-gray-100 object-cover object-center"
                          />
                        )}
                      </div>
                      <div className="flex-auto flex justify-between ml-4">
                        <div className="space-y-1">
                          <h2>{prod.name}</h2>
                          <p className="my-2">Category: {label}</p>
                          {order._isPaid && (
                            <a
                              href={downloadUrl}
                              download={prod.name}
                              className={cn(
                                buttonVariants({ variant: "link" }),
                                "inline-flex items-center"
                              )}
                            >
                              <Download className="h-5 w-5 mr-2" />
                              Download
                            </a>
                          )}
                        </div>
                        <p className="flex-none font-medium">
                          {formatPrice(prod.price)}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <Separator className="mt-3" />
              <div className="space-y-4 pt-4 font-medium text-muted-foreground">
                <div className="flex items-center justify-between">
                  <h1 className="text-black">Subtotal</h1>
                  <p>{formatPrice(totalPrice)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <h1 className="text-black">Product cost</h1>
                  <p>{formatPrice(productCost)}</p>
                </div>
                <Separator className="mt-3" />
                <div className="flex items-center justify-between text-black">
                  <h1>Total Price</h1>
                  <p>{formatPrice(totalPrice + productCost)}</p>
                </div>
              </div>
              <Separator className="mt-3" />
              <div className="pt-[0.2rem] text-right">
                <Link href="/" className="text-blue-600 hover:underline">
                  Contiune shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ThankYouPage;
