import React from "react";

export default function Navigation({ activeTab, setActiveTab }) {
    const tabs = [
        { id: "tax", label: "稅費計算", icon: "📊", desc: "Tax Calculator" },
        {
            id: "usedcar",
            label: "二手車查詢",
            icon: "🚗",
            desc: "Used Car Price",
        },
    ];

    return (
        <div className="navigation">
            <div className="nav-container">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`nav-tab ${
                            activeTab === tab.id ? "active" : ""
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <span className="nav-icon">{tab.icon}</span>
                        <div className="nav-text">
                            <span className="nav-label">{tab.label}</span>
                            <span className="nav-desc">{tab.desc}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
