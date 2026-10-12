
import React, { useEffect, useState } from 'react';
import Api from '../ProductApi';
import useCart from '../Hooks/UseCart';
import Product from '../Product';

function Kids() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const {
    cart,
    handleCart,
    handleIncrease,
    handleDelete,
    toggleWishlist,
    wishlist,
  } = useCart();

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      Api.get('/products/category/tops?limit=10'),
      Api.get('/products/category/sunglasses?limit=10'),
      Api.get('/products/category/womens-dresses?limit=10'),
      Api.get('/products/category/mens-shirts?limit=10'),
    ])
      .then(([tops, sunglasses, dresses, shirts]) => {
        if (isMounted) {
          setProducts([
            ...tops.data.products,
            ...sunglasses.data.products,
            ...dresses.data.products,
            ...shirts.data.products,
          ]);

          setError(false);
        }
      })
      .catch((err) => {
        console.error('Error loading kids products:', err);

        if (isMounted) {
          setError(true);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);

  if (loading) {
    return (
      <h2 className="messagePage">
        Loading Kids Collection...
      </h2>
    );
  }

  if (error) {
    return (
      <div className="messagePage">
        <h2>Unable to load Kids Collection.</h2>
        <p>Please refresh the page and try again.</p>
      </div>
    );
  }

  return (
    <>
      <Product
        product="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_X2Iio9_4xAF8xPnXR4OdcObFZud091zLM3tnCU6gXtsJMP-womoRwvw&s=10"
      />

      <h1 className="menHeading">Kids Collection</h1>

      {products.length === 0 ? (
        <p className="messagePage">No products found.</p>
      ) : (
        <div className="menProducts">
          {products.map((item) => {
            const cartItem = cart.find(
              (cartProduct) => cartProduct.id === item.id
            );

            const quantity = cartItem?.quantity || 0;

            const isWishlisted = wishlist.some(
              (wishlistItem) => wishlistItem.id === item.id
            );

            return (
              <div key={item.id} className="menp">
                <img
                  className="menImg"
                  src={item.thumbnail}
                  alt={item.title}
                  loading="lazy"
                />

                <div className="menP">
                  <strong>
                    <p>{item.title}</p>
                    <p>{formatPrice(item.price)}</p>
                  </strong>

                  <div className="productActions">
                    <button
                      type="button"
                      onClick={() => handleCart(item)}
                    >
                      Add to Cart
                    </button>

                    <button
                      type="button"
                      onClick={() => handleIncrease(item.id)}
                      disabled={quantity === 0}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>

                    <span>Quantity: {quantity}</span>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      disabled={quantity === 0}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleWishlist(item)}
                  >
                    {isWishlisted
                      ? '♥ Remove from Wishlist'
                      : '♡ Add to Wishlist'}
                  </button>

                  <p>Cart: {quantity}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Kids;
