import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navigation from './components/shared/Navigation';
import Footer from './components/shared/Footer';
import { CheckoutProvider } from './context/checkoutContext';
import { CartProvider } from './context/CartContext';
import DetailsComponent from './components/pages/Detailed/DetailsComponent';
import Headphones from './components/pages/headphones/Headphones';
import Earphones from './components/pages/earphones/Earphones';
import Speakers from './components/pages/speakers/Speakers';
import Home from './components/pages/home/Home';
import { ProductProvider } from './context/ProductContext';
import Checkout from './components/pages/checkout/Checkout';




function App() {
  return (
    <Router>
      <CartProvider>
        <CheckoutProvider>
          <ProductProvider>
          <div className="App">
            <ToastContainer limit={1} />
            <Navigation />
        <Outlet />
            <Routes>
<Route path="headphones/:id" element={<DetailsComponent />} />
            <Route path="headphones" element={<Headphones />} />
            <Route path="earphones/:id" element={<DetailsComponent />} />
            <Route path="earphones" element={<Earphones />} />
            <Route path="speakers/:id" element={<DetailsComponent />} />
            <Route path="speakers" element={<Speakers />} />
            <Route path="checkout" element={<Checkout />} />
            <Route exact path="/" element={<Home />} />
            <Route path="*" element={<main style={{ padding: "1rem", marginBlock: "2rem" }}>
              <p style={{ marginBlock: "2rem" }}>There's nothing here!</p>
            </main>
            }
            />
            </Routes>
            <Footer />
          </div>
          </ProductProvider>
        </CheckoutProvider>
      </CartProvider>
    </Router>
  );
}

export default App;