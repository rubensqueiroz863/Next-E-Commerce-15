import AddCart from "@/app/components/AddCart";
import ProductImage from "@/app/components/ProductImage";
import { formatPrice } from "@/lib/utils";
import { stripe } from "@/lib/stripe";
import AddCartWithMessage from "@/app/components/AddCartWithMessage";

async function getProduct(id: string) {
  const product = await stripe.products.retrieve(id);
  const price = await stripe.prices.list({
    product: product.id,
  });

  return {
    id: product.id,
    price: price.data[0].unit_amount,
    name: product.name,
    image: product.images[0],
    description: product.description,
    currency: price.data[0].currency,
  };
}

export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProduct(id);

  return (
    <div className="flex flex-col md:flex-row items-center rounded-sm bg-neutral-900 max-w-7xl mx-auto gap-8 p-10 m-10">
      <div className="flex p-3 bg-neutral-600 rounded-sm">
        <ProductImage product={product} />
      </div>
      
      <div className="flex flex-col">
        <div className="pb-4">
          <h1 className="text-2xl font-bold text-white">{product.name}</h1>
          <h2 className="text-xl text-green-600 font-bold">
            {formatPrice(product.price)}
          </h2>
        </div>
        <div className="pb-4">
          <p className="text-sm text-white">{product.description}</p>
        </div>
        <div>
          <AddCartWithMessage product={product}/>
        </div>
      </div>
    </div>
  );
}
