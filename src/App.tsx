import "./App.css";
import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";
import CustomTabs from "./components/complexes/CustomTabsComponent.tsx";

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Expense Tracker
          </Typography>

          <div className="centered">
            <CustomTabs />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default App;
