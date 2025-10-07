#!/bin/bash
# 檢查修復是否正確應用

echo "🔍 檢查二手車查詢功能修復狀態..."
echo ""

# 檢查 1: JSON 文件存在
echo "📁 檢查 JSON 文件..."
if [ -f "src/data/usedCarData.json" ]; then
    SIZE=$(ls -lh src/data/usedCarData.json | awk '{print $5}')
    echo "   ✅ src/data/usedCarData.json 存在 (大小: $SIZE)"
else
    echo "   ❌ src/data/usedCarData.json 不存在"
    exit 1
fi

if [ -f "public/usedCarData.json" ]; then
    SIZE=$(ls -lh public/usedCarData.json | awk '{print $5}')
    echo "   ✅ public/usedCarData.json 存在 (大小: $SIZE)"
else
    echo "   ❌ public/usedCarData.json 不存在"
fi

# 檢查 2: import 語句
echo ""
echo "📝 檢查組件修改..."
if grep -q "import usedCarDataJson from" src/components/UsedCarSearch.js; then
    echo "   ✅ import 語句已添加"
else
    echo "   ❌ import 語句未找到"
    exit 1
fi

if grep -q "setCarData(usedCarDataJson)" src/components/UsedCarSearch.js; then
    echo "   ✅ 使用 import 的數據"
else
    echo "   ❌ 未使用 import 的數據"
    exit 1
fi

# 檢查 3: JSON 格式
echo ""
echo "🔍 驗證 JSON 格式..."
if python3 -m json.tool src/data/usedCarData.json > /dev/null 2>&1; then
    RECORDS=$(python3 -c "import json; data=json.load(open('src/data/usedCarData.json')); print(data['totalRecords'])")
    BRANDS=$(python3 -c "import json; data=json.load(open('src/data/usedCarData.json')); print(len(data['brands']))")
    echo "   ✅ JSON 格式正確"
    echo "   ✅ 總記錄數: $RECORDS 筆"
    echo "   ✅ 品牌數量: $BRANDS 個"
else
    echo "   ❌ JSON 格式錯誤"
    exit 1
fi

echo ""
echo "═══════════════════════════════════════"
echo "✅ 所有檢查通過！"
echo "═══════════════════════════════════════"
echo ""
echo "📋 下一步："
echo "   1. 在瀏覽器中按 Ctrl+Shift+R 硬刷新"
echo "   2. 檢查控制台是否顯示："
echo "      ✅ 成功載入二手車數據: 5918 筆"
echo "   3. 查看是否顯示車輛卡片"
echo ""
echo "🚀 如果還有問題，重啟開發伺服器："
echo "   Ctrl+C 停止，然後 npm start"
echo ""
