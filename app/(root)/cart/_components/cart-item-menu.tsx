import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/hooks/use-cart";
import { MoreVertical, Trash } from "lucide-react";

const CartItemMenu = () => {
  const initialData = useCart();

  return (
    <>
      <DropdownMenu>
        {initialData.items.length > 1 && (
          <DropdownMenuTrigger className="focus:outline-none text-slate-600 focus-visible:ring-transparent">
            <MoreVertical className="h-5 w-5" />
          </DropdownMenuTrigger>
        )}
        <DropdownMenuContent align="end" alignOffset={11}>
          <DropdownMenuItem
            onClick={() => initialData.removeAll()}
            className="text-muted-foreground"
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete All Items
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CartItemMenu;
