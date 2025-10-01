import './styles/modern-app.scss';

import React, {
  useEffect,
  useState,
} from 'react';

import CalculationForm from './components/CalculationForm';
import HistoryPanel from './components/HistoryPanel';
import InfoPanel from './components/InfoPanel';
import ResultDisplay from './components/ResultDisplay';
import ThemeToggle from './components/ThemeToggle';
import VehicleSelector from './components/VehicleSelector';

export default function App() {
    const [theme, setTheme] = useState("light");
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        vehicleType: "",
        ccRange: null,
        usage: "",
        fuelType: "",
        startDate: new Date(),
    });
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [showInfo, setShowInfo] = useState(false);

    // Tax data structures
    const taxData = {
        car: [
            [
                0, 0, 1620, 3780, 5040, 8640, 11920, 17410, 22410, 36860, 38030,
                57390, 58350, 82770, 83640, 131910, 166920,
            ],
            [
                0, 0, 900, 900, 2700, 4320, 5460, 9563, 13500, 16380, 16380,
                24300, 24300, 33660, 33660, 44460, 56700,
            ],
            [
                0, 0, 1620, 2916, 3888, 6912, 10000, 14938, 19530, 33404, 34106,
                52902, 53478, 77538, 78060, 125946, 160632,
            ],
            [
                0, 0, 900, 900, 2124, 3456, 4500, 8330, 12060, 16380, 16380,
                24300, 24300, 33660, 33660, 44460, 56700,
            ],
        ],
        bike: [
            300, 450, 1400, 2520, 3360, 6120, 9130, 11230, 11230, 11230, 11230,
            11230, 11230, 11230, 11230, 11230, 11230,
        ],
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        const savedHistory = localStorage.getItem("taxHistory");
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, [theme]);

    useEffect(() => {
        if (canCalculate()) {
            calculateTax();
        }
    }, [formData]);

    const canCalculate = () => {
        if (!formData.vehicleType || formData.ccRange === null) return false;
        if (formData.vehicleType === "bike") return true;
        return formData.usage && formData.fuelType;
    };

    const calculateTax = () => {
        const { vehicleType, ccRange, usage, fuelType, startDate } = formData;

        let yearlyTax = 0;
        const today = new Date();
        const endOfYear = new Date(today.getFullYear(), 11, 31);
        const diffDays =
            Math.ceil((endOfYear - startDate) / (1000 * 60 * 60 * 24)) + 1;

        if (vehicleType === "bike") {
            yearlyTax = taxData.bike[ccRange];
        } else {
            const typeIndex =
                fuelType === "gas"
                    ? usage === "private"
                        ? 0
                        : 1
                    : usage === "private"
                    ? 2
                    : 3;
            yearlyTax = taxData.car[typeIndex][ccRange];
        }

        const dailyTax = yearlyTax / 365;
        const totalTax = Math.round(dailyTax * diffDays);

        const newResult = {
            yearlyTax,
            dailyTax: dailyTax.toFixed(2),
            totalTax,
            days: diffDays,
            date: new Date().toISOString(),
            formData: { ...formData },
        };

        setResult(newResult);

        // Add to history
        const newHistory = [newResult, ...history.slice(0, 4)];
        setHistory(newHistory);
        localStorage.setItem("taxHistory", JSON.stringify(newHistory));
    };

    const resetForm = () => {
        setFormData({
            vehicleType: "",
            ccRange: null,
            usage: "",
            fuelType: "",
            startDate: new Date(),
        });
        setResult(null);
        setStep(1);
    };

    return (
        <div className="modern-app">
            <div className="app-background">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            <ThemeToggle theme={theme} setTheme={setTheme} />

            <div className="app-container">
                <header className="app-header">
                    <div className="header-content">
                        <div className="logo-section">
                            <div className="logo-icon">🚗</div>
                            <div className="logo-text">
                                <h1>智能稅費計算器</h1>
                                <p>Vehicle Tax Calculator</p>
                            </div>
                        </div>
                        <button
                            className="info-button"
                            onClick={() => setShowInfo(!showInfo)}
                            aria-label="Information"
                        >
                            <span>ℹ️</span>
                        </button>
                    </div>
                    <div className="step-indicator">
                        <div
                            className={`step ${step >= 1 ? "active" : ""} ${
                                formData.vehicleType ? "completed" : ""
                            }`}
                        >
                            <span className="step-number">1</span>
                            <span className="step-label">選擇車型</span>
                        </div>
                        <div className="step-line"></div>
                        <div
                            className={`step ${step >= 2 ? "active" : ""} ${
                                formData.ccRange !== null ? "completed" : ""
                            }`}
                        >
                            <span className="step-number">2</span>
                            <span className="step-label">排氣量</span>
                        </div>
                        <div className="step-line"></div>
                        <div
                            className={`step ${step >= 3 ? "active" : ""} ${
                                result ? "completed" : ""
                            }`}
                        >
                            <span className="step-number">3</span>
                            <span className="step-label">計算結果</span>
                        </div>
                    </div>
                </header>

                <main className="app-main">
                    <div className="main-grid">
                        <div className="form-section">
                            <VehicleSelector
                                formData={formData}
                                setFormData={setFormData}
                                setStep={setStep}
                            />

                            {formData.vehicleType && (
                                <CalculationForm
                                    formData={formData}
                                    setFormData={setFormData}
                                    setStep={setStep}
                                />
                            )}

                            {result && (
                                <div className="action-buttons">
                                    <button
                                        className="reset-button"
                                        onClick={resetForm}
                                    >
                                        <span>🔄</span>
                                        重新計算
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="result-section">
                            {result ? (
                                <ResultDisplay
                                    result={result}
                                    formData={formData}
                                />
                            ) : (
                                <div className="placeholder-card glass-card">
                                    <div className="placeholder-content">
                                        <div className="placeholder-icon">
                                            📊
                                        </div>
                                        <h3>開始計算</h3>
                                        <p>請選擇您的車輛類型與相關資訊</p>
                                        <p>系統將即時計算您需要繳納的稅費</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {history.length > 0 && (
                        <HistoryPanel
                            history={history}
                            setHistory={setHistory}
                            onSelectHistory={(item) => {
                                setFormData(item.formData);
                                setResult(item);
                            }}
                        />
                    )}
                </main>

                <footer className="app-footer">
                    <p>
                        © 2025 智能稅費計算器 |
                        數據僅供參考，實際金額以政府公告為準
                    </p>
                </footer>
            </div>

            {showInfo && <InfoPanel onClose={() => setShowInfo(false)} />}
        </div>
    );
}
