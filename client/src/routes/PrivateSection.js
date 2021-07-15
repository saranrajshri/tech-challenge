import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { Column, Row } from "simple-flexbox";
import SidebarComponent from "../global-components/Sidebar/Sidebar";
import HeaderComponent from "../global-components/Header/Header";
import PrivateRoutes from "./PrivateRoutes";

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
