// 文件名：test_detector.js
// 版本号：V1.3
// 日期：2025-04-27

// 适配AutoX.js版，安全访问节点属性，遍历text和desc

auto(); // 开启无障碍服务

var maxDepth = 10; // 最大遍历深度

function traverse(node, depth) {
    if (depth > maxDepth || node == null) {
        return;
    }

    var textContent = node.attr("text") || "";
    var descContent = node.attr("desc") || "";
    var className = node.attr("className") || "";

    if ((textContent && textContent.trim() !== "") || (descContent && descContent.trim() !== "")) {
        console.log(
            `[depth:${depth}] [className:${className}] [text:"${textContent}"] [desc:"${descContent}"]`
        );
    }

    var childCount = node.childCount();
    for (var i = 0; i < childCount; i++) {
        traverse(node.child(i), depth + 1);
    }
}

// 获取根节点
var rootNode = depth == 0 ? currentActivity() : selector().className("android.view.View").depth(depth).findOne();
if (!rootNode) {
    rootNode = selector().className("android.view.View").findOne(3000);
}
if (rootNode) {
    traverse(rootNode, 0);
} else {
    console.log("未找到根节点，可能页面加载太慢！");
}
