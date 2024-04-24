import { useState } from "react";
import { products } from "./constants";
import "./App.css";

const App = () => {
  const [cart, setCart] = useState([]);
  console.log("cart:", cart);
  return (
    <>
      {cartItems(cart, setCart)}
      {displayProducts(cart, setCart)}
    </>
  );
};

const displayProducts = (cart, setCart) => {
  return (
    <ul
      style={{
        listStyle: "none",
      }}
    >
      <h2>Products</h2>
      {products.map((item) => (
        <li
          style={{
            padding: "10px",
            display: "flex",
            alignItems: "center",
          }}
          key={item?.id}
        >
          <div>
            <span>{item?.name}</span>
            <span> ${item?.price}</span>
          </div>
          <button
            onClick={() => {
              addToCart(item?.id - 1, cart, setCart);
            }}
            style={{ margin: "0px 5px" }}
            disabled={item.quantity === 0}
          >
            Add to cart
          </button>
        </li>
      ))}
    </ul>
  );
};

const cartItems = (cart, setCart) => {
  return (
    <div>
      <h2>Cart</h2>
      <div>
        {cart?.map((item) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
              key={item.id}
            >
              <div>
                <span>{item.quantity}</span>
                <span className="m-4">x</span>
                <span>{products[item?.id]?.name}</span>
              </div>
              <div>
                <button onClick={() => removeItem(item?.id, setCart)}>-</button>
                <button
                  onClick={() => addToCart(item.id, cart, setCart)}
                  disabled={item?.quantity >= products[item?.id]?.quantity}
                >
                  +
                </button>
                <span>$ {products[item?.id]?.price}</span>
              </div>
            </div>
          );
        })}
      </div>
      <hr />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "5px",
        }}
      >
        <div>Total</div>
        <div>${calculateTotal(cart)}</div>
      </div>
    </div>
  );
};

const calculateTotal = (cart) => {
  let total = 0;
  cart.forEach((element) => {
    total += element.quantity * products[element.id].price;
  });
  return total;
};

const addToCart = (productId, cart, setCart) => {
  const itemExists = checkIfItemExists(productId, cart);
  const stock = products[productId].quantity;

  setCart((prev) =>
    itemExists
      ? prev.map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity:
                  item.quantity < stock ? item.quantity + 1 : item.quantity,
              }
            : item
        )
      : [...prev, { id: productId, quantity: 1 }]
  );
};

const checkIfItemExists = (productId, cart) => {
  const itemExists = cart.find((item) => item.id === productId);
  return itemExists;
};

const removeItem = (productId, setCart) => {
  setCart((prev) => {
    let productIndex = prev.findIndex((item) => item.id === productId);

    if (prev[productIndex].quantity > 1) {
      const updatedCart = [...prev];
      updatedCart[productIndex] = {
        ...prev[productIndex],
        quantity: prev[productIndex].quantity - 1,
      };
      return updatedCart;
    } else {
      return prev.filter((item) => item.id !== productId);
    }
  });
};
export default App;
