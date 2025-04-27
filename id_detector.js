// 文件名：test_detector.js
// 版本号：V1.2
// 日期：2025-04-26

/**
 * 万能检测脚本
 * 自动分析当前页面元素是否可通过坐标点击控制
 */

// --- 配置区域 ---
const targetIds = ["trade_project_detail_purchase_status_bar_container_fl"];  // 填你想测试的控件ID
const waitTimeout = 5000; // 查找控件最大等待时间（毫秒）

// --- 核心测试逻辑 ---
function testElements() {
    console.log("=== 开始检测元素可控性 ===");
    for (let targetId of targetIds) {
        console.log(`\n>> 测试控件ID: "${targetId}"`);
        let element = id(targetId).findOne(waitTimeout);
        if (element) {
            console.log(`[找到元素] id: ${element.id()}, className: ${element.className()}, bounds: ${element.bounds().toString()}`);
            try {
                // 获取元素的bounds
                let b = element.bounds();
                let centerX = (b.left + b.right) / 2;
                let centerY = (b.top + b.bottom) / 2;
                console.log(`元素bounds: ${b.toString()}，点击坐标: (${centerX}, ${centerY})`);

                // 使用坐标点击
                click(centerX, centerY);
                sleep(1000); // 等待页面变化
                console.log("[点击测试完成] 观察页面是否有变化。");
            } catch (err) {
                console.error("点击时报错:", err);
            }
        } else {
            console.warn(`[未找到元素] ID: "${targetId}"，可能是图片渲染或防脚本机制`);
        }
    }
    console.log("\n=== 检测结束，请观察控制台输出和页面变化 ===");
}

// --- 执行检测 ---
testElements();
