import Currency from "@/components/ui/currency";
import { PRODUCT_CATEGORIES } from "@/config";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/payload-types";
import { ImageIcon, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { MouseEventHandler } from "react";

interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();
  const { image } = data.images[0];

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === data.category
  )?.label;

  const onItemRemove: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.removeItem(data.id);
  };

  return (
    <div>
      <li className="flex py-6 border-b lg:border-r">
        <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
          {typeof image !== "string" && image.url ? (
            <Image
              src={image.url}
              alt=""
              width={150}
              height={200}
              className="rounded-md object-cover overflow-hidden object-center"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-secondary">
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="relative ml-4 flex-col flex sm:-ml-6">
          <div className="absolute md:right-0 lg:left-[30rem] left-52 top-0">
            <button
              onClick={onItemRemove}
              className="absolute hover:bg-slate-200 rounded-md p-2"
            >
              <Trash className="h-5 w-5 text-red-600" />
            </button>
          </div>
          <div className=" pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
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
              <Currency value={data.price} />
            </div>
          </div>
        </div>
      </li>
    </div>
  );
};

export default CartItem;
