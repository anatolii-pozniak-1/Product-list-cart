import { useState } from 'react'
import './App.css'
import { Cart } from './components/Cart'
import { ConfirmationModal } from './components/ConfirmationModal'
import { ProductList } from './components/ProductList'
import products from './data/data.json'
import type { CartItem } from './types/CartItem'

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(products.map((product) => ({ product, quantity: 0 })))
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)

  function increaseQuantity(productName: string) {
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (item.product.name === productName) {
          return {
            ...item,
            quantity: item.quantity + 1,
          }
        }
        return item
      })
    )
  }
  function decreaseQuantity(productName: string) {
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (item.product.name === productName) {
          return {
            ...item,
            quantity: Math.max(item.quantity - 1, 0),
          }
        }
        return item
      })
    )
  }
  function removeItem(productName: string) {
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (item.product.name === productName) {
          return {
            ...item,
            quantity: 0,
          }
        }
        return item
      })
    )
  }

  return (
    <main className="app-layout">
      <section className="products-section">
        <h1>Desserts</h1>
        <ProductList
          data={cartItems}
          onIncreaseQuantity={increaseQuantity}
          onDecreaseQuantity={decreaseQuantity}
        />
      </section>

      <Cart
        data={cartItems.filter((item) => item.quantity > 0)}
        onRemove={removeItem}
        onConfirmationClick={() => setShowConfirmation(true)} />

      <ConfirmationModal
        isOpen={showConfirmation}
        data={cartItems.filter((item) => item.quantity > 0)}
        onStartNewOrder={() => {
          setShowConfirmation(false)
          setCartItems((currentItems) =>
            currentItems.map((item) => {
              return {
                ...item,
                quantity: 0,
              }
            })
          )
        }} />
    </main>
  )
}

export default App
