import React, { useState, useContext } from "react";
import { Context } from "../../context/Context";
import "./EditComponent.css";
import { Row, Column } from "simple-flexbox";
import uuid from "react-uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";

const EditComponent = () => {
  const [state, dispatch] = useContext(Context);

  const handleChange = (e, editKey, componentClass = "") => {
    dispatch({
      type: "UPDATE_COMPONENT_DATA",
      payload: {
        data: state.componentsList[state.selectedComponentIndex],
        editKey: editKey,
        componentClass: componentClass,
        key: e.target.name,
        value:
          componentClass !== "" ? parseFloat(e.target.value) : e.target.value,
      },
    });
  };

  const addTable = () => {
    const dummyState = state;
    const selectedComponent =
      dummyState.componentsList[dummyState.selectedComponentIndex];
    selectedComponent.content.components.push({
      type: "table",
      id: uuid(),
      columns: [
        {
          name: "Title",
          selector: "title",
          sortable: true,
        },
        {
          name: "Year",
          selector: "year",
          sortable: true,
          right: true,
        },
      ],
      data: [
        { id: 1, title: "Conan the Barbarian", year: "1982" },
        { id: 1, title: "Conan the Barbarian", year: "1982" },
      ],
      styles: {
        table: {
          width: "100%",
          fontFamily: "Poppins",
          border: "1px solid #EEEEEE",
          borderCollapse: "collapse",
        },
        tableHeader: {
          display: "flex",
          width: "100%",
          color: "#fff",
          backgroundColor: "#2c3e50",
        },
        tableRow: {
          display: "flex",
          width: "100%",
        },
        tableCell: {
          width: 100,
        },
      },
    });

    dispatch({
      type: "SET_COMPONENTS_LIST",
      payload: dummyState.componentsList,
    });

    console.log(dummyState);
  };

  return (
    <div className="editcomponent">
      {state.componentsList[state.selectedComponentIndex] !== undefined ? (
        <>
          <label>Title </label>
          <input
            type="text"
            className="editcomponent__input"
            onChange={(e) => handleChange(e, "content")}
            name="title"
            defaultValue={
              state.componentsList[state.selectedComponentIndex].content.title
            }
          />
          <div className="editcomponent__seperator"></div>
          <label className="editcomponent__uppercaseText">Dimensions </label>
          <Row style={{ marginTop: 10 }}>
            <Column flexGrow={5} style={{ marginRight: 20 }}>
              <label>Height </label>
              <input
                type="text"
                onChange={(e) => handleChange(e, "styles", "card")}
                style={{ width: "100%" }}
                className="editcomponent__input"
                name="height"
                defaultValue={
                  state.componentsList[state.selectedComponentIndex].styles.card
                    .height
                }
              />
            </Column>
            <Column flexGrow={5}>
              <label>Width </label>
              <input
                type="text"
                style={{ width: "100%" }}
                onChange={(e) => handleChange(e, "styles", "card")}
                className="editcomponent__input"
                name="width"
                defaultValue={
                  state.componentsList[state.selectedComponentIndex].styles.card
                    .width
                }
              />
            </Column>
          </Row>
          <div className="editcomponent__seperator"></div>
          <label className="editcomponent__uppercaseText">CONTENT</label>
          <Row>
            <Column>
              <button className="editcomponent__iconButton" onClick={addTable}>
                <FontAwesomeIcon icon={faTable} />
              </button>
            </Column>
            <Column></Column>
          </Row>
        </>
      ) : null}
    </div>
  );
};

export default EditComponent;
