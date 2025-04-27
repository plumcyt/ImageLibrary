// 文件名：test_detector.js
// 版本号：V1.1
// 日期：2025-04-27

// 测试脚本：检测页面上所有元素，输出text和desc字段内容

auto(); // 开启无障碍服务

// 设置搜索范围
var depth = 0;
var maxDepth = 10;

// 递归遍历函数
function traverse(node, depth) {
    if (depth > maxDepth || node == null) {
        return;
    }

    var textContent = node.text();
    var descContent = node.desc();
    var className = node.className();

    // 只输出有内容的节点
    if ((textContent && textContent.trim() !== "") || (descContent && descContent.trim() !== "")) {
        console.log(
            `[depth:${depth}] [className:${className}] [text:"${textContent}"] [desc:"${descContent}"]`
        );
    }

    // 递归遍历子节点
    var children = node.children();
    for (var i = 0; i < children.size(); i++) {
        traverse(children.get(i), depth + 1);
    }
}

// 从根节点开始遍历
var rootNode = depth == 0 ? currentActivity() : className("android.view.View").depth(depth).findOne();
if (!rootNode) {
    rootNode = className("android.view.View").findOne(3000);
}
if (rootNode) {
    traverse(rootNode, 0);
} else {
    console.log("未找到根节点，可能页面加载太慢！");
}
