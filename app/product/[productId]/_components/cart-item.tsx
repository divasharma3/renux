import { PRODUCT_CATEGORIES } from "@/config";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format";
import { Product } from "@/payload-types";
import { ImageIcon, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();
  const { image } = data.images[0];

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === data.category
  )?.label;

  return (
    <div>
      <li className="flex py-4">
        <div className="relative h-24 w-24 rounded-md overflow-hidden">
          {typeof image !== "string" && image.url ? (
            <Image
              src={image.url}
              alt=""
              width={150}
              height={200}
              className="rounded-md object-cover object-center"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-secondary">
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="relative ml-4 flex-col flex sm:ml-6">
          <div className="absolute md:right-0 right-0 top-0">
            <button
              onClick={() => cart.removeItem(data.id)}
              className="absolute hover:bg-slate-200 rounded-md p-2"
            >
              <Trash className="h-5 w-5 text-red-600" />
            </button>
          </div>
          <div className=" pr-9 sm:grid sm:mr-16 sm:gap-x-6 sm:pr-0">
            <div>
              <Link href={`/product/${data.id}`} target="_blank">
                <div className="flex justify-between">
                  <p className=" md:text-lg cursor-pointer hover:underline hover:decoration-blue-600 hover:decoration-2 text-ellipsis inline-grid overflow-hidden text-xs font-semibold">
                    {data.name}
                  </p>
                </div>

                <div className="flex items-center">
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              </Link>
              <span className="mr-14 font-semibold text-black text-sm">
                {formatPrice(data.price)}
              </span>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
};

export default CartItem;
