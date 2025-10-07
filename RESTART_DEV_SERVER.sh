#!/bin/bash
# 重新啟動開發伺服器的腳本

echo "🛑 停止現有的開發伺服器..."
# 查找並終止所有 react-scripts start 進程
pkill -f "react-scripts start"

# 等待進程完全終止
sleep 2

echo "✅ 已停止舊的開發伺服器"
echo ""
echo "🚀 正在啟動新的開發伺服器..."
echo "請在新終端中執行: npm start"
echo ""
echo "或者直接運行："
echo "cd /home/xian/xian_ws/car/car_calculate && npm start"
