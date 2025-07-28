'use client';

import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

function CheckoutForm({ clientSecret }: { clientSecret: string }) {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const cartStore = useCartStore();

    const totalPrice = cartStore.cart.reduce((acc, item) => {
        return acc + item.price! * item.quantity!;
    }, 0);

    const formatedPrice = formatPrice(totalPrice);

    useEffect(() => {
        if (stripe) return;
        if(!clientSecret) return;
    }, [stripe])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!stripe || !elements) return;

        setIsLoading(true);
        stripe.confirmPayment({
            elements,
            redirect: 'if_required',
        }).then((result) => {
            if (!result.error) {
                cartStore.setCheckout('success');
            }
            setIsLoading(false);
        });
    }

    return (
        <form onSubmit={handleSubmit} id="payment-form">
            <PaymentElement id="payment-element" options={{ layout: 'tabs' }}/>
            <h1 className="py-4 text-green-600 font-bold">Total: {formatedPrice}</h1>
            <button
                type="submit"
                disabled={!stripe || isLoading}
                className="bg-neutral-600 text-white py-2 px-4 rounded-md"
                
            >
                {isLoading ? 'Carreganddo...' : 'Finalizar compra'}
            </button>
        </form>
    );
}

export default CheckoutForm;