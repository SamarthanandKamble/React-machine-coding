import { useState } from "react";
import "./App.css";
import { inventory } from "./constants";
function App() {
  const [cart, setCart] = useState([]);
  console.log("cart", cart);
  return (
    <>
      <h2>Cart</h2>
      {displayCartItems(cart, setCart)}
      <h2>Inventories</h2>
      {displayInventoryItems(cart, setCart)}
    </>
  );
}

const displayInventoryItems = (cart, setCart) => {
  return (
    <>
      <ul>
        {inventory.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>
            <button onClick={() => addToCart(item.id - 1, setCart)}>
              Add to cart
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

const displayCartItems = (cart, setCart) => {
  return (
    <div
      style={{
        width: "60vw",
      }}
    >
      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div>
              <span>
                {item?.quantity} X {inventory[item.id].name}
              </span>
            </div>
            <div>
              <button onClick={() => removeItem(item.id, setCart)}>-</button>
              <button
                onClick={() => addToCart(item.id, setCart)}
                disabled={item.quantity >= inventory[item.id].quantity}
              >
                +
              </button>
              <span>$ {inventory[item.id].price}</span>
            </div>
          </div>
        </div>
      ))}
      <hr />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <span>Total</span>
        <span>$ {calculateTotal(cart)}</span>
      </div>
    </div>
  );
};

const removeItem = (productId, setCart) => {
  setCart((prev) => {
    const itemIndex = prev.find((item) => item.id === productId);
    if (itemIndex.quantity > 1) {
      return prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    } else {
      return prev.filter((item) => item.id !== productId);
    }
  });
};

const calculateTotal = (cart) => {
  let total = 0;
  cart.forEach((element) => {
    total += element.quantity * inventory[element.id].price;
  });

  return total;
};

const addToCart = (productId, setCart) => {
  const stock = inventory[productId]?.quantity;
  setCart((prev) => {
    const isItemPresent = prev.findIndex((item) => item.id === productId);
    if (isItemPresent !== -1) {
      return prev.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity:
                item.quantity <= stock ? item.quantity + 1 : item.quantity,
            }
          : item
      );
    } else {
      return [...prev, { id: productId, quantity: 1 }];
    }
  });
};

export default App;
