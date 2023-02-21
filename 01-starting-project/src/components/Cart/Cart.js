import { useContext, useState } from "react";

import useHttp from "../hooks/useHttp";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [itemsConfirmation, setItemsConfirmation] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const { isLoading, error, sendRequest: sendOrder } = useHttp();

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const checkOutInfoConfirm = (customerData) => {
    setOrderSubmitted(true);
    sendOrder({
      url: process.env.REACT_APP_OrderssAPI,
      method: "POST",
      body: { customer: customerData, orderItems: cartCtx.items },
      rpLoader: (orderData) => {
        console.log("orderData:   ", orderData);
      },
    });
    cartCtx.clearCart();
  };

  const CartConfirmBar = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button
          onClick={() => setItemsConfirmation(true)}
          className={classes.button}
        >
          Order
        </button>
      )}
    </div>
  );

  const CartContent = (
    <>
      {" "}
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {itemsConfirmation && (
        <Checkout
          onConfirm={checkOutInfoConfirm}
          onCancel={() => setItemsConfirmation(false)}
        />
      )}
      {!itemsConfirmation && CartConfirmBar}
    </>
  );

  const successOrderSubContent = (
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      <strong>Order submitted to ReactMeals.</strong> ReactMeals will process
      your order and forward to restaurant.
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={props.onClose}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {orderSubmitted && isLoading && (
        <div class="text-center">
          <div class="spinner-border text-info" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <strong>Loading...</strong>
        </div>
      )}
      {orderSubmitted && error && (
        <div class="alert alert-danger" role="alert">
          A simple danger alert—check it out! {error}
        </div>
      )}
      {orderSubmitted && !error && !isLoading && successOrderSubContent}
      {!orderSubmitted && !isLoading && !error && CartContent}
    </Modal>
  );
};

export default Cart;
