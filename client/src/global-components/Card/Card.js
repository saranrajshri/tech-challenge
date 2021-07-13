import React, { useContext, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { Context } from "../../context/Context";
import DataTable from "react-data-table-component";

const Card = ({ customStyles, content, id }) => {
  const [state] = useContext(Context);

  const renderComponent = (component, index) => {
    var newComponent;
    if (component.type === "table") {
      console.log(component.columns);
      newComponent = (
        <DataTable title="" columns={component.columns} data={component.data} />
      );
    }
    return newComponent;
  };

  return (
    <Draggable>
      <div
        style={{
          ...customStyles.card,
          border:
            state.selectedComponentIndex !== -1
              ? state.componentsList[state.selectedComponentIndex].id === id
                ? "2px solid #cecece"
                : customStyles.card.border
              : customStyles.card.border,
        }}
      >
        <div style={customStyles.cardHeader}>{content.title}</div>
        <div style={customStyles.cardContent}>
          {content.components.map((component, index) => {
            return renderComponent(component, index);
          })}
        </div>
      </div>
    </Draggable>
  );
};

export default Card;
