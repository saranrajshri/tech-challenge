import React, { useReducer, createContext } from "react";
export const Context = createContext();

// Global State
const initialState = {
  isLoaderVisible: false,
  componentsList: [],
  selectedComponentIndex: -1,
  reRenderCanvas: false,
  variables: [],
  user: {},
};

// Reducers
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_COMPONENTS_LIST":
      return { ...state, componentsList: action.payload };
    case "SET_SELECTED_COMPONENT_LIST":
      return { ...state, selectedComponentIndex: action.payload };
    case "UPDATE_COMPONENT_DATA":
      const componentIdToFind = action.payload.data.id;
      if (action.payload.componentClass === "") {
        state.componentsList[state.selectedComponentIndex][
          action.payload.editKey
        ][action.payload.key] = action.payload.value;
      } else {
        state.componentsList[state.selectedComponentIndex][
          action.payload.editKey
        ][action.payload.componentClass][action.payload.key] =
          action.payload.value;
      }
      return {
        ...state,
      };
    case "UPDATE_GRAPH":
      if (action.payload.operation === "changeTitle") {
        state.componentsList[
          state.selectedComponentIndex
        ].data.options.title.text = action.payload.data.title;
      } else if (action.payload.operation === "changeData") {
        state.componentsList[state.selectedComponentIndex].data = JSON.parse(
          action.payload.data
        );
      }
      return { ...state };

    case "SAVE_VARIABLES":
      return {
        ...state,
        variables: action.payload,
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
