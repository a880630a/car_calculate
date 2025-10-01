import React, {
  useEffect,
  useState,
} from 'react';

export default function ResultDisplay({ result, formData }) {
    const [animatedValue, setAnimatedValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = result.totalTax;
        const duration = 1000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setAnimatedValue(end);
                clearInterval(timer);
            } else {
                setAnimatedValue(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [result.totalTax]);

    const getVehicleInfo = () => {
        const types = {
            bike: "機車",
            car: "小客車",
            bigCar: "大客車",
            truck: "貨車",
        };
        return types[formData.vehicleType] || "";
    };

    const getVehicleIcon = () => {
        const icons = {
            bike: "🏍️",
            car: "🚗",
            bigCar: "🚌",
            truck: "🚚",
        };
        return icons[formData.vehicleType] || "🚗";
    };

    const getUsageInfo = () => {
        if (formData.vehicleType === "bike") return null;
        return formData.usage === "private" ? "自用" : "營業用";
    };

    const getFuelInfo = () => {
        if (formData.vehicleType === "bike") return null;
        return formData.fuelType === "gas" ? "汽油" : "柴油";
    };

    return (
        <div className="result-display">
            <div className="glass-card result-card">
                <div className="card-header">
                    <h2>💰 計算結果</h2>
                    <p className="card-subtitle">您需要繳納的稅費</p>
                </div>

                <div className="result-main">
                    <div className="result-amount">
                        <span className="currency">NT$</span>
                        <span className="amount">
                            {animatedValue.toLocaleString()}
                        </span>
                    </div>
                    <div className="result-label">應繳稅額</div>
                </div>

                <div className="result-details">
                    <div className="detail-row">
                        <span className="detail-label">📅 計算天數</span>
                        <span className="detail-value">{result.days} 天</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">📊 全年稅額</span>
                        <span className="detail-value">
                            NT$ {result.yearlyTax.toLocaleString()}
                        </span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">📈 平均每日</span>
                        <span className="detail-value">
                            NT$ {result.dailyTax}
                        </span>
                    </div>
                </div>

                <div className="result-breakdown">
                    <h3>計算資訊</h3>
                    <div className="breakdown-grid">
                        <div className="breakdown-item">
                            <span className="breakdown-icon">
                                {getVehicleIcon()}
                            </span>
                            <div className="breakdown-content">
                                <span className="breakdown-label">
                                    車輛類型
                                </span>
                                <span className="breakdown-value">
                                    {getVehicleInfo()}
                                </span>
                            </div>
                        </div>

                        {getUsageInfo() && (
                            <div className="breakdown-item">
                                <span className="breakdown-icon">🎯</span>
                                <div className="breakdown-content">
                                    <span className="breakdown-label">
                                        使用類型
                                    </span>
                                    <span className="breakdown-value">
                                        {getUsageInfo()}
                                    </span>
                                </div>
                            </div>
                        )}

                        {getFuelInfo() && (
                            <div className="breakdown-item">
                                <span className="breakdown-icon">⛽</span>
                                <div className="breakdown-content">
                                    <span className="breakdown-label">
                                        燃料類型
                                    </span>
                                    <span className="breakdown-value">
                                        {getFuelInfo()}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="result-chart">
                    <div className="chart-container">
                        <svg viewBox="0 0 200 100" className="mini-chart">
                            <defs>
                                <linearGradient
                                    id="chartGradient"
                                    x1="0%"
                                    y1="0%"
                                    x2="0%"
                                    y2="100%"
                                >
                                    <stop
                                        offset="0%"
                                        stopColor="#4ECDC4"
                                        stopOpacity="0.8"
                                    />
                                    <stop
                                        offset="100%"
                                        stopColor="#4ECDC4"
                                        stopOpacity="0.2"
                                    />
                                </linearGradient>
                            </defs>
                            <path
                                d={`M 0 80 Q 50 ${
                                    80 -
                                    (result.totalTax / result.yearlyTax) * 40
                                } 100 ${
                                    80 -
                                    (result.totalTax / result.yearlyTax) * 50
                                } T 200 60`}
                                fill="url(#chartGradient)"
                                stroke="#4ECDC4"
                                strokeWidth="2"
                            />
                        </svg>
                    </div>
                    <p className="chart-label">
                        稅額占全年比例:{" "}
                        {((result.totalTax / result.yearlyTax) * 100).toFixed(
                            1
                        )}
                        %
                    </p>
                </div>
            </div>

            <div className="glass-card info-card">
                <h3>💡 溫馨提醒</h3>
                <ul className="info-list">
                    <li>此計算結果僅供參考，實際金額以政府公告為準</li>
                    <li>請於繳納期限內完成繳費，避免產生滯納金</li>
                    <li>可至超商、銀行或線上繳費</li>
                    <li>保留繳費收據以備查驗</li>
                </ul>
            </div>
        </div>
    );
}
