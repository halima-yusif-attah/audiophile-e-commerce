import React, { useContext } from 'react'
import ButtonView from './ButtonView'
import DecorativeImages from './DecorativeImages'
import { CartContext } from '../../context/CartContext'

function ProductsShared(props) {
    const details = props.details ? "product-detail" : ""
    const { addToCart, updateQuantity, cartItems } = useContext(CartContext)

    const itemInCart = cartItems.find(item => item.id === props.address);
const quantity = itemInCart?.quantity || 1;

const handleAdd = () => {
  updateQuantity(props.address, quantity + 1);
};

const handleMinus = () => {
  const newQty = quantity > 1 ? quantity - 1 : 1;
  updateQuantity(props.address, newQty);
};

    return (
        <div className={`shared-products container ${details}`}>
  <div className='shared-products-image-container border-radius'>
    <DecorativeImages desktop={props.desktop} tablet={props.tablet} mobile={props.mobile} />
  </div>
  <div className='shared-products-content'>
    <h2 className='product-title text-orange'>New product</h2>
    <h3 className='product-title-secondary'>{props.name}</h3>
    <p className='shared-product-text'>{props.description}</p>
    <ButtonView name={props.name} address={props.address} hide={props.hide} />

    {props.details && (
      <div className='add-to-cart'>
        <p className='product-cost'>{props.currency}</p>

        <div className='cart-divider'>
          <div className='quantity-control'>
            <button className='btn btn-cart btn- minus' onClick={handleMinus}>
              -<span className="sr-only">subtract</span>
            </button>
            <span className='quantity' aria-live='polite'>{quantity}</span>
            <button className="btn btn-cart add" onClick={handleAdd}>+</button>
          </div>

          <button
            className='btns btn-add-to-cart'
            onClick={() =>
              addToCart(props)
            }
          >
            Add to cart
          </button>
         
        </div>
      </div>
    )}
  </div>
</div>

    )
}

export default ProductsShared