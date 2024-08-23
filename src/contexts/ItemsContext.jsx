import { createContext, useState } from "react";

export const ItemsContext = createContext();

export const Provider = ({ children }) => {
  const [items, setItems] = useState([]);

  const reset = () => setItems([]);

  const addItem = (item) => {
    const alreadyExists = items.some((i) => i.id === item.id);
    if (alreadyExists) {
      const updatedItems = items.map((i) =>
        i.id === item.id
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      );
      setItems(updatedItems);
    } else {
      setItems((prev) => [...prev, item]);
    }
  };

  const removeItem = (id) => {
    const updatedItems = items.filter((i) => i.id !== id);
    setItems(updatedItems);
  };

  const TotalProductos = () => {
    return items.reduce((accum, product) => accum + product.quantity, 0);
  };

  return (
    <ItemsContext.Provider value={{ addItem, items, reset, removeItem, TotalProductos }}>
      {children}
    </ItemsContext.Provider>
  );
};
