import React, { useState, useContext } from "react";
import { Context } from "../../context/Context";
import "./EditComponent.css";

const EditComponent = () => {
  const [state, dispatch] = useContext(Context);

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_COMPONENT_DATA",
      payload: {
        data: state.componentsList[state.selectedComponentIndex],
        key: e.target.name,
        value: e.target.value,
      },
    });
  };

  return (
    <div className="editcomponent">
      {state.componentsList[state.selectedComponentIndex] !== undefined ? (
        <>
          <label>Title </label>
          <input
            type="text"
            className="editcomponent__input"
            onChange={handleChange}
            name="title"
            defaultValue={
              state.componentsList[state.selectedComponentIndex].content.title
            }
          />
        </>
      ) : null}
    </div>
  );
};

export default EditComponent;
