import React, { useContext, useState } from "react";
import "./Modal.css";
import { Row, Column } from "simple-flexbox";
import { XCircle } from "react-feather";
import axios from "axios";
import { Context } from "../../context/Context";

const Modal = ({ open, handleClose }) => {
  const [state, dispatch] = useContext(Context);
  const [formData, setFormData] = useState({
    responseData: {},
  });
  const handleSubmit = async () => {
    if (formData.type === "get") {
      try {
        const doRequest = await axios.get(formData.url);
        setFormData({ ...formData, responseData: doRequest.data });
      } catch (err) {}
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveVariable = () => {
    const oldVariables = state.variables;
    oldVariables.push({ name: formData.variable, data: formData.responseData });

    dispatch({ type: "SAVE_VARIABLES", payload: oldVariables });
  };
  if (open) {
    return (
      <div className="modal">
        <div className="modal__container">
          <div className="modal__header">
            <Row>
              <Column flexGrow={11} vertical="center">
                <h2>Fetch Data from API</h2>
              </Column>
              <Column flexGrow={1} vertical="center" horizontal="end">
                <XCircle className="modal__closeButton" onClick={handleClose} />
              </Column>
            </Row>
          </div>
          <div className="modal__content">
            <Row>
              <Column flexGrow={1} style={{ marginRight: 10 }}>
                <label className="modal__label">TYPE</label>
                <input
                  className="modal__input"
                  name="type"
                  onChange={handleChange}
                ></input>
              </Column>
              <Column flexGrow={10} style={{ marginRight: 10 }}>
                <label className="modal__label">URL</label>
                <input
                  className="modal__input"
                  name="url"
                  onChange={handleChange}
                ></input>
              </Column>
              <Column flexGrow={1} vertical="center">
                <button className="modal__footerButton" onClick={handleSubmit}>
                  <span>Send Request</span>
                </button>
              </Column>
            </Row>

            <label className="modal__label">RESPONSE</label>
            <textarea
              rows={10}
              className="modal__input"
              style={{ width: "100%" }}
              name="responseData"
              onChange={handleChange}
              value={JSON.stringify(formData.responseData, undefined, 4)}
            ></textarea>
            <Row>
              <Column flexGrow={10} style={{ marginRight: 10 }}>
                <label className="modal__label">
                  SAVE RESPONSE TO A VARIABLE :{" "}
                </label>
                <input
                  type="text"
                  className="modal__input"
                  onChange={handleChange}
                  name="variable"
                />
              </Column>

              <Column flexGrow={1} vertical="center">
                <button
                  className="modal__footerButton"
                  onClick={handleSaveVariable}
                >
                  <span>Save</span>
                </button>
              </Column>
            </Row>
          </div>
          <div className="modal__footer"></div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Modal;
