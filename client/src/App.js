import React from "react";
import { HashRouter } from "react-router-dom";
import Routes from "./routes";
import { ThemeProvider } from "react-jss";
import Theme from "./resources/theme";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
        <HashRouter basename="/">
          <Routes />
        </HashRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
