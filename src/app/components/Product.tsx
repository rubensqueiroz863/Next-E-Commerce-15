'use client';

import { useState } from "react";
import { ProductType } from "@/types/ProductType";
import ProductImage from "./ProductImage";
import { formatPrice } from "@/lib/utils";
import AddCart from "./AddCart";
import AddMessage from "./AddMessage";
import Link from "next/link";

type ProductProps = {
  product: ProductType;
};

export default function Product({ product }: ProductProps) {
  const [showMessage, setShowMessage] = useState(false);

  const handleAddMessage = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <div className="relative">
      {/* Mensagem fora da div do botão */}
      {showMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
            <AddMessage />
        </div>
      )}

      {/* Cartão do produto */}
      <div className="flex rounded-sm flex-col shadow-lg h-96 bg-neutral-900 p-5 text-gray-300">
        <Link href={`/product/${product.id}`}>
          <div className="relative h-60 w-full cursor-pointer">
            <ProductImage product={product} fill />
          </div>
          <div className="flex justify-between font-bold my-3">
            <p className="w-40 truncate">{product.name}</p>
            <p className="text-md text-green-600">{formatPrice(product.price)}</p>
          </div>
        </Link>

        {/* Botão fora do link, passando onAdd para exibir mensagem */}
        <AddCart product={product} onAdd={handleAddMessage} />
      </div>
    </div>
  );
}