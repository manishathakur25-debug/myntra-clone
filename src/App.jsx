import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';


import Navbar from './components/Navbar';
import Footer from './components/Footer';


import Carts from './components/Carts';
import CartPage from './components/CartPage';
import WishlistPage from './components/WishlistPage';
import ProductDetails from './components/ProductDetails';


import Men from './components/Links/Men';
import Women from './components/Links/Women';
import Kids from './components/Links/Kids';
import Home from './components/Links/Home';
import Studio from './components/Links/Studio';
import Genz from './components/Links/Genz';
import Beauty from './components/Links/Beauty';


import { CartProvider } from './components/CartContext';

function NotFound() {
  return (
    <div className="messagePage">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

function App() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Search debounce: waits 500ms after typing stops
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <CartProvider>
      <Navbar
        image="https://www.freelogovectors.net/wp-content/uploads/2023/01/myntra-logo-freelogovectors.net_.png"
        search={search}
        setSearch={setSearch}
      />

      <main>
        <Routes>
       
          <Route
            path="/"
            element={<Carts search={debouncedSearch} />}
          />

         
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/home" element={<Home />} />
          <Route path="/beauty" element={<Beauty />} />
          <Route path="/genz" element={<Genz />} />
          <Route path="/studio" element={<Studio />} />


          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />

         
          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </CartProvider>
  );
}

export default App;