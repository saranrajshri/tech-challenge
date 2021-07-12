import React from "react";
import "./Sidebar.css";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditComponent from "./EditComponent";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <center>
          <FontAwesomeIcon icon={faLayerGroup} className="icon" />
          Components
        </center>
      </div>
      <div className="sidebar__content" style={{ padding: 10 }}>
        <EditComponent />
      </div>
    </div>
  );
};
export default Sidebar;
