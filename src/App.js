import "./styles.css";
import logo from "./img/4.jpg";
import carImage from "./img/car.jpg";
import bikeImage from "./img/bike.jpg";
import truckImage from "./img/truck.jpg";
import bigCarImage from "./img/bigCar.jpg";
import "./mainUI.scss";
// import DateRange from "./component/DateRange";
// import BasicTable from "./component/BasicTable";
import DateSelect from "./component/DateSelect";
import CarCC from "./component/CarCC";
import TypeSelect from "./component/TypeSelect";
import PrivateOrPublic from "./component/PrivateOrPublic";
import { useState, useEffect } from "react";
import OilSelect from "./component/OilSelect";

export default function App() {
  const [diffDay, setDiffDay] = useState(0);
  const [carCCNum, setCarCCNum] = useState(0);
  const [carType, setCarType] = useState("");
  const [POP, setPOP] = useState(""); // 自用或營業用
  const [oil, setOil] = useState(""); //汽油或柴油 gas or diesel
  const [tax, setTax] = useState(0);
  const [result, setResult] = useState(0);
  const [cursorClicked, setCursorClicked] = useState(false); // 是否點擊了cursor
  const [circleX, setCircleX] = useState(0);
  const [circleY, setCircleY] = useState(0);
  let GAS_PRI = 0;
  let GAS_PUB = 1;
  let DIESEL_PRI = 2;
  let DIESEL_PUB = 3;

  const totalTaxCar = [
    [
      0, 0, 1620, 3780, 5040, 8640, 11920, 17410, 22410, 36860, 38030, 57390,
      58350, 82770, 83640, 131910, 166920,
    ],
    [
      0, 0, 900, 900, 2700, 4320, 5460, 9563, 13500, 16380, 16380, 24300, 24300,
      33660, 33660, 44460, 56700,
    ],
    [
      0, 0, 1620, 2916, 3888, 6912, 10000, 14938, 19530, 33404, 34106, 52902,
      53478, 77538, 78060, 125946, 160632,
    ],
    [
      0, 0, 900, 900, 2124, 3456, 4500, 8330, 12060, 16380, 16380, 24300, 24300,
      33660, 33660, 44460, 56700,
    ],
  ]; // tax about 汽車 自用
  const totalTaxBigCar = [
    0, 0, 1620, 3780, 5040, 8640, 11920, 17410, 22410, 36860, 38030, 57390,
    58350, 82770, 83640, 131910, 166920,
  ]; // tax about 汽車 自用
  const totalTaxBike = [
    300, 450, 1400, 2520, 3360, 6120, 9130, 11230, 11230, 11230, 11230, 11230,
    11230, 11230, 11230, 11230, 11230,
  ]; // tax about 汽車 自用

  // console.log("test2 =>", carCCNum);
  const checkCCNum = () => {
    if (carType === "car") {
      if (POP === "private") {
        if (oil === "gas") {
          setTax(totalTaxCar[GAS_PRI][carCCNum]);
        } else {
          setTax(totalTaxCar[DIESEL_PRI][carCCNum]);
        }
      } else {
        if (oil === "gas") {
          setTax(totalTaxCar[GAS_PUB][carCCNum]);
        } else {
          setTax(totalTaxCar[DIESEL_PUB][carCCNum]);
        }
      }
    } else if (carType === "bigCar") {
      if (POP === "private") {
        if (oil === "gas") {
          setTax(totalTaxCar[GAS_PRI][carCCNum]);
        } else {
          setTax(totalTaxCar[DIESEL_PRI][carCCNum]);
        }
      } else {
        if (oil === "gas") {
          setTax(totalTaxCar[GAS_PUB][carCCNum]);
        } else {
          setTax(totalTaxCar[DIESEL_PUB][carCCNum]);
        }
      }
    } else if (carType === "bike") {
      setTax(totalTaxBike[carCCNum]);
    }
  };

  const cursorClick = (event) => {
    setCursorClicked(true);
    console.log("cursorClickX =>", event.clientX);
    console.log("cursorClickY =>", event.clientY);
    setCircleX(event.clientX);
    setCircleY(event.clientY);
    return () => {
      <div
        style={{
          position: "absolute",
          top: event.clientY,
          left: event.clientX,
          borderRadius: "50%",
          backgroundColor: "red",
          width: "20px",
          height: "20px",
        }}
      ></div>;
    };
  };

  useEffect(() => {
    setResult(Math.round((tax / 365) * diffDay), 1);
    const cursorDetect = setInterval(() => {
      setCursorClicked(false);
    }, 200);
    return () => {
      clearInterval(cursorDetect);
    };
  }, [tax, diffDay, cursorClicked]);
  const executeCal = () => {
    checkCCNum();
  };

  return (
    <div className="App">
      <div
        // className={`main-page ${cursorClicked === true ? "cursor-click" : ""}`}
        className="main-page"
        onClick={cursorClick}
        style={{
          backgroundImage: `url(${
            carType === "car"
              ? carImage
              : carType === "bike"
              ? bikeImage
              : carType === "truck"
              ? truckImage
              : carType === "bigCar"
              ? bigCarImage
              : logo
          })`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPositionY: "30%",
        }}
      >
        {cursorClicked === true && (
          <div
            className="cursor-click-animated"
            style={{
              position: "absolute",
              top: circleY - 5,
              left: circleX - 6,
              borderRadius: "50%",
              backgroundColor: "red",
              width: "13px",
              height: "13px",
              zIndex: "9999",
            }}
          ></div>
        )}

        <div className="data-area">
          <p>燃料稅與牌照稅計算</p>
          <div className="result">金額：{result}</div>
          <div className="date-data">
            <DateSelect setDiffDay={setDiffDay} />
          </div>

          <div className="CC-data">
            <CarCC setCarCCNum={setCarCCNum} />
          </div>

          <div className="car-type">
            <TypeSelect setCarType={setCarType} />
          </div>

          <div className="POP-data">
            <PrivateOrPublic setPOP={setPOP} carType={carType} />
          </div>

          <div className="oil-data">
            <OilSelect setOil={setOil} carType={carType} />
          </div>

          <button
            className="execute-btn"
            // onClick={() => executeCal()}
            onClick={executeCal}
            disabled={
              !carType || (carType !== "bike" && (POP === "" || oil === ""))
            }
          >
            執行
          </button>
        </div>
      </div>
    </div>
  );
}
