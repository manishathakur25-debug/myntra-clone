
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Api from './ProductApi';
import useCart from './Hooks/UseCart';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { handleCart } = useCart();

  useEffect(() => {
    let cancelled = false;

    setProduct(null);
    setLoading(true);
    setError(false);

    Api.get(`/products/${id}`)
      .then((response) => {
        if (!cancelled) setProduct(response.data);
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <h2 className="messagePage">Loading product...</h2>;

  if (error || !product) {
    return <h2 className="messagePage">Product could not be found.</h2>;
  }

  return (
    <section className="detailsPage">
      <img
        src={product.images?.[0]}
        alt={product.title}
      />

      <div>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <h2>${product.price}</h2>
        <p>{product.discountPercentage}% OFF</p>

        <button onClick={() => handleCart(product)}>
          Add to Cart
        </button>
      </div>
    </section>
  );
}

export default ProductDetails;
