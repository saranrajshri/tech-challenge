import React, { useState, useContext } from "react";
import "./Header.css";
import { Row, Column } from "simple-flexbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faPlay,
  faShare,
  faToolbox,
  faTools,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../context/Context";
import ShareModal from "../ShareModal/ShareModal";

const Header = () => {
  const [state] = useContext(Context);
  const [shareModal, setShareModal] = useState(false);

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
            <button
              className="header__button"
              onClick={() => {
                setShareModal(true);
              }}
            >
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
            <FontAwesomeIcon icon={faUser} className="icon header__userIcon" />{" "}
            <span
              style={{
                marginTop: 4,
                marginLeft: 2,
                marginRight: 20,
                color: "#34495e",
                fontFamily: "Poppins",
              }}
            >
              {state.user.name}
            </span>
          </Row>
        </Column>
      </Row>
      <ShareModal
        open={shareModal}
        handleClose={() => {
          setShareModal(false);
        }}
      />
    </div>
  );
};

export default Header;
