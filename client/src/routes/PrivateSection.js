import React, { useContext, useEffect } from "react";
import { createUseStyles, useTheme } from "react-jss";
import { Column, Row } from "simple-flexbox";
import SidebarComponent from "../global-components/Sidebar/Sidebar";
import HeaderComponent from "../global-components/Header/Header";
import PrivateRoutes from "./PrivateRoutes";
import { Context } from "../context/Context";
import { userAuth } from "../actions/actions";

const useStyles = createUseStyles({
  container: {
    height: "100%",
    minHeight: 850,
  },
  mainBlock: {
    marginLeft: 10,
    "@media (max-width: 1080px)": {
      marginLeft: 0,
    },
  },
  contentBlock: {
    marginTop: 0,
  },
});

function PrivateSection() {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    dispatch({
      type: "SET_USER",
      payload: JSON.parse(localStorage.getItem("TECH_USER_DATA")),
    });
  }, []);
  return (
    // <SidebarContext>
    <>
      <HeaderComponent />

      <Row>
        <Column flexGrow={1} className={classes.mainBlock}>
          <div>
            <PrivateRoutes />
          </div>
        </Column>
        {/* <SidebarComponent /> */}
      </Row>
    </>
    // </SidebarContext>
  );
}

export default PrivateSection;
