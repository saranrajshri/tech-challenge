import React, { useContext, useState } from "react";
import Card from "../../global-components/Card/Card";
import "./DashBoard.css";
import uuid from "react-uuid";
import { Context } from "../../context/Context";

const DashBoard = () => {
  const [state, dispatch] = useContext(Context);
  const [componentsList, setComponentsList] = useState(state.componentsList);

  // Force Update hook
  const useForceUpdate = () => {
    const [value, setValue] = useState(0);
    return () => setValue((value) => value + 1);
  };
  const forceUpdate = useForceUpdate();

  // Handle Each component click
  const handleClick = () => {
    setComponentsList([
      ...componentsList,
      {
        id: uuid(),
        type: "card",
        styles: {
          card: {
            backgroundColor: "#fff",
            margin: 10,
            border: "1px solid #cecece",
            width: 400,
            position: "absolute",
            userSelect: "none",
          },
          cardHeader: {
            backgroundColor: "#fdfdfd",
            borderBottom: "1px solid #e4e4e4",
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 10,
            paddingTop: 10,
            fontFamily: "Poppins",
            color: "#34495e",
          },
          cardContent: {
            padding: 20,
          },
        },
        content: {
          title: "CARD TITLE",
          text: "fgjs",
          components: [],
        },
      },
    ]);
  };

  const handleComponentClick = (componentId) => {
    var selectedComponentIndex = 0;

    for (var i = 0; i < componentsList.length; i++) {
      if (componentsList[i].id === componentId) {
        selectedComponentIndex = i;
        break;
      }
    }

    const dummyComponentList = componentsList;
    const selectedComponent = dummyComponentList[selectedComponentIndex];
    selectedComponent.styles.card = {
      ...selectedComponent.styles.card,
    };
    selectedComponent.content.text = "fsgkhsfigh";

    setComponentsList(dummyComponentList);

    // update the components list in the global state
    dispatch({
      type: "SET_SELECTED_COMPONENT_LIST",
      payload: selectedComponentIndex,
    });
    dispatch({ type: "SET_COMPONENTS_LIST", payload: dummyComponentList });

    // re render the page
    forceUpdate();
  };

  return (
    <div>
      <button onClick={handleClick}>create</button>
      {componentsList.map((component) => {
        if (component.type === "card") {
          return (
            <div
              onDoubleClick={() => {
                handleComponentClick(component.id);
              }}
            >
              <Card
                id={component.id}
                customStyles={component.styles}
                content={component.content}
              />
            </div>
          );
        }
      })}
    </div>
  );
};

export default DashBoard;
