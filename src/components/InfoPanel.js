import React from 'react';

export default function InfoPanel({ onClose }) {
    return (
        <div className="info-overlay" onClick={onClose}>
            <div
                className="info-panel glass-card"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="info-header">
                    <h2>📖 使用說明</h2>
                    <button className="close-button" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="info-content">
                    <section className="info-section">
                        <h3>🚗 關於稅費計算</h3>
                        <p>
                            本計算器可幫助您快速計算車輛的
                            <strong>燃料稅</strong>與<strong>牌照稅</strong>。
                            只需選擇車輛類型、排氣量等資訊，系統會自動計算從指定日期到年底需要繳納的稅費。
                        </p>
                    </section>

                    <section className="info-section">
                        <h3>📝 使用步驟</h3>
                        <ol className="info-steps">
                            <li>
                                <strong>選擇車輛類型</strong>
                                <p>
                                    從機車、小客車、大客車、貨車中選擇您的車輛類型
                                </p>
                            </li>
                            <li>
                                <strong>填寫車輛資訊</strong>
                                <p>
                                    選擇日期、排氣量、使用類型（自用/營業用）、燃料類型（汽油/柴油）
                                </p>
                            </li>
                            <li>
                                <strong>查看結果</strong>
                                <p>系統會即時計算並顯示您需要繳納的稅費金額</p>
                            </li>
                        </ol>
                    </section>

                    <section className="info-section">
                        <h3>💡 計算說明</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-item-icon">📅</span>
                                <div>
                                    <strong>計算天數</strong>
                                    <p>從您選擇的日期計算到該年度12月31日</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <span className="info-item-icon">⚙️</span>
                                <div>
                                    <strong>排氣量</strong>
                                    <p>不同排氣量對應不同的稅率標準</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <span className="info-item-icon">🏠</span>
                                <div>
                                    <strong>使用類型</strong>
                                    <p>自用車輛與營業用車輛稅率不同</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <span className="info-item-icon">⛽</span>
                                <div>
                                    <strong>燃料類型</strong>
                                    <p>汽油與柴油車輛有不同的燃料稅</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="info-section">
                        <h3>🎯 功能特色</h3>
                        <ul className="feature-list">
                            <li>
                                ✨ <strong>即時計算</strong> -
                                無需點擊按鈕，自動即時計算
                            </li>
                            <li>
                                📱 <strong>響應式設計</strong> -
                                支援手機、平板、電腦各種裝置
                            </li>
                            <li>
                                🌓 <strong>深色模式</strong> -
                                支援亮色/深色主題切換
                            </li>
                            <li>
                                📜 <strong>歷史記錄</strong> -
                                自動儲存最近5次計算記錄
                            </li>
                            <li>
                                📊 <strong>視覺化呈現</strong> -
                                清晰的圖表與數據展示
                            </li>
                        </ul>
                    </section>

                    <section className="info-section">
                        <h3>⚠️ 注意事項</h3>
                        <div className="warning-box">
                            <p>
                                • 本計算結果<strong>僅供參考</strong>
                                ，實際金額以政府公告為準
                                <br />
                                • 請於規定期限內完成繳費，避免產生滯納金
                                <br />
                                • 稅率可能因政策調整而變動，請以最新公告為準
                                <br />• 特殊車輛類型可能有不同的稅率計算方式
                            </p>
                        </div>
                    </section>

                    <section className="info-section">
                        <h3>📞 相關資訊</h3>
                        <p>
                            如有疑問，請洽詢：
                            <br />• <strong>監理所</strong>：各地監理所服務電話
                            <br />• <strong>稅捐機關</strong>：各縣市稅捐稽徵處
                            <br />• <strong>線上查詢</strong>
                            ：監理服務網、地方稅網路申報系統
                        </p>
                    </section>
                </div>

                <div className="info-footer">
                    <button className="info-close-button" onClick={onClose}>
                        了解了
                    </button>
                </div>
            </div>
        </div>
    );
}

