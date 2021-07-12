import React from "react";
import "./Header.css";
import { Row, Column } from "simple-flexbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faPlay,
  faShare,
  faToolbox,
  faTools,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className="header">
      <Row>
        <Column flexGrow={3}>
          <span className="header__title">
            <FontAwesomeIcon icon={faTools} className="icon" />
            re-tool
          </span>
        </Column>
        <Column flexGrow={6}></Column>
        <Column flexGrow={3} horizontal="end">
          <Row className="header__rightButtonRow">
            <button className="header__button">
              <FontAwesomeIcon
                icon={faShare}
                className="icon"
                style={{ fontSize: 12 }}
              />{" "}
              Share
            </button>
            <button className="header__button">
              <FontAwesomeIcon
                icon={faPlay}
                className="icon"
                style={{ fontSize: 10 }}
              />{" "}
              Preview
            </button>
          </Row>
        </Column>
      </Row>
    </div>
  );
};

export default Header;
