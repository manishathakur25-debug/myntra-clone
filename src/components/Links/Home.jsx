
import React, { useEffect, useState } from 'react';
import Api from '../ProductApi';
import useCart from '../Hooks/UseCart';
import Product from '../Product';
import { Link } from 'react-router-dom';

function Home() {
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const {
    cart,
    handleCart,
    handleIncrease,
    handleDelete,
    wishlist,
    toggleWishlist,
  } = useCart();

  useEffect(() => {
    let cancelled = false;

    async function fetchHomeProducts() {
      try {
        const [furniture, decoration] = await Promise.all([
          Api.get('/products/category/furniture?limit=20'),
          Api.get('/products/category/home-decoration?limit=20'),
        ]);

        if (!cancelled) {
          setProducts([
            ...furniture.data.products,
            ...decoration.data.products,
          ]);
        }
      } catch (err) {
        console.error('Unable to load home products:', err);
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchHomeProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);

  if (loading) return <h2>Loading products...</h2>;

  if (error) {
    return <h2>Unable to load products. Please try again.</h2>;
  }

  return (
    <>
      <Product product="https://akm-img-a-in.tosshub.com/businesstoday/images/story/202109/242473827_10160157467293221_2645921924837005982_n-sixteen_nine.jpg" />

      <h1 className="menHeading">Home Collection</h1>

      <div className="menProducts">
        {product.map((item) => {
          const quantity =
            cart.find((saved) => saved.id === item.id)?.quantity || 0;

          const isWishlisted = wishlist.some(
            (saved) => saved.id === item.id
          );

          return (
            <article className="menp" key={item.id}>
              <Link to={`/product/${item.id}`}>
                <img
                  className="menImg"
                  src={item.images?.[0]}
                  alt={item.title}
                  loading="lazy"
                />
              </Link>

              <div className="menP">
                <strong>
                  <p>{item.title}</p>
                  <p>{formatPrice(item.price)}</p>
                </strong>

                <div className="quantityControls">
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={quantity === 0}
                  >
                    −
                  </button>

                  <span>{quantity}</span>

                  <button onClick={() => handleIncrease(item.id)}>
                    +
                  </button>
                </div>

                <button onClick={() => handleCart(item)}>
                  Add to Cart
                </button>

                <button onClick={() => toggleWishlist(item)}>
                  {isWishlisted ? '♥ Wishlisted' : '♡ Wishlist'}
                </button>

                <p>Cart quantity: {quantity}</p>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

export default Home;
