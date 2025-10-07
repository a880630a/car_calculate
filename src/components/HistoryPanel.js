import React, { useState } from 'react';

export default function HistoryPanel({ history, setHistory, onSelectHistory }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const clearHistory = () => {
        if (window.confirm("確定要清除所有歷史記錄嗎？")) {
            setHistory([]);
            localStorage.removeItem("taxHistory");
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("zh-TW", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getVehicleIcon = (type) => {
        const icons = {
            bike: "🏍️",
            car: "🚗",
            bigCar: "🚌",
            truck: "🚚",
        };
        return icons[type] || "🚗";
    };

    return (
        <div className={`history-panel ${isExpanded ? "expanded" : ""}`}>
            <div
                className="history-header"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="history-title">
                    <span className="history-icon">📜</span>
                    <h3>計算歷史</h3>
                    <span className="history-count">({history.length})</span>
                </div>
                <div className="history-controls">
                    {history.length > 0 && (
                        <button
                            className="clear-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                clearHistory();
                            }}
                            title="清除歷史"
                        >
                            🗑️
                        </button>
                    )}
                    <button className="expand-button">
                        {isExpanded ? "▼" : "▲"}
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div className="history-content">
                    {history.length === 0 ? (
                        <div className="history-empty">
                            <p>尚無計算記錄</p>
                        </div>
                    ) : (
                        <div className="history-list">
                            {history.map((item, index) => (
                                <div
                                    key={index}
                                    className="history-item glass-card"
                                    onClick={() => onSelectHistory(item)}
                                >
                                    <div className="history-item-header">
                                        <span className="history-vehicle-icon">
                                            {getVehicleIcon(
                                                item.formData.vehicleType
                                            )}
                                        </span>
                                        <div className="history-item-info">
                                            <span className="history-item-amount">
                                                NT${" "}
                                                {item.totalTax.toLocaleString()}
                                            </span>
                                            <span className="history-item-date">
                                                {formatDate(item.date)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="history-item-details">
                                        <span className="history-detail-badge">
                                            {item.days} 天
                                        </span>
                                        {item.formData.usage && (
                                            <span className="history-detail-badge">
                                                {item.formData.usage ===
                                                "private"
                                                    ? "自用"
                                                    : "營業用"}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

