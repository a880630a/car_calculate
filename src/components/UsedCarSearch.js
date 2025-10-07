import React, { useEffect, useMemo, useState } from "react";

import usedCarDataJson from "../data/usedCarData.json";

export default function UsedCarSearch() {
    const [carData, setCarData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        brand: "",
        model: "",
        searchText: "",
        minPrice: "",
        maxPrice: "",
        minYear: "",
        maxYear: "",
    });
    const [sortBy, setSortBy] = useState("retailPrice-desc");
    const [selectedCar, setSelectedCar] = useState(null);

    // 載入數據 - 直接使用 import 的 JSON
    useEffect(() => {
        try {
            // 直接使用 import 的數據，不需要 fetch
            setCarData(usedCarDataJson);
            setLoading(false);
            console.log(
                "✅ 成功載入二手車數據:",
                usedCarDataJson.totalRecords,
                "筆"
            );
        } catch (error) {
            console.error("❌ 載入數據失敗:", error);
            setLoading(false);
        }
    }, []);

    // 獲取品牌列表
    const brands = useMemo(() => {
        if (!carData) return [];
        return carData.brands;
    }, [carData]);

    // 獲取車型列表（根據選擇的品牌）
    const models = useMemo(() => {
        if (!carData || !filters.brand) return [];
        const modelSet = new Set();
        carData.data
            .filter((car) => car.brand === filters.brand)
            .forEach((car) => modelSet.add(car.model));
        return Array.from(modelSet).sort();
    }, [carData, filters.brand]);

    // 過濾和排序數據
    const filteredData = useMemo(() => {
        if (!carData) return [];

        let filtered = carData.data.filter((car) => {
            // 品牌篩選
            if (filters.brand && car.brand !== filters.brand) return false;

            // 車型篩選
            if (filters.model && car.model !== filters.model) return false;

            // 文字搜尋（品牌、車型、車款）
            if (filters.searchText) {
                const searchLower = filters.searchText.toLowerCase();
                const matchText =
                    `${car.brand} ${car.model} ${car.variant} ${car.engine}`.toLowerCase();
                if (!matchText.includes(searchLower)) return false;
            }

            // 價格篩選（零售價）
            if (
                filters.minPrice &&
                car.retailPrice < parseFloat(filters.minPrice)
            )
                return false;
            if (
                filters.maxPrice &&
                car.retailPrice > parseFloat(filters.maxPrice)
            )
                return false;

            // 年份篩選
            if (
                filters.minYear &&
                car.productionYear < parseInt(filters.minYear)
            )
                return false;
            if (
                filters.maxYear &&
                car.productionYear > parseInt(filters.maxYear)
            )
                return false;

            return true;
        });

        // 排序
        const [sortField, sortOrder] = sortBy.split("-");
        filtered.sort((a, b) => {
            let aVal = a[sortField];
            let bVal = b[sortField];

            // 處理null值
            if (aVal === null)
                aVal = sortOrder === "desc" ? -Infinity : Infinity;
            if (bVal === null)
                bVal = sortOrder === "desc" ? -Infinity : Infinity;

            if (sortOrder === "desc") {
                return bVal - aVal;
            } else {
                return aVal - bVal;
            }
        });

        return filtered;
    }, [carData, filters, sortBy]);

    const handleFilterChange = (field, value) => {
        setFilters((prev) => ({
            ...prev,
            [field]: value,
            // 當品牌改變時，清空車型
            ...(field === "brand" ? { model: "" } : {}),
        }));
    };

    const clearFilters = () => {
        setFilters({
            brand: "",
            model: "",
            searchText: "",
            minPrice: "",
            maxPrice: "",
            minYear: "",
            maxYear: "",
        });
    };

    const formatPrice = (price) => {
        if (price === null || price === undefined) return "N/A";
        return `$${price}萬`;
    };

    const formatNumber = (num) => {
        if (num === null || num === undefined) return "N/A";
        return num.toLocaleString("zh-TW");
    };

    if (loading) {
        return (
            <div className="used-car-loading">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>載入二手車資料中...</p>
                </div>
            </div>
        );
    }

    if (!carData) {
        return (
            <div className="used-car-error">
                <p>❌ 無法載入二手車資料</p>
            </div>
        );
    }

    return (
        <div className="used-car-search">
            {/* 搜尋和篩選區域 */}
            <div className="search-panel glass-card">
                <div className="card-header">
                    <h2>🔍 搜尋二手車</h2>
                    <p className="card-subtitle">
                        共 {carData.totalRecords} 筆資料 | 顯示{" "}
                        {filteredData.length} 筆結果
                    </p>
                </div>

                {/* 搜尋框 */}
                <div className="search-input-wrapper">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="搜尋品牌、車型、車款..."
                        value={filters.searchText}
                        onChange={(e) =>
                            handleFilterChange("searchText", e.target.value)
                        }
                    />
                    <span className="search-icon">🔎</span>
                </div>

                {/* 篩選選項 */}
                <div className="filter-grid">
                    <div className="filter-group">
                        <label>品牌</label>
                        <select
                            value={filters.brand}
                            onChange={(e) =>
                                handleFilterChange("brand", e.target.value)
                            }
                            className="filter-select"
                        >
                            <option value="">全部品牌</option>
                            {brands.map((brand) => (
                                <option key={brand} value={brand}>
                                    {brand}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>車型</label>
                        <select
                            value={filters.model}
                            onChange={(e) =>
                                handleFilterChange("model", e.target.value)
                            }
                            className="filter-select"
                            disabled={!filters.brand}
                        >
                            <option value="">全部車型</option>
                            {models.map((model) => (
                                <option key={model} value={model}>
                                    {model}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>最低價格（萬）</label>
                        <input
                            type="number"
                            className="filter-input"
                            placeholder="0"
                            value={filters.minPrice}
                            onChange={(e) =>
                                handleFilterChange("minPrice", e.target.value)
                            }
                        />
                    </div>

                    <div className="filter-group">
                        <label>最高價格（萬）</label>
                        <input
                            type="number"
                            className="filter-input"
                            placeholder="500"
                            value={filters.maxPrice}
                            onChange={(e) =>
                                handleFilterChange("maxPrice", e.target.value)
                            }
                        />
                    </div>

                    <div className="filter-group">
                        <label>最早年份</label>
                        <input
                            type="number"
                            className="filter-input"
                            placeholder="2000"
                            value={filters.minYear}
                            onChange={(e) =>
                                handleFilterChange("minYear", e.target.value)
                            }
                        />
                    </div>

                    <div className="filter-group">
                        <label>最晚年份</label>
                        <input
                            type="number"
                            className="filter-input"
                            placeholder="2025"
                            value={filters.maxYear}
                            onChange={(e) =>
                                handleFilterChange("maxYear", e.target.value)
                            }
                        />
                    </div>
                </div>

                {/* 工具列 */}
                <div className="filter-toolbar">
                    <div className="sort-control">
                        <label>排序：</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-select"
                        >
                            <option value="retailPrice-desc">
                                零售價：高到低
                            </option>
                            <option value="retailPrice-asc">
                                零售價：低到高
                            </option>
                            <option value="purchasePrice-desc">
                                收購價：高到低
                            </option>
                            <option value="purchasePrice-asc">
                                收購價：低到高
                            </option>
                            <option value="productionYear-desc">
                                年份：新到舊
                            </option>
                            <option value="productionYear-asc">
                                年份：舊到新
                            </option>
                        </select>
                    </div>
                    <button className="clear-button" onClick={clearFilters}>
                        🔄 清除篩選
                    </button>
                </div>
            </div>

            {/* 結果列表 */}
            <div className="results-container">
                {filteredData.length === 0 ? (
                    <div className="no-results glass-card">
                        <div className="no-results-content">
                            <div className="no-results-icon">🔍</div>
                            <h3>找不到符合條件的車輛</h3>
                            <p>請嘗試調整搜尋條件</p>
                        </div>
                    </div>
                ) : (
                    <div className="results-grid">
                        {filteredData.map((car, index) => (
                            <div
                                key={index}
                                className="car-card glass-card"
                                onClick={() => setSelectedCar(car)}
                            >
                                <div className="car-card-header">
                                    <div className="car-brand-badge">
                                        {car.brand}
                                    </div>
                                    <div className="car-year">
                                        {car.productionYear || "N/A"}
                                    </div>
                                </div>

                                <div className="car-card-body">
                                    <h3 className="car-title">
                                        {car.model} {car.variant}
                                    </h3>
                                    <p className="car-engine">{car.engine}</p>
                                    <p className="car-model-year">
                                        {car.modelYear}
                                    </p>
                                </div>

                                <div className="car-card-footer">
                                    <div className="price-row">
                                        <div className="price-item retail">
                                            <span className="price-label">
                                                零售行情
                                            </span>
                                            <span className="price-value">
                                                {formatPrice(car.retailPrice)}
                                            </span>
                                        </div>
                                        <div className="price-item purchase">
                                            <span className="price-label">
                                                收購行情
                                            </span>
                                            <span className="price-value">
                                                {formatPrice(car.purchasePrice)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="car-card-hover-overlay">
                                    <span>點擊查看詳情</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 詳情彈窗 */}
            {selectedCar && (
                <div
                    className="car-detail-overlay"
                    onClick={() => setSelectedCar(null)}
                >
                    <div
                        className="car-detail-panel glass-card"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="detail-header">
                            <h2>
                                {selectedCar.brand} {selectedCar.model}
                            </h2>
                            <button
                                className="close-button"
                                onClick={() => setSelectedCar(null)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="detail-content">
                            <div className="detail-section">
                                <h3>🚗 車輛資訊</h3>
                                <div className="detail-grid">
                                    <div className="detail-item">
                                        <span className="detail-label">
                                            品牌
                                        </span>
                                        <span className="detail-value">
                                            {selectedCar.brand}
                                        </span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">
                                            車型
                                        </span>
                                        <span className="detail-value">
                                            {selectedCar.model}
                                        </span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">
                                            車款
                                        </span>
                                        <span className="detail-value">
                                            {selectedCar.variant}
                                        </span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">
                                            引擎
                                        </span>
                                        <span className="detail-value">
                                            {selectedCar.engine}
                                        </span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">
                                            年式
                                        </span>
                                        <span className="detail-value">
                                            {selectedCar.modelYear}
                                        </span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">
                                            出廠年份
                                        </span>
                                        <span className="detail-value">
                                            {selectedCar.productionYear ||
                                                "N/A"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="detail-section">
                                <h3>💰 價格資訊</h3>
                                <div className="price-detail-grid">
                                    <div className="price-detail-card new-price">
                                        <div className="price-detail-icon">
                                            🏷️
                                        </div>
                                        <div className="price-detail-info">
                                            <span className="price-detail-label">
                                                新車價
                                            </span>
                                            <span className="price-detail-amount">
                                                {formatNumber(
                                                    selectedCar.newCarPrice
                                                )}{" "}
                                                元
                                            </span>
                                        </div>
                                    </div>
                                    <div className="price-detail-card retail-price">
                                        <div className="price-detail-icon">
                                            💵
                                        </div>
                                        <div className="price-detail-info">
                                            <span className="price-detail-label">
                                                零售行情
                                            </span>
                                            <span className="price-detail-amount">
                                                {formatPrice(
                                                    selectedCar.retailPrice
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="price-detail-card purchase-price">
                                        <div className="price-detail-icon">
                                            💳
                                        </div>
                                        <div className="price-detail-info">
                                            <span className="price-detail-label">
                                                收購行情
                                            </span>
                                            <span className="price-detail-amount">
                                                {formatPrice(
                                                    selectedCar.purchasePrice
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {selectedCar.retailPrice &&
                                    selectedCar.purchasePrice && (
                                        <div className="price-analysis">
                                            <p>
                                                <strong>價差分析：</strong>
                                                零售與收購差價約{" "}
                                                {formatPrice(
                                                    selectedCar.retailPrice -
                                                        selectedCar.purchasePrice
                                                )}
                                            </p>
                                        </div>
                                    )}
                            </div>

                            <div className="detail-note">
                                <p>
                                    ⚠️ <strong>注意：</strong>
                                    以上行情價格僅供參考，實際車況、里程數、配備等因素都會影響實際交易價格。
                                    建議實車鑑定後再做決定。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
