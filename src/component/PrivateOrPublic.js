import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function PrivateOrPublic(prpos) {
  const { setPOP, carType } = prpos;
  const carPOPSelect = (event) => {
    setPOP(event.target.value);
  };
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">自用/營業用</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          value="private"
          control={<Radio />}
          label="自用"
          onChange={carPOPSelect}
          disabled={carType === "bike" ? true : false}
        />
        <FormControlLabel
          value="public"
          control={<Radio />}
          label="營業用"
          onChange={carPOPSelect}
          disabled={carType === "bike" ? true : false}
        />
      </RadioGroup>
    </FormControl>
  );
}
