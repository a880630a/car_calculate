import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function TypeSelect(props) {
  const { setCarType } = props;
  const carTypeSelect = (event) => {
    setCarType(event.target.value);
  };
  // console.log("car = >", carType);
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">車輛類型</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          value="bike"
          control={<Radio />}
          label="機車"
          onChange={carTypeSelect}
        />
        <FormControlLabel
          value="car"
          control={<Radio />}
          label="小客車"
          onChange={carTypeSelect}
        />
        <FormControlLabel
          value="bigCar"
          control={<Radio />}
          label="大客車"
          onChange={carTypeSelect}
        />
        <FormControlLabel
          value="truck"
          control={<Radio />}
          label="貨車"
          onChange={carTypeSelect}
        />
      </RadioGroup>
    </FormControl>
  );
}
