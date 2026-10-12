
import React, { useEffect, useState } from 'react';
import Api from '../ProductApi';
import useCart from '../Hooks/UseCart';
import Product from '../Product';

function Beauty() {
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

    Api.get('/products/category/beauty?limit=40')
      .then((response) => {
        if (isMounted) {
          setProducts(response.data.products);
          setError(false);
        }
      })
      .catch((err) => {
        console.error('Error loading beauty products:', err);

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
    return <h2 className="messagePage">Loading beauty products...</h2>;
  }

  if (error) {
    return (
      <div className="messagePage">
        <h2>Unable to load beauty products.</h2>
        <p>Please refresh the page and try again.</p>
      </div>
    );
  }

  return (
    <>
      <Product
        product="https://mma.prnewswire.com/media/1832317/Myntra.jpg"
      />

      <h1 className="menHeading">Beauty Collection</h1>

      {products.length === 0 ? (
        <p className="messagePage">No beauty products found.</p>
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

export default Beauty;