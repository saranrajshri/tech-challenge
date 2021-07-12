import React, { useReducer, createContext } from "react";
export const Context = createContext();

// Global State
const initialState = {
  isLoaderVisible: false,
  componentsList: [],
  selectedComponentIndex: -1,
};

// Reducers
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_COMPONENTS_LIST":
      return { ...state, componentsList: action.payload };
    case "SET_SELECTED_COMPONENT_LIST":
      return { ...state, selectedComponentIndex: action.payload };
    case "UPDATE_COMPONENT_DATA":
      const componentIdToFind = action.payload.data.id;
      state.componentsList[state.selectedComponentIndex].content[
        action.payload.key
      ] = action.payload.value;
      return {
        ...state,
      };
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
