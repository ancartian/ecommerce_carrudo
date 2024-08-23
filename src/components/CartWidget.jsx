// import { Link } from "react-router-dom";
// import cart from "../assets/cart.png";
// import { ItemsContext } from "../contexts/ItemsContext";

// export const CartWidget = () => (
//   <Link to="/cart">
//     <img src={cart} height={50}/> 
//     <span>5</span> 
//   </Link>
// );

import { useContext } from "react";
import { Link } from "react-router-dom";
import cart from "../assets/cart.png";
import { ItemsContext } from "../contexts/ItemsContext";

export const CartWidget = () => {
  const { items } = useContext(ItemsContext);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link to="/cart" style={{ display: 'flex', alignItems: 'center' }}>
      <img src={cart} alt="Cart" height={50} />
      {totalItems > 0 && (
        <span style={{ marginLeft: '8px', fontWeight: 'bold', color: "white" }}>{totalItems}</span>
      )}
    </Link>
  );
};
