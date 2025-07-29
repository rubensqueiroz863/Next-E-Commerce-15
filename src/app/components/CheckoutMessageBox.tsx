'use client';

import { useCartStore } from "@/store";

export default function CheckoutMessageBox() {
  const cartStore = useCartStore();

  return (
    <>
      {cartStore.onCheckout === "success" && (
        <div className="mt-4 bg-neutral-900 rounded-sm shadow p-4 w-full">
          <p className="text-white mb-4">Compra finalizada com sucesso!</p>
          <button
            className="bg-neutral-600 text-white w-full py-2 rounded"
            onClick={() => {
              cartStore.setCheckout("cart");
              cartStore.cart.length = 0;
            }}
          >
            Ok
          </button>
        </div>
      )}
    </>
  );
}