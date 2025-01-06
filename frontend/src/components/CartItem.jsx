import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div className="rounded-lg shadow-blue-400 shadow-sm border p-4  border-blue-700 bg-slate-200 md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <div className="shrink-0 md:order-1 shadow-blue-400">
          <img className="h-20 md:h-32 rounded object-cover" src={item.image} />
        </div>
        <label className="sr-only">Choose quantity:</label>

        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center gap-2">
            <button
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border
							 border-gray-600 bg-slate-950 hover:bg-gray-600 focus:outline-none focus:ring-2
							  focus:ring-blue-700"
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
            >
              <Minus className="text-blue-600" />
            </button>
            <p >{item.quantity}</p>
            <button
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border
							 border-gray-600 bg-slate-950 hover:bg-gray-600 focus:outline-none 
						focus:ring-2 focus:ring-blue-700"
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
            >
              <Plus className="text-blue-600" />
            </button>
          </div>

          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-blue-700">${item.price}</p>
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <p className="text-base font-medium text-slate-950 hover:text-blue-700 hover:underline">
            {item.name}
          </p>
          <p className="text-sm text-gray-500">{item.description}</p>

          <div className="flex items-center gap-4">
            <button
              className="inline-flex items-center text-sm font-medium text-red-500
							 hover:text-red-300 hover:underline"
              onClick={() => removeFromCart(item._id)}
            >
              <Trash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
