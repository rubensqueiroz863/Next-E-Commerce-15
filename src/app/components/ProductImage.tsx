"use client";
import { useState } from "react";
import Image from "next/image";
import { ProductType } from "@/types/ProductType";

type ProductImageProps = {
    product: ProductType;
    fill?: boolean;
}

export default function ProductImage({ product, fill }: ProductImageProps) {
    const [loading, setLoading] = useState(true);
    return fill ? (
        <Image
            src={product.image}
            fill
            alt={product.name}
            className={`object-cover ${
                loading ? "scale-110 blur-lg grayscale"
                : "scale-100 blur-none grayscale-0"
            }`}
            onLoad={() => setLoading(false)}
        />
    ) : (
        <Image
            src={product.image}
            width={400}
            height={700}
            alt={product.name}
            className={`object-cover ${
                loading ? "scale-110 blur-lg grayscale"
                : "scale-100 blur-none grayscale-0"
            }`}
            onLoad={() => setLoading(false)}
        />
    );
}