
import React from 'react';
import { Link } from 'react-router-dom';
import useCart from './Hooks/UseCart';

function CartPage() {
  const {
    cart,
    handleIncrease,
    handleDelete,
    removeFromCart,
    totalItems,
    totalAmount,
  } = useCart();

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);

  if (cart.length === 0) {
    return (
      <section className="messagePage">
        <h1>Your shopping bag is empty</h1>
        <p>Add your favourite products to get started.</p>
        <Link to="/" className="shopLink">
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="cartPage">
      <h1>My Shopping Bag</h1>
      <p>Total items: {totalItems}</p>

      <div className="cartLayout">
        <div className="cartItems">
          {cart.map((item) => (
            <article className="cartItem" key={item.id}>
              <img
                src={item.images?.[0]}
                alt={item.title}
              />

              <div className="cartItemInfo">
                <h3>{item.title}</h3>
                <p>Price: {formatPrice(item.price)}</p>

                <div className="quantityControls">
                  <button
                    onClick={() => handleDelete(item.id)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => handleIncrease(item.id)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <p>
                  Subtotal: {formatPrice(item.price * item.quantity)}
                </p>

                <button
                  className="removeButton"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="priceDetails">
          <h2>Price Details</h2>

          <div className="priceRow">
            <span>Total items</span>
            <span>{totalItems}</span>
          </div>

          <div className="priceRow">
            <span>Subtotal</span>
            <span>{formatPrice(totalAmount)}</span>
          </div>

          <div className="priceRow">
            <span>Delivery</span>
            <span>FREE</span>
          </div>

          <hr />

          <div className="priceRow finalAmount">
            <strong>Total Amount</strong>
            <strong>{formatPrice(totalAmount)}</strong>
          </div>

<button
  className="checkoutButton"
  disabled={cart.length === 0}
  onClick={() => {
    if (cart.length === 0) {
      alert('Your shopping bag is empty!');
      return;
    }

    alert('Demo checkout! No real payment was made.');
  }}
>
  Place Order
</button>

        </aside>
      </div>
    </section>
  );
}

export default CartPage;


