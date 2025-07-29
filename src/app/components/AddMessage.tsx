'use client';

import { AnimatePresence, motion } from 'framer-motion';

export default function AddMessage() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="bg-neutral-900 text-white px-4 py-2 rounded shadow"
      >
        Produto adicionado ao carrinho!
      </motion.div>
    </AnimatePresence>
  );
}
