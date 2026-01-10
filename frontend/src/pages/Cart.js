import { Link } from "react-router-dom";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";

export default function Cart({ cartItems, setCartItems }) {
  const [completeOrder, setOderComplete] = useState(false);

  function increaseQty(items) {
    if (items.product.stock === items.qty) return;

    const updatedCartItems = cartItems.map((i) =>
      i.product._id === items.product._id ? { ...i, qty: i.qty + 1 } : i
    );

    setCartItems(updatedCartItems);
  }

  function decreaseQty(items) {
    if (items.qty <= 1) return;

    const updatedCartItems = cartItems.map((i) =>
      i.product._id === items.product._id ? { ...i, qty: i.qty - 1 } : i
    );

    setCartItems(updatedCartItems);
  }

  function removeCartItem(items) {
    const updatedCartItems = cartItems.filter(
      (i) => i.product._id !== items.product._id
    );

    setCartItems(updatedCartItems);
  }

  function placeOrderHandler() {
    fetch(`${process.env.REACT_APP_API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems }),
    })
      .then((res) => res.json())
      .then(() => {
        setCartItems([]);
        setOderComplete(true);
        toast.success("Order Placed Successfully");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Order failed");
      });
  }

  return cartItems.length > 0 ? (
    <Fragment>
      <div className="container container-fluid">
        <h2 className="mt-5">
          Your Cart: <b>{cartItems.length} items</b>
        </h2>

        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8">
            {cartItems.map((items) => (
              <Fragment key={items.product._id}>
                <hr />
                <div className="cart-item">
                  <div className="row">
                    <div className="col-4 col-lg-3">
                      <img
                        src={items.product.images[0].image}
                        alt={items.product.name}
                        height="90"
                        width="115"
                      />
                    </div>

                    <div className="col-5 col-lg-3">
                      <Link to={`/product/${items.product._id}`}>
                        {items.product.name}
                      </Link>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p id="card_item_price">${items.product.price}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <div className="stockCounter d-inline">
                        <span
                          className="btn btn-danger minus"
                          onClick={() => decreaseQty(items)}
                        >
                          -
                        </span>

                        <input
                          type="number"
                          className="form-control count d-inline"
                          value={items.qty}
                          readOnly
                        />

                        <span
                          className="btn btn-primary plus"
                          onClick={() => increaseQty(items)}
                        >
                          +
                        </span>
                      </div>
                    </div>

                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                      <i
                        id="delete_cart_item"
                        onClick={() => removeCartItem(items)}
                        className="fa fa-trash btn btn-danger"
                      ></i>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />

              <p>
                Subtotal:
                <span className="order-summary-values">
                  {" "}
                  {cartItems.reduce((acc, items) => acc + items.qty, 0)} Units
                </span>
              </p>

              <p>
                Est. total:
                <span className="order-summary-values">
                  {" "}
                  {cartItems.reduce(
                    (acc, items) => acc + items.product.price * items.qty,
                    0
                  )}
                </span>
              </p>

              <hr />

              <button
                id="checkout_btn"
                className="btn btn-primary btn-block"
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  ) : !completeOrder ? (
    <h2 className="mt-5">Your Cart is Empty.!</h2>
  ) : (
    <h2 className="mt-5">Your Order is Placed Successfully.!</h2>
  );
}
