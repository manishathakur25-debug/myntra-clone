
import React from 'react';

function Product({ product, alt = 'Featured collection banner' }) {
  return (
    <div className="banner">
      <img
        className="offer"
        src={product}
        alt={alt}
        loading="lazy"
      />
    </div>
  );
}

export default Product;
