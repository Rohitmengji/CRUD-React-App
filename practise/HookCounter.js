import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);
    
    const handleIncrement = () => {
        setCount((prevState) => prevState + 1)
    }
    const handleDecrement = () => {
        setCount((prevState) => prevState - 1)
    }

  return (
    <>
      <h1>count : {count}</h1>
      <button onClick={handleIncrement}>increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </>
  );
}

export default Counter;
