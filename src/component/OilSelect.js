import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function OilSelect(prpos) {
  const { setOil, carType } = prpos;
  const OilTypeSelect = (event) => {
    setOil(event.target.value);
  };
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">汽油/柴油</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          value="gas"
          control={<Radio />}
          label="汽油"
          onChange={OilTypeSelect}
          disabled={carType === "bike" ? true : false}
        />
        <FormControlLabel
          value="diesel"
          control={<Radio />}
          label="柴油"
          onChange={OilTypeSelect}
          disabled={carType === "bike" ? true : false}
        />
      </RadioGroup>
    </FormControl>
  );
}
