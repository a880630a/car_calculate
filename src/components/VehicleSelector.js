import React from 'react';

const vehicles = [
    {
        id: "bike",
        name: "機車",
        icon: "🏍️",
        description: "機車、重型機車",
        color: "#FF6B6B",
    },
    {
        id: "car",
        name: "小客車",
        icon: "🚗",
        description: "自用小客車、營業小客車",
        color: "#4ECDC4",
    },
    {
        id: "bigCar",
        name: "大客車",
        icon: "🚌",
        description: "大型客車",
        color: "#45B7D1",
    },
    {
        id: "truck",
        name: "貨車",
        icon: "🚚",
        description: "貨車、卡車",
        color: "#FFA07A",
    },
];

export default function VehicleSelector({ formData, setFormData, setStep }) {
    const handleSelect = (vehicleId) => {
        setFormData({
            ...formData,
            vehicleType: vehicleId,
            usage: "",
            fuelType: "",
            ccRange: null,
        });
        setStep(2);
    };

    return (
        <div className="glass-card vehicle-selector">
            <div className="card-header">
                <h2>選擇車輛類型</h2>
                <p className="card-subtitle">請選擇您要計算的車輛類型</p>
            </div>

            <div className="vehicle-grid">
                {vehicles.map((vehicle) => (
                    <button
                        key={vehicle.id}
                        className={`vehicle-card ${
                            formData.vehicleType === vehicle.id
                                ? "selected"
                                : ""
                        }`}
                        onClick={() => handleSelect(vehicle.id)}
                        style={{ "--vehicle-color": vehicle.color }}
                    >
                        <div className="vehicle-icon">{vehicle.icon}</div>
                        <div className="vehicle-info">
                            <h3>{vehicle.name}</h3>
                            <p>{vehicle.description}</p>
                        </div>
                        {formData.vehicleType === vehicle.id && (
                            <div className="selected-badge">✓</div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}

