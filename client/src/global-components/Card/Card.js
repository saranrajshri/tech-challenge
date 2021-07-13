import React, { useContext, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { Context } from "../../context/Context";

const Card = ({ customStyles, content, id }) => {
  const [state] = useContext(Context);

  const renderComponent = (component, index) => {
    var newComponent;
    if (component.type === "table") {
      newComponent = (
        <table id={index}>
          {component.headers.map((header, headerIndex) => {
            return <th index={headerIndex}>{header}</th>;
          })}
          
          var size = component.content.length;
          for(var i = 0; i < size; i++) {

          }
          {component.content.map((tableRow, tableRowIndex) => {
            return <tr index={tableRowIndex}>{tableRow}</tr>;
          })}
        </table>
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
