// 文件名：test_detector.js
// 版本号：V1.1
// 日期：2025-04-26

/**
 * 万能检测脚本
 * 自动分析当前页面元素是否可通过desc()/click()控制
 */

// --- 配置区域 ---
const targetDescs = ["缺货登记", "立即提交", "立即预订", "确定"];  // 填你想测试的按钮描述
const waitTimeout = 5000; // 查找控件最大等待时间（毫秒）

// --- 核心测试逻辑 ---
function testElements() {
    console.log("=== 开始检测元素可控性 ===");
    for (let descKeyword of targetDescs) {
        console.log(`\n>> 测试关键词: "${descKeyword}"`);
        let element = descContains(descKeyword).findOne(waitTimeout);
        if (element) {
            console.log(`[找到元素] id: ${element.id()}, className: ${element.className()}, bounds: ${element.bounds().toString()}`);
            try {
                // 尝试直接点击
                let clickable = element.clickable();
                console.log(`元素clickable属性: ${clickable}`);
                if (clickable) {
                    console.log("尝试直接click()...");
                    element.click();
                    sleep(1000); // 等待页面变化
                } else {
                    console.log("元素不可直接click()，尝试坐标点击...");
                    let b = element.bounds();
                    click(b.centerX(), b.centerY());
                    sleep(1000);
                }
                console.log("[点击测试完成] 观察页面是否有变化。");
            } catch (err) {
                console.error("点击时报错:", err);
            }
        } else {
            console.warn(`[未找到元素] "${descKeyword}"，可能是图片渲染或防脚本机制`);
        }
    }
    console.log("\n=== 检测结束，请观察控制台输出和页面变化 ===");
}

// --- 执行检测 ---
testElements();
