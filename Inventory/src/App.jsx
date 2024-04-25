import { useState } from "react";
import "./App.css";
import { inventory } from "./constants";
function App() {
  const [cart, setCart] = useState([]);
  const [newItem, setNewItem] = useState();
  const [inventoryItems, setInventoryItems] = useState(inventory);
  console.log("cart", cart);
  console.log("inventoryItems", inventoryItems);

  const addNewInventory = () => {
    const [name, quantity, price] = newItem.split(",");
    let obj = {
      id: inventoryItems?.length + 1,
      name,
      quantity: parseInt(quantity),
      price: parseInt(price),
    };
    setInventoryItems((prev) => [...prev, obj]);
    setNewItem("");
  };

  return (
    <>
      <div>Add new Inventory eg.Name,Price,stock</div>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder={"Enter here!"}
      />
      <button onClick={() => addNewInventory()}>Add Inventory</button>
      <h2>Cart</h2>
      {displayCartItems(cart, setCart, inventoryItems)}
      <h2>Inventories</h2>
      {displayInventoryItems(cart, setCart, inventoryItems)}
    </>
  );
}

const displayInventoryItems = (cart, setCart, inventoryItems) => {
  return (
    <>
      <ul>
        {inventoryItems.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>
            <button
              onClick={() => addToCart(item.id - 1, setCart, inventoryItems)}
            >
              Add to cart
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

const displayCartItems = (cart, setCart, inventoryItems) => {
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
                {item?.quantity} X {inventoryItems[item.id].name}
              </span>
            </div>
            <div>
              <button onClick={() => removeItem(item.id, setCart)}>-</button>
              <button
                onClick={() => addToCart(item.id, setCart, inventoryItems)}
                disabled={item.quantity >= inventoryItems[item.id].quantity}
              >
                +
              </button>
              <span>$ {inventoryItems[item.id].price}</span>
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
        <span>$ {calculateTotal(cart, inventoryItems)}</span>
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

const calculateTotal = (cart, inventoryItems) => {
  let total = 0;
  cart.forEach((element) => {
    total += element.quantity * inventoryItems[element.id].price;
  });

  return Math.abs(total);
};

const addToCart = (productId, setCart, inventoryItems) => {
  // console.log("stock", stock);
  console.log("productid", productId);
  const stock = inventoryItems[productId]?.quantity;
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
