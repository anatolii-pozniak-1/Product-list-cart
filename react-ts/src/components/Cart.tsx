import type { CartItem } from "../types/CartItem";

type CartListProps = {
    data: CartItem[]
    onRemove: (productName: string) => void
    onConfirmationClick: () => void
}

type CartProps = {
    item: CartItem
    onRemove: (productName: string) => void
}

export function Cart({ data, onRemove, onConfirmationClick }: CartListProps) {
    const totalCount = data.reduce((sum, item) => sum + item.quantity, 0);
    return (
        <aside className="cart">
            <h2 className="cart__title">Your Cart ({totalCount})</h2>
            {totalCount === 0 ? (
                <div className="cart__empty">
                    <img src="assets/images/illustration-empty-cart.svg" alt="" />
                    <p>Your added items will appear here</p>
                </div>
            ) : (
                <div className="cart__content">
                    {data.map((item) => <Product key={item.product.name} item={item} onRemove={onRemove} />)}
                    <CardTotal data={data} />
                    <Banner />
                    <button
                        className="cart__confirm-button"
                        onClick={onConfirmationClick}>
                        Confirm Order
                    </button>
                </div>
            )}
        </aside>
    );
}

function Product({ item, onRemove }: CartProps) {
    return (
        <div className="cart-item">
            <div className="cart-item__details">
                <h3 className="cart-item__name">{item.product.name}</h3>
                <p className="cart-item__meta">
                    <span className="cart-item__quantity" >{item.quantity}x</span>
                    <span className="cart-item__price">@ ${item.product.price.toFixed(2)}</span>
                    <span className="cart-item__total">${(item.product.price * item.quantity).toFixed(2)}</span>
                </p>
            </div>
            <button className="cart-item__remove" onClick={() => onRemove(item.product.name)}><img src="assets/images/icon-remove-item.svg" alt="Remove item" /></button>
        </div>
    );
}

function CardTotal({ data }: { data: CartItem[] }) {
    return <>
        <div className="cart-total">
            <p className="cart-total__label">Order Total</p>
            <p className="cart-total__amount">${data.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)}</p>
        </div>
    </>
}

function Banner() {
    return (
        <div className="cart-banner">
            <img src="assets/images/icon-carbon-neutral.svg" alt="" />
            <p>This is a <strong>carbon-neutral</strong> delivery</p>
        </div>
    );
}