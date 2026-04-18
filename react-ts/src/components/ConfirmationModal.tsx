import { useEffect, useRef } from 'react'
import type { CartItem } from '../types/CartItem'

type ConfirmationModalProps = {
    isOpen: boolean
    data: CartItem[]
    onStartNewOrder: () => void
}

export function ConfirmationModal({
    isOpen,
    data,
    onStartNewOrder,
}: ConfirmationModalProps
) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return

        if (isOpen && !dialog.open) {
            dialog.showModal()
        }

        if (!isOpen && dialog.open) {
            dialog.close()
        }

    }, [isOpen])
    return (
        <dialog
            ref={dialogRef}
            className="confirmation-modal"
            aria-labelledby="confirmation-modal-title">
            <img className="confirmation-modal__icon" src="assets/images/icon-order-confirmed.svg" alt="" />
            <h2>Order Confirmed</h2>
            <p>We hope you enjoy your food!</p>
            <div className="confirmation-modal__products">
                {data.map((item) => (
                    <Product key={item.product.name} item={item} />
                ))}
                <Total data={data} />
            </div>

            <button
                className="cart__confirm-button"
                onClick={onStartNewOrder}>
                Start New Order
            </button>
        </dialog>
    )
}

function Product({ item }: { item: CartItem }) {
    return (
        <div className="confirmation-modal__product">
            <img className="confirmation-modal__product-image" src={item.product.image.thumbnail} alt={item.product.name} />
            <div className="confirmation-modal__product-details">
                <h3 className="cart-item__name">{item.product.name}</h3>
                <p className="cart-item__meta">
                    <span className="cart-item__quantity" >{item.quantity}x</span>
                    <span className="cart-item__price">@ ${item.product.price.toFixed(2)}</span>
                </p>
            </div>
            <p className="confirmation-modal__product__total">${(item.product.price * item.quantity).toFixed(2)}</p>
        </div>
    )
}


function Total({ data }: { data: CartItem[] }) {
    return <>
        <div className="cart-total">
            <p className="cart-total__label">Order Total</p>
            <p className="cart-total__amount">${data.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)}</p>
        </div>
    </>
}

