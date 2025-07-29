'use client';

import { useCartStore } from "@/store";
import { useEffect } from "react";
import CheckoutMessageBox from "./CheckoutMessageBox";

function OrderCompleted() {
    const cartStore = useCartStore();
    useEffect(() => {
        cartStore.setPaymentIntent(null);
        cartStore.clearCart();
    }, []);

    return (
        <div>
            <CheckoutMessageBox/>
        </div>
    )
}

export default OrderCompleted;