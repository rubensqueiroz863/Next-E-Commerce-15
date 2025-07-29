'use client';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store';
import Image from 'next/image';
import { animate, motion } from 'framer-motion';
import CheckoutButton from './CheckoutButton';
import Checkout from './Checkout';
import OrderCompleted from './OrderCompleted';

export default function CartDrawer() {
  const useStore = useCartStore();

  const totalPrice = useStore.cart.reduce((acc, item) => {
    return acc + item.price! * item.quantity!;
  }, 0);

  return (
    <motion.div
      initial={{ opacity: 0}}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => useStore.toggleCart()}
      className='fixed w-full h-screen bg-black/25 left-0 top-0 z-50'
    >
      
      <motion.div layout
        onClick={(e) => e.stopPropagation()}
        className='absolute overflow-x-hidden w-2/3 sm:w-4/5 md:w-2/5 lg:1/5 xl:1/5 2xl:1/5 bg-neutral-800 right-0 top-0 h-screen p-8 overflow-y-auto'
      >
        <button
          onClick={() => useStore.toggleCart()}
          className='font-bold text-sm text-white'
        >
          Voltar para loja
        </button>
        <div className='border-t border-gray-400 my-4'></div>
        {useStore.onCheckout === 'cart' && (
          <>
            {useStore.cart.map((item) => (
              <motion.div
                animate={{ scale: 1, rotateZ: 0, opacity: 1}}
                initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
                exit={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
                key={item.id} className='flex gap-4 py-4'>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={120}
                  height={120}
                  className='object-cover w-24'
                />
                <div>
                  <h2 className='w-42 truncate'>{item.name}</h2>
                  <h2>Quantidade: {item.quantity}</h2>
                  <p className='text-green-600 text-sm font-bold'>
                    {formatPrice(item.price)}
                  </p>
                  <button
                    className='py-1 px-2 border rounded-md mt-2 text-sm mr-1'
                    onClick={() => useStore.addProduct(item)}
                  >
                    Adicionar
                  </button>
                  <button
                    onClick={() => useStore.removeProduct(item)}
                    className='py-1 px-2 border rounded-md mt-2 text-sm'
                  >
                    Remover
                  </button>
                </div>
              </motion.div>
            ))}
          </>
        )}
        {useStore.cart.length > 0 && useStore.onCheckout === 'cart' && (
            <CheckoutButton totalPrice={totalPrice}/>
        )}

        {useStore.onCheckout === 'checkout' && (<Checkout/>)}
        {useStore.onCheckout === 'success' && (<OrderCompleted/>)} 
      </motion.div>
    </motion.div>
  );
}