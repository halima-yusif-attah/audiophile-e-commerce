import { createContext, useState, useCallback } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [shipping, _setShipping] = useState(50);
  const [vat, setVat] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false)

  const updateTotals = useCallback(() => {
    const subTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(subTotal);
    setVat(subTotal * 0.2);
  }, [cartItems]);

  // // Load cart items from localStorage on mount
  // useEffect(() => {
  //   const savedCart = localStorage.getItem('cartItems');
  //   if (savedCart) {
  //     setCartItems(JSON.parse(savedCart));
  //     updateTotals();
  //   }
  // }, [updateTotals]);

  // // Save cart items to localStorage whenever they change
  // useEffect(() => {
  //   localStorage.setItem('cartItems', JSON.stringify(cartItems));
  //   updateTotals();
  // }, [cartItems, updateTotals]);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    updateTotals();
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
    updateTotals();
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems(cartItems.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
    updateTotals();
  };

  function handleCart() {
    console.log(isCartOpen)
    setIsCartOpen(!isCartOpen)
  }

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      total,
      shipping,
      vat,
      isCartOpen,
      handleCart 
    }}>
      {children}
    </CartContext.Provider>
  );
}
