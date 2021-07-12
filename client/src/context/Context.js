import React, { useReducer, createContext } from "react";
export const Context = createContext();

// Global State
const initialState = {
  isLoaderVisible: false,
};

// Reducers
const reducer = (state, action) => {
  switch (action.type) {
    default:
      throw new Error();
  }
};

// Context Provider
export const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  );
};
