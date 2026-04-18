import type { CartItem } from "../types/CartItem";
import { ProductCard } from "./ProductCard";

type ProductListProps = {
    data: CartItem[]
    onIncreaseQuantity: (productName: string) => void
    onDecreaseQuantity: (productName: string) => void
}

export function ProductList(
    {
        data: cartItems,
        onIncreaseQuantity,
        onDecreaseQuantity,
    }: ProductListProps
) {

    return (
        <div className="product-list">
            {
                cartItems.map((item) =>
                    <ProductCard key={item.product.name}
                        item={item}
                        onIncreaseQuantity={onIncreaseQuantity}
                        onDecreaseQuantity={onDecreaseQuantity}
                    />
                )
            }
        </div>
    );
}