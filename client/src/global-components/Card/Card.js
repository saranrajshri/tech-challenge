import React, { useContext, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { Context } from "../../context/Context";

const Card = ({ customStyles, content, id }) => {
  const [state] = useContext(Context);
  return (
    <Draggable>
      <div
        style={{
          ...customStyles.card,
          border:
            state.selectedComponentIndex !== -1
              ? state.componentsList[state.selectedComponentIndex].id === id
                ? "1px solid #7f8c8d"
                : customStyles.card.border
              : customStyles.card.border,
        }}
      >
        <div style={customStyles.cardHeader}>{content.title}</div>
        <div style={customStyles.cardContent}>{content.text}</div>
      </div>
    </Draggable>
  );
};

export default Card;
