'use client';

import { useState } from 'react';
import AddCart from './AddCart';
import AddMessage from './AddMessage';
import { ProductType } from '@/types/ProductType';

type Props = {
  product: ProductType;
};

export default function AddCartWithMessage({ product }: Props) {
  const [showMessage, setShowMessage] = useState(false);

  function handleAdd() {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  }

  return (
    <>
      <AddCart product={product} onAdd={handleAdd} />
      {showMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
            <AddMessage />
        </div>
      )}

    </>
  );
}
