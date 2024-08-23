import { useState } from "react"

export const ItemCount= ( {stock, onAdd}) => {
    const [count, setCount] = useState(1)
    
    const handelIncrease = () => {
        if (count < stock){
            setCount((prev) => prev+1)
        }
    };
    const handelDecrease = () => {
        if (count > 1){
            setCount((prev) => prev-1)
        }
    };

    const handleAdd= () =>{
        onAdd(count);
        setCount(1);
    };

    return(
    <>
    <button className="btn btn-primary my-5" onClick={handelDecrease}>-</button>
    <span>{count}</span>
    <button className="btn btn-primary my-5" onClick={handelIncrease}>+</button>
    <hr />
    <button className="btn btn-primary my-5" onClick={handleAdd}>Agregar al carrito</button>
    </>)
}