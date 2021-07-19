import React from "react";
import "./ShareModal.css";
import { Row, Column } from "simple-flexbox";
import { XCircle } from "react-feather";

const ShareModal = ({ open, handleClose }) => {
  const handleChange = () => {};

  const handleSubmit = () => {
    alert("Canvas Shared");
    handleClose();
  };

  if (open) {
    return (
      <div className="modal">
        <div className="modal__container" style={{ marginTop: 100 }}>
          <div className="modal__header">
            <Row>
              <Column flexGrow={11} vertical="center">
                <h2>Share canvas</h2>
              </Column>
              <Column flexGrow={1} vertical="center" horizontal="end">
                <XCircle className="modal__closeButton" onClick={handleClose} />
              </Column>
            </Row>
          </div>
          <div className="modal__content">
            <Row>
              <Column flexGrow={6} style={{ marginRight: 10 }}>
                <input
                  type="text"
                  onChange={handleChange}
                  name="email"
                  placeholder="Enter email"
                  className="shareModal__input"
                />
              </Column>
              <Column flexGrow={3} style={{ marginRight: 10 }}>
                <select className="shareModal__input">
                  <option>Viewer</option>
                  <option>Editor</option>
                </select>
              </Column>
              <Column flexGrow={3} style={{ marginRight: 10 }}>
                <button className="shareModal__button" onClick={handleSubmit}>
                  Share
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

export default ShareModal;
