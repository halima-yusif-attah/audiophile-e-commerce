import React, { useContext, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'


function Cart(props) {
  const { cartItems, setCartItems, handleCart } = useContext(CartContext)

  console.log("cartItems-cart", cartItems)

  const cartRef = useRef()
  useEffect(() => {
    if (props.open) {
      cartRef.current.focus()
    }

  })


  const totalAmount = cartItems?.reduce((total, item) => (total +
    item.quantity * parseFloat(item.currency.replace(/[$,]/g, ""))), 0)



  const handleOneItemAddition = (id) => {
    const targetObj = cartItems?.find(item => item.id === id)

    if (targetObj) {
      setCartItems(() => cartItems.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item))
    }

  }

  const handleOneItemSubtraction = (id) => {
    const targetObj = cartItems?.find(item => item.id === id)
    if (targetObj.quantity <= 1) {
      return window.confirm('Do you want to remove the item from the cart?') &&
        setCartItems(cartItems.filter(item => item.id !== id))
    }

    if (targetObj) {
      setCartItems(() => cartItems.map(item => item.id === id ? { ...item, qty: item.qty - 1 } : item))
    }

  }

  const handleRemoveAll = (evt) => {
    console.log(evt.target)
    setCartItems(() => [])
  }

  return (
    <div className={`cart border-radius ${props.open ? "show-cart" : ""}`}
      tabIndex="-1"
      ref={cartRef}>

      {cartItems.length === 0 ?
        <div className='cart-main-empty'>
          <h3 className='cart-title'>the cart is empty</h3>

          <button className='bg-orange text-white btn-checkout'
            onClick={handleCart}>
            Close Cart
          </button>

        </div>

        :

        <div className='cart-main'>
          <div className='cart-heading'>

            <h3 className='cart-title'>Cart ({cartItems.length})</h3>

            <button className='remove-all'
              onClick={handleRemoveAll}>
              Remove all
            </button>

          </div>

          <ul className='cart-list'>
            {cartItems && cartItems.map(item => <li key={item.id} className='cart-list-item'>

              <div className='cart-img-container border-radius'>
                <img className='cart-item-img'
                  src={item.image}
                  alt="" />
              </div>

              <div className='cart-item-detail'>
                
                <h4 className='cart-item-title'>
                  {item.name.split(" ")[0]}
                  {item.name.split(" ")[1] === "Mark" ? " MK" : ""}
                  {item.name.split(" ")[1] === "Mark" ? item.name.split(" ")[2] : ""}
                </h4>

                <span className='cart-unit-cost'>
                  {item.currency}
                </span>
              </div>

              <div className='quantity-control'>
                <button className='btn btn-cart btn- minus'
                  onClick={() => handleOneItemSubtraction(item.id)}>-
                  <span className="sr-only">subtract</span>
                </button>

                <span className={`quantity quantity${item.id}`} aria-live='polite'>
                  {item.qty}
                </span>

                <button className='btn btn-cart add'
                  onClick={() => handleOneItemAddition(item.id)}>+</button>
              </div>

            </li>)}
          </ul>


          <div className='cart-totals'>
            <p className='total-label'>Total</p>
            <p className='total-amount' aria-live='polite'>
              {new Intl.NumberFormat('en-US',
                { style: 'currency', currency: 'USD' }).format(totalAmount)}
            </p>
          </div>

          <Link to="./checkout"
            className={`bg-orange text-white btn-checkout`}
            onClick={handleCart}>
            Checkout
          </Link>
        </div>
      }
    </div>
  )
}

export default Cart