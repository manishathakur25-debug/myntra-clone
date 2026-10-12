
import React from 'react';
import { Link } from 'react-router-dom';
import useCart from './Hooks/UseCart';

function WishlistPage() {
  const { wishlist, toggleWishlist, handleCart } = useCart();

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);

  if (wishlist.length === 0) {
    return (
      <section className="messagePage">
        <h1>Your Wishlist is Empty</h1>
        <Link to="/" className="shopLink">
          Explore Products
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h1 className="menHeading">My Wishlist</h1>

      <div className="dresses">
        {wishlist.map((item) => (
          <article className="product" key={item.id}>
            <Link to={`/product/${item.id}`}>
              <img
                className="dressImg"
                src={item.images?.[0]}
                alt={item.title}
              />
            </Link>

            <div className="imgdown">
              <h3>{item.title}</h3>
              <p>{formatPrice(item.price)}</p>

              <button onClick={() => handleCart(item)}>
                Add to Cart
              </button>

              <button onClick={() => toggleWishlist(item)}>
                Remove from Wishlist
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default WishlistPage;
