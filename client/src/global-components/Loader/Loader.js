import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { Column } from "simple-flexbox";
import Lottie from "react-lottie";

const useStyles = createUseStyles({
  "@keyframes loadingSpin": {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
  },
  container: {
    backgroundColor: ({ theme, noTransparency, backgroundColor }) => {
      if (backgroundColor) {
        return noTransparency ? backgroundColor : `${backgroundColor}A0`;
      }
      return noTransparency
        ? theme.color.veryDarkGrayishBlue
        : `${theme.color.veryDarkGrayishBlue}A0`;
    },
    height: "100%",
    minHeight: ({ fullScreen }) => (fullScreen ? "100vh" : "100%"),
    width: ({ fullScreen }) => (fullScreen ? "100vw" : "100%"),
    position: ({ fullScreen }) => (fullScreen ? "fixed" : "relative"),
    top: 0,
    left: 0,
    zIndex: ({ zIndex }) => zIndex,
  },
  loading: {
    border: ({ theme }) => `16px solid ${theme.color.lightGrayishBlue}`,
    borderRadius: "50%",
    borderTop: ({ theme }) => `16px solid ${theme.color.brightBlue}`,
    width: 120,
    height: 120,
    animationName: "$loadingSpin",
    animationTimingFunction: "linear",
    animationDuration: "2s",
    animationIterationCount: "infinite",
  },
  loadingSpan: {
    color: "white",
    fontWeight: "bold",
    letterSpacing: 1,
    marginTop: 10,
    fontSize: 18,
  },
});

function LoadingComponent({
  backgroundColor,
  children,
  fullScreen,
  height,
  hideText,
  loading,
  noTransparency,
  width,
  zIndex,
}) {
  const theme = useTheme();
  const classes = useStyles({
    theme,
    fullScreen,
    noTransparency,
    backgroundColor,
    zIndex,
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: require("../../assets/images/loader.json"),
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div style={{ position: "relative", height, width }}>
      {loading && (
        <Column
          className={classes.container}
          horizontal="center"
          vertical="center"
        >
          {/* <div className={classes.loading}></div> */}
          <Lottie options={defaultOptions} height={250} width={250} />
          {!hideText && <span className={classes.loadingSpan}>LOADING..</span>}
        </Column>
      )}
      {children || <div />}
    </div>
  );
}

LoadingComponent.defaultProps = {
  fullScreen: true,
  zIndex: 10,
};

export default LoadingComponent;
