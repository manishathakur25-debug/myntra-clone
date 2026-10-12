
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Api from './ProductApi';
import useCart from './Hooks/UseCart';
import Product from './Product';

function Carts({ search = '' }) {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const {
    cart,
    handleCart,
    handleIncrease,
    handleDelete,
    wishlist,
    toggleWishlist,
    totalItems,
    totalAmount,
  } = useCart();

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      setLoading(true);
      setError(false);

      try {
        const response = await Api.get('https://dummyjson.com/products?limit=30&skip=30');

        if (!cancelled) {
          setProduct(response.data.products);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('Unable to fetch products:', err);
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);

  const filterProducts = product.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <h2 className="messagePage">Loading products...</h2>;

  if (error) {
    return (
      <div className="messagePage">
        <h2>Unable to load products.</h2>
        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <Product product="https://cdn.growthjockey.com/blogs/myntra-seller-registration.webp" />

      <Product product="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToIjNyysfAgzUALd4xOiJZSL2i7CRUPPTnA5UDBOugzPw9fqgFlN0bIj8&s=10" />

      <section className="cartSummary">
        <span>Bag items: {totalItems}</span>
        <span>Cart total: {formatPrice(totalAmount)}</span>
      </section>

      <div className="dresses">
        {filterProducts.map((item) => {
          const quantity =
            cart.find((cartItem) => cartItem.id === item.id)?.quantity || 0;

          const isWishlisted = wishlist.some(
            (saved) => saved.id === item.id
          );

          return (
            <article className="product" key={item.id}>
              <Link to={`/product/${item.id}`}>
                <img
                  className="dressImg"
                  src={item.images?.[0]}
                  alt={item.title}
                  loading="lazy"
                />
              </Link>

              <div className="imgdown">
                <h3 className="title">{item.title}</h3>

                <p>Price: {formatPrice(item.price)}</p>

                <p className="off">
                  {Math.round(item.discountPercentage || 0)}% OFF
                </p>

                <div className="productActions">
                  <button onClick={() => handleCart(item)}>
                    Add to Cart
                  </button>

                  <div className="quantityControls">
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={quantity === 0}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <span>{quantity}</span>

                    <button
                      onClick={() => handleIncrease(item.id)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <p>Subtotal: {formatPrice(item.price * quantity)}</p>

                  <button onClick={() => toggleWishlist(item)}>
                    {isWishlisted ? '♥ Wishlisted' : '♡ Wishlist'}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filterProducts.length === 0 && (
        <p className="messagePage">
          No products found. Try another search.
        </p>
      )}

      <Product product="https://cdn.grabon.in/gograbon/indulge/wp-content/uploads/ajio-vs-myntra.jpeg" />
    </>
  );
}

export default Carts;
