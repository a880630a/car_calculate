import React, { useState } from "react";
import { DatePicker } from "react-rainbow-components";

function DateRange(props) {
  const initialState = {
    range: undefined
  };
  const containerStyles = {
    maxWidth: 400
  };
  const [state, setState] = useState(initialState);

  const culDate = () => {
    if (state.range && state.range.length === 2) {
      const startDate = state.range[0];
      const endDate = state.range[1];
      const diffTime = Math.round(
        (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24,
        2
      );

      console.log("===>", startDate.getTime());
      console.log("===>", endDate.getTime());
      console.log("final===>", diffTime);
    }
  };

  return (
    <div
      className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto"
      style={containerStyles}
    >
      <DatePicker
        locale="zh"
        id="datePicker-15"
        label="日期選擇"
        placeholder="選擇日期範圍"
        selectionType="range"
        formatStyle="large"
        variant="single"
        value={state.range}
        onChange={(value) => setState({ range: value })}
      />
      {culDate()}
    </div>
  );
}
export default DateRange;
