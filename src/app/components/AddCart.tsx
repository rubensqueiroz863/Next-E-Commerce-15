'use client';

import { useCartStore } from "@/store";
import { ProductType } from "@/types/ProductType";

type AddCartProps = {
  product: ProductType;
  onAdd?: () => void;  // opcional
};

export default function AddCart({ product, onAdd }: AddCartProps) {
  const { addProduct } = useCartStore();

  const handleAdd = () => {
    addProduct(product);
    if (onAdd) onAdd();
  };

  return (
    <button
      onClick={handleAdd}
      className="rounded-md cursor-pointer bg-neutral-600 text-white px-3.5 py-2.5 text-sm text-center"
    >
      Adicionar ao Carrinho
    </button>
  );
}
