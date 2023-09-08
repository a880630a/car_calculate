import React, { useState } from "react";
import { DatePicker } from "react-rainbow-components";

function DateSelect(props) {
  const { setDiffDay } = props;
  const initialState = { date: new Date() };
  const [state, setState] = useState(initialState);
  const containerStyles = {
    maxWidth: 300
  };
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // 月份從 0 開始，因此要加 1
  const day = today.getDate();

  const finalDay = new Date(year, 12 - 1, 31);
  // const testDay = new Date(2023, 12, 30, 12);

  const culDiffDay = () => {
    // const diff = Math.round(
    //   (finalDay.getTime() - state.date.getTime()) / 1000 / 60 / 60 / 24,
    //   2
    // );
    setDiffDay(
      Math.round(
        (finalDay.getTime() - state.date.getTime()) / 1000 / 60 / 60 / 24,
        2
      )+1
    );
  };

  return (
    <div
      className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto"
      style={containerStyles}
    >
      <DatePicker
        locale="zh"
        value={state.date}
        minDate={new Date(year, month - 1, day - 1)}
        maxDate={new Date(year + 1, 0, 0)}
        label="輸入日期"
        onChange={(value) => setState({ date: value })}
        // value={totalDay}
      />
      {culDiffDay()}
    </div>
  );
}
export default DateSelect;
