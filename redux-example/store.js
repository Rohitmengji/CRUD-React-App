import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'

const store = configureStore({
    reducer: {
    counter : counterReducer,
    }
})

export default store;


// render in the app component
// import React from "react";

// import Counter from "./redux-example/Counter";
// import { Provider } from "react-redux";
// import store from "./redux-example/store";

// const App = () => {
//   return (
//     <div>
//       <Provider store={store}>
//         <Counter />
//       </Provider>
//     </div>
//   );
// };

// export default App;
