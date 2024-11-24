const fs = require('fs').promises;
const path = require('path');

const CONFIG = {
    hwFolder: path.join(__dirname, '../hw'),
    outputPath: path.join(__dirname, '../index.html'),
    title: 'YKN Computational Finance Homework',
    githubRepo: 'https://github.com/Chenming00/yknCompFin'
};

// 通用样式更新，添加 GitHub 按钮样式
const COMMON_STYLES = `
<style>
.floating-toolbar {
    position: fixed;
    bottom: 30px;
    right: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 1000;
}

.toolbar-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border-radius: 50px;
    color: white;
    text-decoration: none;
    font-family: -apple-system, system-ui, sans-serif;
    font-size: 14px;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
    outline: none;
}

.back-to-home {
    background: #0366d6;
    box-shadow: 0 2px 8px rgba(3, 102, 214, 0.3);
}

.download-button {
    background: #28a745;
    box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
}

.github-button {
    background: #24292e;
    box-shadow: 0 2px 8px rgba(36, 41, 46, 0.3);
}

.toolbar-button:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
}

.toolbar-button svg {
    width: 16px;
    height: 16px;
}

@media (prefers-color-scheme: dark) {
    .back-to-home {
        background: #58a6ff;
    }
    .download-button {
        background: #2ea043;
    }
    .github-button {
        background: #30363d;
    }
}

@media (max-width: 768px) {
    .floating-toolbar {
        bottom: 20px;
        right: 20px;
    }
    .toolbar-button {
        padding: 10px 20px;
    }
}
</style>

<script>
function downloadPage() {
    const pageContent = document.documentElement.outerHTML;
    const blob = new Blob([pageContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const filename = document.title.toLowerCase().replace(/[^a-z0-9]/g, '_') + '.html';
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}
</script>
`;

// 更新工具栏 HTML，添加 GitHub 按钮
const TOOLBAR_HTML = `
<div class="floating-toolbar">
    <a href="../index.html" class="toolbar-button back-to-home">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5"/>
            <path d="M12 19l-7-7 7-7"/>
        </svg>
        返回首页
    </a>
    <button onclick="downloadPage()" class="toolbar-button download-button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        下载页面
    </button>
    <a href="${CONFIG.githubRepo}" target="_blank" class="toolbar-button github-button">
        <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
        GitHub
    </a>
</div>
`;

// 修改作业文件，添加工具栏
async function modifyHomeworkFile(filePath) {
    try {
        let content = await fs.readFile(filePath, 'utf8');
        
        if (!content.includes('floating-toolbar')) {
            content = content.replace('</head>', COMMON_STYLES + '</head>')
                           .replace('</body>', TOOLBAR_HTML + '</body>');
            await fs.writeFile(filePath, content);
            console.log(`✅ 已更新: ${path.basename(filePath)}`);
        }
    } catch (error) {
        console.error(`❌ 修改失败 ${filePath}:`, error);
    }
}

// 生成首页 HTML
function generateHTML(htmlFiles) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${CONFIG.title}</title>
    <style>
        body {
            font-family: -apple-system, system-ui, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f6f8fa;
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
        .github-header {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-bottom: 2rem;
            text-decoration: none;
            color: #24292e;
            padding: 10px 20px;
            border-radius: 6px;
            transition: all 0.2s;
        }
        .github-header:hover {
            background: #f6f8fa;
        }
        .homework-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1rem;
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
            border-color: #0366d6;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .homework-link {
            color: #0366d6;
            text-decoration: none;
            font-weight: 500;
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
            body { background: #0d1117; color: #c9d1d9; }
            .container { background: #161b22; }
            .homework-item { 
                background: #21262d;
                border-color: #30363d;
            }
            .homework-link { color: #58a6ff; }
            .github-header {
                color: #c9d1d9;
            }
            .github-header:hover {
                background: #21262d;
            }
            .build-info { 
                border-color: #30363d;
                color: #8b949e;
            }
            h1 { color: #58a6ff; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>${CONFIG.title}</h1>
        <a href="${CONFIG.githubRepo}" class="github-header" target="_blank">
            <svg height="32" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            <span>View on GitHub</span>
        </a>
        <div class="homework-grid">
            ${htmlFiles.length > 0 
                ? htmlFiles
                    .sort((a, b) => {
                        const hwNumA = parseInt(a.match(/hw(\d+)/i)?.[1] || 0);
                        const hwNumB = parseInt(b.match(/hw(\d+)/i)?.[1] || 0);
                        if (hwNumA !== hwNumB) return hwNumA - hwNumB;
                        const qNumA = parseInt(a.match(/question(\d+)/i)?.[1] || 0);
                        const qNumB = parseInt(b.match(/question(\d+)/i)?.[1] || 0);
                        return qNumA - qNumB;
                    })
                    .map(file => {
                        const displayName = file
                            .replace('.html', '')
                            .replace(/hw(\d+)_question(\d+)/i, 'Homework $1 - Question $2')
                            .replace('test', 'Test');
                        return `
                        <div class="homework-item">
                            <a href="hw/${file}" class="homework-link">${displayName}</a>
                        </div>`;
                    }).join('\n')
                : '<div class="homework-item">No homework files found</div>'
            }
        </div>
        <div class="build-info">
            Last updated: ${new Date().toLocaleString('en-US', { 
                timeZone: 'Asia/Shanghai',
                year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit',
                hour12: false
            })} (GMT+8)
        </div>
    </div>
    ${TOOLBAR_HTML}
</body>
</html>`;
}

// 主函数
async function generateIndex() {
    try {
        console.log('🚀 开始生成...');
        
        // 读取文件
        const files = await fs.readdir(CONFIG.hwFolder);
        const htmlFiles = files.filter(file => path.extname(file) === '.html');
        
        // 处理每个作业文件
        for (const file of htmlFiles) {
            const filePath = path.join(CONFIG.hwFolder, file);
            await modifyHomeworkFile(filePath);
        }
        
        // 生成索引页面
        const htmlContent = generateHTML(htmlFiles);
        await fs.writeFile(CONFIG.outputPath, htmlContent);
        
        console.log('✅ 完成！');
        console.log(`- 处理了 ${htmlFiles.length} 个作业文件`);
        console.log('- 生成了索引页面');

    } catch (error) {
        console.error('❌ 错误:', error);
        throw error;
    }
}

// 运行
generateIndex().catch(error => {
    console.error('❌ 运行失败:', error);
    process.exit(1);
});
