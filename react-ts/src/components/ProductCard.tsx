import type { CartItem } from "../types/CartItem";

type ProductProps = {
    item: CartItem
    onIncreaseQuantity: (productName: string) => void
    onDecreaseQuantity: (productName: string) => void
}

export function ProductCard({ item, onIncreaseQuantity, onDecreaseQuantity }: ProductProps) {
    return (
        <article className="product-card">
            <div className="product-card__media">
                <img
                    className={`product-card__image ${item.quantity > 0 ? "product-card__image--active" : ""}`}
                    src={item.product.image.thumbnail}
                    alt={item.product.name} />

                <div className="product-card__actions" >
                    {item.quantity === 0 ?
                        <ButtonDefault onIncreaseQuantity={() => onIncreaseQuantity(item.product.name)} /> :
                        <ButtonWithAction item={item} onIncreaseQuantity={onIncreaseQuantity} onDecreaseQuantity={onDecreaseQuantity} />
                    }
                </div>
            </div>
            <p className="product-card__category">{item.product.category}</p>
            <h2 className="product-card__name">{item.product.name}</h2>
            <p className="product-card__price">${item.product.price.toFixed(2)}</p>
        </article>
    );
}


function ButtonDefault({ onIncreaseQuantity }: { onIncreaseQuantity: () => void }) {
    return (
        <button className="product-card__button product-card__button--default" onClick={onIncreaseQuantity}>
            <img src={"/assets/images/icon-add-to-cart.svg"} /> Add to Cart
        </button>

    );
}

function ButtonWithAction({ item, onIncreaseQuantity, onDecreaseQuantity }: ProductProps) {
    return (
        <div className="product-card__button product-card__button--active ">

            <button
                className="product-card__quantity-button"
                onClick={() => onDecreaseQuantity(item.product.name)}>
                <img src={"/assets/images/icon-decrement-quantity.svg"} alt="" />
            </button>
            {item.quantity}

            <button
                className="product-card__quantity-button"
                onClick={() => onIncreaseQuantity(item.product.name)}>
                <img src={"/assets/images/icon-increment-quantity.svg"} alt="" />
            </button>
        </div>
    );
}       