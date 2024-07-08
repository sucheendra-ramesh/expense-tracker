import { Tabs, Tab, Box } from "@mui/material";
import React, { useState } from "react";
import RevenueExpenseComponent from "../molecules/RevenueExpenseMolecule.tsx";

type Props = {};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CustomTabs = (props: Props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Custom tabs "
          centered
        >
          <Tab label="Revenue" {...a11yProps(0)} />
          <Tab label="Expense" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <RevenueExpenseComponent type="revenue" />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <RevenueExpenseComponent type="expense" />
      </CustomTabPanel>
    </>
  );
};

export default CustomTabs;
