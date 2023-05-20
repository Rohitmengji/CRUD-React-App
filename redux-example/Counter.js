import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "./counterSlice";

function Counter() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div className='mt-2 border container text-center '>
      <h1>Count : {counter}</h1>
          <button
              onClick={() => dispatch(increment())}
          >
              increment</button>
      <button onClick={() => dispatch(decrement())} className='mx-2'>
        decrement
      </button>
      <button onClick={() => dispatch(reset())} className='mx-2'>
        Reset
      </button>
    </div>
  );
}

export default Counter;
