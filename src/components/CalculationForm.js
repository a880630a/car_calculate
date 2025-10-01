import React from 'react';

const ccRanges = [
    { value: 0, label: "50以下", desc: "50cc以下" },
    { value: 1, label: "51~125", desc: "51-125cc" },
    { value: 2, label: "126~250", desc: "126-250cc" },
    { value: 3, label: "251~500", desc: "251-500cc" },
    { value: 4, label: "501~600", desc: "501-600cc" },
    { value: 5, label: "601~1200", desc: "601-1200cc" },
    { value: 6, label: "1201~1800", desc: "1201-1800cc" },
    { value: 7, label: "1801~2400", desc: "1801-2400cc" },
    { value: 8, label: "2401~3000", desc: "2401-3000cc" },
    { value: 9, label: "3001~3600", desc: "3001-3600cc" },
    { value: 10, label: "3601~4200", desc: "3601-4200cc" },
    { value: 11, label: "4201~4800", desc: "4201-4800cc" },
    { value: 12, label: "4801~5400", desc: "4801-5400cc" },
    { value: 13, label: "5401~6000", desc: "5401-6000cc" },
    { value: 14, label: "6001~6600", desc: "6001-6600cc" },
    { value: 15, label: "6601~7200", desc: "6601-7200cc" },
    { value: 16, label: "7201~8000", desc: "7201cc以上" },
];

export default function CalculationForm({ formData, setFormData, setStep }) {
    const isBike = formData.vehicleType === "bike";

    const handleCCChange = (value) => {
        setFormData({ ...formData, ccRange: value });
        setStep(3);
    };

    const handleDateChange = (e) => {
        setFormData({ ...formData, startDate: new Date(e.target.value) });
    };

    return (
        <div className="calculation-form">
            {/* Date Selection */}
            <div className="glass-card">
                <div className="card-header">
                    <h2>📅 選擇開始日期</h2>
                    <p className="card-subtitle">計算從此日期到年底的稅費</p>
                </div>
                <div className="form-group">
                    <input
                        type="date"
                        className="date-input"
                        value={formData.startDate.toISOString().split("T")[0]}
                        onChange={handleDateChange}
                        min={new Date().toISOString().split("T")[0]}
                        max={
                            new Date(new Date().getFullYear(), 11, 31)
                                .toISOString()
                                .split("T")[0]
                        }
                    />
                </div>
            </div>

            {/* CC Range Selection */}
            <div className="glass-card">
                <div className="card-header">
                    <h2>⚙️ 排氣量 (C.C.)</h2>
                    <p className="card-subtitle">請選擇您車輛的排氣量範圍</p>
                </div>
                <div className="cc-grid">
                    {ccRanges.map((range) => (
                        <button
                            key={range.value}
                            className={`cc-option ${
                                formData.ccRange === range.value
                                    ? "selected"
                                    : ""
                            }`}
                            onClick={() => handleCCChange(range.value)}
                        >
                            <span className="cc-label">{range.label}</span>
                            <span className="cc-desc">cc</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Usage Type - Only for non-bike */}
            {!isBike && (
                <div className="glass-card">
                    <div className="card-header">
                        <h2>🎯 使用類型</h2>
                        <p className="card-subtitle">自用或營業用</p>
                    </div>
                    <div className="option-group">
                        <button
                            className={`option-button ${
                                formData.usage === "private" ? "selected" : ""
                            }`}
                            onClick={() =>
                                setFormData({ ...formData, usage: "private" })
                            }
                        >
                            <span className="option-icon">🏠</span>
                            <span className="option-text">自用</span>
                        </button>
                        <button
                            className={`option-button ${
                                formData.usage === "public" ? "selected" : ""
                            }`}
                            onClick={() =>
                                setFormData({ ...formData, usage: "public" })
                            }
                        >
                            <span className="option-icon">💼</span>
                            <span className="option-text">營業用</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Fuel Type - Only for non-bike */}
            {!isBike && (
                <div className="glass-card">
                    <div className="card-header">
                        <h2>⛽ 燃料類型</h2>
                        <p className="card-subtitle">汽油或柴油</p>
                    </div>
                    <div className="option-group">
                        <button
                            className={`option-button ${
                                formData.fuelType === "gas" ? "selected" : ""
                            }`}
                            onClick={() =>
                                setFormData({ ...formData, fuelType: "gas" })
                            }
                        >
                            <span className="option-icon">⛽</span>
                            <span className="option-text">汽油</span>
                        </button>
                        <button
                            className={`option-button ${
                                formData.fuelType === "diesel" ? "selected" : ""
                            }`}
                            onClick={() =>
                                setFormData({ ...formData, fuelType: "diesel" })
                            }
                        >
                            <span className="option-icon">🚜</span>
                            <span className="option-text">柴油</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
