import React, { useEffect, useState } from "react";
import { getDataFromLocalStorage } from "../services/data-update-service.tsx";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  createFilterOptions,
} from "@mui/material";
import { RevenueExpenseType } from "../../types/RevenueExpenseTypes.tsx";
import { Icon } from "@iconify-icon/react";
import { RevenueExpenseCategoryType } from "../../types/RevenueExpenseCategoryType.tsx";
import slugify from "react-slugify";
import { filter } from "lodash";
import moment from "moment";

type Props = {
  type: string;
};

const INIT_STATE = {
  amount: 0,
  category: { slug: "", title: "", icon: "" },
  type: "",
  date_time: "",
  description: "",
};

const RevenueExpenseComponent = (props: Props) => {
  const { type } = props;
  const [data, setData] = useState<RevenueExpenseType>(INIT_STATE);
  const customFilter = createFilterOptions<any>();
  const [options, setOptions] = useState<RevenueExpenseCategoryType[]>([
    {
      slug: "medicines",
      title: "Medicines",
      icon: "game-icons:medicines",
    },
    {
      slug: "investments",
      title: "Investments",
      icon: "streamline:investment-selection",
    },
  ]);

  useEffect(() => {
    if (getDataFromLocalStorage()) {
      // setData(JSON.parse(getDataFromLocalStorage() || "{}"));
    }
    setData((prev: RevenueExpenseType) => {
      return { ...prev, type: type };
    });
  }, []);

  return (
    <>
      <Box m={1} p={3}>
        <Box my={2}>
          <TextField
            type="number"
            inputProps={{
              inputMode: "numeric",
              pattern: "/^-?d+(?:.d+)?$/g",
            }}
            value={data.amount}
            onChange={(e) => {
              console.log(e.target.value);
              if (!e.target.value) return;

              setData((prev: RevenueExpenseType) => {
                return { ...prev, amount: +e.target.value };
              });
            }}
            placeholder="Amount"
            fullWidth
            variant="outlined"
          />
        </Box>
        <Box my={1}>
          <Grid container alignItems={"center"}>
            <Grid item sm={11}>
              <Autocomplete
                fullWidth
                value={data.category}
                onChange={(event, newValue: any) => {
                  if (!newValue) return;
                  if (newValue && newValue.inputValue) {
                    let obj: RevenueExpenseCategoryType = {
                      icon: "material-symbols-light:broken-image-outline-rounded",
                      slug: slugify(newValue.inputValue),
                      title: newValue.inputValue,
                    };

                    let _opts = [...options];
                    let existingOpts = filter(_opts, (value, key) => {
                      return value["slug"] === obj["slug"];
                    });
                    if (existingOpts.length > 0) {
                      setData((prev: RevenueExpenseType) => {
                        return { ...prev, category: existingOpts[0] };
                      });
                    } else {
                      _opts.push(obj);
                      setOptions(_opts);
                      setData((prev: RevenueExpenseType) => {
                        return { ...prev, category: obj };
                      });
                    }
                  } else {
                    setData((prev: RevenueExpenseType) => {
                      return {
                        ...prev,
                        category: newValue || { slug: "", title: "", icon: "" },
                      };
                    });
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = customFilter(options, params);

                  if (params.inputValue !== "") {
                    filtered.push({
                      inputValue: params.inputValue,
                      title: `Add "${params.inputValue}"`,
                    });
                  }

                  return filtered;
                }}
                id="Category"
                options={options}
                getOptionLabel={(option) => {
                  // for example value selected with enter, right from the input
                  if (typeof option === "string") {
                    return option;
                  }
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  return option.title;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => {
                  const { key, ...optionProps } = props;
                  return (
                    <li key={key} {...optionProps}>
                      {option.title}
                    </li>
                  );
                }}
                // sx={{ width: 300 }}
                freeSolo
                renderInput={(params) => (
                  <TextField {...params} label="Category" />
                )}
              />
            </Grid>
            <Grid item sm={1}>
              <Box sx={{ height: 40, width: 40, ml: 0.5, color: "#c2c2c3" }}>
                <Icon
                  icon={
                    data.category.icon ||
                    "material-symbols-light:broken-image-outline-rounded"
                  }
                  height="100%"
                  width="100%"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box my={1.5}>
          <TextField
            inputProps={{
              maxLength: 200,
            }}
            onChange={(e) => {
              setData((prev: RevenueExpenseType) => {
                return { ...prev, description: e.target?.value || "" };
              });
            }}
            placeholder="Description (Max 200 chars)"
            multiline
            rows={4}
            fullWidth
          ></TextField>
        </Box>
        <Box my={1.5}>
          <Button
            onClick={() => {
              setData((prev: RevenueExpenseType) => {
                return { ...prev, date_time: moment().format("YYYY-MM-DD") };
              });
            }}
            variant="outlined"
            fullWidth
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default RevenueExpenseComponent;
