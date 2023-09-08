import React, { useState } from "react";
import { Select } from "react-rainbow-components";

function CarType(props) {
  const { setCarCCNum } = props;
  const containerStyle = {
    maxWidth: 400
  };
  //牌照稅
  const CCNum_card = [
    "151~250",
    "251~500",
    "501~600",
    "601~1200",
    "1201~1800",
    "1801~2400",
    "2401~3000",
    "3001~4200",
    "4201~5400",
    "5401~6600",
    "6601~7800",
    "7801以上"
  ];

  //燃料稅
  const CCNum_fire = [
    "50以下",
    "51~125",
    "126~250",
    "251~500",
    "501~600",
    "601~1200",
    "1201~1800",
    "1801~2400",
    "2401~3000",
    "3001~3600",
    "3601~4200",
    "4201~4800",
    "4801~5400",
    "5401~6000",
    "6001~6600",
    "6601~7200",
    "7201~8000"
  ];

  const optionsCCNum = [
    { value: 0, label: "50以下" },
    { value: 1, label: "51~125" },
    { value: 2, label: "126~250" },
    { value: 3, label: "251~500" },
    { value: 4, label: "501~600" },
    { value: 5, label: "601~1200" },
    { value: 6, label: "1201~1800" },
    { value: 7, label: "1801~2400" },
    { value: 8, label: "2401~3000" },
    { value: 9, label: "3001~3600" },
    { value: 10, label: "3601~4200" },
    { value: 11, label: "4201~4800" },
    { value: 12, label: "4801~5400" },
    { value: 13, label: "5401~6000" },
    { value: 14, label: "6001~6600" },
    { value: 15, label: "6601~7200" },
    { value: 16, label: "7201~8000" }
  ];
  const selectOptionChange = (event) => {
    setCarCCNum(event.target.value);
  };
  // console.log("asd=>", optionsValue);
  return (
    <Select
      label="選擇 c.c.數"
      options={optionsCCNum}
      id="example-select"
      style={containerStyle}
      className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
      onChange={selectOptionChange}
    />
  );
}
export default CarType;
