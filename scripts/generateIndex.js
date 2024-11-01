const fs = require('fs');
const path = require('path');

const hwFolder = './hw';
const indexPath = './index.html';

// 获取 hw 文件夹中的文件
fs.readdir(hwFolder, (err, files) => {
    if (err) {
        console.error('Failed to read hw folder:', err);
        return;
    }

    // 过滤 HTML 文件
    const htmlFiles = files.filter(file => path.extname(file) === '.html');

    // 生成 HTML 内容
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Homework Files</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { text-align: center; }
        ul { list-style-type: none; padding: 0; }
        li { margin: 10px 0; padding: 10px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 5px; }
        a { text-decoration: none; color: #333; }
        a:hover { color: #007bff; }
    </style>
</head>
<body>
    <h1>Homework Files</h1>
    <ul>
        ${htmlFiles.map(file => `<li><a href="hw/${file}">${file}</a></li>`).join('\n')}
    </ul>
</body>
</html>
`;

    // 将生成的 HTML 内容写入 index.html 文件
    fs.writeFile(indexPath, htmlContent, err => {
        if (err) {
            console.error('Failed to write index.html:', err);
            return;
        }
        console.log('index.html generated successfully!');
    });
});
