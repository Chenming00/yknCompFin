const fs = require('fs').promises;
const path = require('path');

const CONFIG = {
    hwFolder: path.join(__dirname, '../hw'),
    outputPath: path.join(__dirname, '../index.html'),
    title: 'YKN Computational Finance Homework',
    githubRepo: 'https://github.com/Chenming00/yknCompFin'
};

// 生成 HTML
function generateHTML(htmlFiles) {
    console.log('正在处理的文件:', htmlFiles);
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${CONFIG.title}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f6f8fa;
            color: #24292e;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        h1 {
            text-align: center;
            color: #0366d6;
            margin-bottom: 2rem;
        }
        .homework-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1rem;
            margin-top: 2rem;
        }
        .homework-item {
            background: #f8f9fa;
            border: 1px solid #e1e4e8;
            border-radius: 6px;
            padding: 1rem;
            transition: all 0.2s ease;
        }
        .homework-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            border-color: #0366d6;
        }
        .homework-link {
            color: #0366d6;
            text-decoration: none;
            display: block;
            font-weight: 500;
        }
        .homework-link:hover {
            text-decoration: underline;
        }
        .github-link {
            display: inline-flex;
            align-items: center;
            padding: 8px 16px;
            background: #24292e;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 1rem 0;
            transition: background-color 0.2s;
        }
        .github-link:hover {
            background: #2f363d;
        }
        .github-icon {
            margin-right: 8px;
            width: 20px;
            height: 20px;
        }
        .build-info {
            margin-top: 2rem;
            padding-top: 1rem;
            border-top: 1px solid #e1e4e8;
            color: #6a737d;
            font-size: 0.9rem;
            text-align: center;
        }
        @media (prefers-color-scheme: dark) {
            body {
                background-color: #0d1117;
                color: #c9d1d9;
            }
            .container {
                background: #161b22;
            }
            .homework-item {
                background: #21262d;
                border-color: #30363d;
            }
            .homework-link {
                color: #58a6ff;
            }
            .build-info {
                border-color: #30363d;
                color: #8b949e;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>${CONFIG.title}</h1>
        
        <center>
            <a href="${CONFIG.githubRepo}" class="github-link" target="_blank" rel="noopener noreferrer">
                <svg class="github-icon" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                View on GitHub
            </a>
        </center>

        <div class="homework-grid">
            ${htmlFiles.length > 0 
                ? htmlFiles
                    .sort((a, b) => {
                        // 首先按作业号排序
                        const hwNumA = parseInt(a.match(/hw(\d+)/i)?.[1] || 0);
                        const hwNumB = parseInt(b.match(/hw(\d+)/i)?.[1] || 0);
                        if (hwNumA !== hwNumB) return hwNumA - hwNumB;
                        
                        // 然后按问题号排序
                        const qNumA = parseInt(a.match(/question(\d+)/i)?.[1] || 0);
                        const qNumB = parseInt(b.match(/question(\d+)/i)?.[1] || 0);
                        return qNumA - qNumB;
                    })
                    .map(file => {
                        // 美化显示名称
                        const displayName = file
                            .replace('.html', '')
                            .replace(/hw(\d+)_question(\d+)/i, 'Homework $1 - Question $2');
                        
                        return `
                        <div class="homework-item">
                            <a href="hw/${file}" class="homework-link">${displayName}</a>
                        </div>
                        `;
                    }).join('\n')
                : '<div class="homework-item">No homework files found</div>'
            }
        </div>

        <div class="build-info">
            Last updated: ${new Date().toLocaleString('en-US', { 
                timeZone: 'Asia/Shanghai',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            })} (GMT+8)
        </div>
    </div>
</body>
</html>`;
}

async function generateIndex() {
    try {
        console.log('开始生成索引页面...');
        console.log('作业目录:', CONFIG.hwFolder);
        console.log('输出路径:', CONFIG.outputPath);

        // 读取作业文件
        const files = await fs.readdir(CONFIG.hwFolder);
        console.log('目录内容:', files);

        const htmlFiles = files.filter(file => path.extname(file) === '.html');
        console.log('HTML 文件:', htmlFiles);

        // 生成并写入 index.html
        const htmlContent = generateHTML(htmlFiles);
        await fs.writeFile(CONFIG.outputPath, htmlContent);
        console.log('索引页面已生成！');

    } catch (error) {
        console.error('生成索引页面时出错:', error);
        throw error;
    }
}

// 执行生成
generateIndex().catch(error => {
    console.error('执行失败:', error);
    process.exit(1);
});
