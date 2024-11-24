const fs = require('fs').promises;
const path = require('path');

const CONFIG = {
    hwFolder: path.join(__dirname, '../hw'),
    outputPath: path.join(__dirname, '../index.html'),
    title: 'YKN Computational Finance Homework',
    githubRepo: 'https://github.com/Chenming00/yknCompFin'
};

// 通用样式
const COMMON_STYLES = `
<style>
/* 工具栏容器 */
.floating-toolbar {
    position: fixed;
    bottom: 30px;
    right: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 1000;
}

/* 按钮基础样式 */
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

/* 返回按钮样式 */
.back-to-home {
    background: #0366d6;
    box-shadow: 0 2px 8px rgba(3, 102, 214, 0.3);
}

/* 下载按钮样式 */
.download-button {
    background: #28a745;
    box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
}

/* 悬浮效果 */
.toolbar-button:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
}

.back-to-home:hover {
    box-shadow: 0 4px 12px rgba(3, 102, 214, 0.4);
}

.download-button:hover {
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.4);
}

/* 图标样式 */
.toolbar-button svg {
    width: 16px;
    height: 16px;
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
    .back-to-home {
        background: #58a6ff;
    }
    .download-button {
        background: #2ea043;
    }
}

/* 移动端适配 */
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

<!-- 下载功能的 JavaScript -->
<script>
function downloadPage() {
    // 获取当前页面的 HTML 内容
    const pageContent = document.documentElement.outerHTML;
    
    // 创建 Blob 对象
    const blob = new Blob([pageContent], { type: 'text/html' });
    
    // 创建下载链接
    const url = window.URL.createObjectURL(blob);
    
    // 获取当前页面的文件名
    const filename = document.title.toLowerCase().replace(/[^a-z0-9]/g, '_') + '.html';
    
    // 创建临时下载链接
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    
    // 添加到文档中并触发点击
    document.body.appendChild(a);
    a.click();
    
    // 清理
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}
</script>
`;

// 工具栏 HTML
const TOOLBAR_HTML = `
<div class="floating-toolbar">
    <a href="../index.html" class="toolbar-button back-to-home">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 12H5"/>
            <path d="M12 19l-7-7 7-7"/>
        </svg>
        返回首页
    </a>
    <button onclick="downloadPage()" class="toolbar-button download-button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        下载页面
    </button>
</div>
`;

// 修改作业文件，添加工具栏
async function modifyHomeworkFile(filePath) {
    try {
        let content = await fs.readFile(filePath, 'utf8');
        
        // 如果文件已经有工具栏，就不重复添加
        if (content.includes('floating-toolbar')) {
            return;
        }

        // 添加样式和工具栏
        content = content.replace(
            '</head>',
            COMMON_STYLES + '</head>'
        ).replace(
            '</body>',
            TOOLBAR_HTML + '</body>'
        );

        await fs.writeFile(filePath, content);
        console.log(`已更新作业文件: ${path.basename(filePath)}`);
    } catch (error) {
        console.error(`修改作业文件失败 ${filePath}:`, error);
    }
}

// [生成主页 HTML 的函数保持不变...]
// [generateHTML 函数的内容保持不变...]

async function generateIndex() {
    try {
        console.log('开始生成索引页面...');
        
        // 读取作业文件
        const files = await fs.readdir(CONFIG.hwFolder);
        const htmlFiles = files.filter(file => path.extname(file) === '.html');
        
        // 修改每个作业文件，添加工具栏
        for (const file of htmlFiles) {
            const filePath = path.join(CONFIG.hwFolder, file);
            await modifyHomeworkFile(filePath);
        }
        
        // 生成索引页面
        const htmlContent = generateHTML(htmlFiles);
        await fs.writeFile(CONFIG.outputPath, htmlContent);
        
        console.log('✅ 所有文件处理完成！');
        console.log(`- 已处理 ${htmlFiles.length} 个作业文件`);
        console.log('- 已生成索引页面');

    } catch (error) {
        console.error('❌ 生成过程出错:', error);
        throw error;
    }
}

// 执行生成
generateIndex().catch(error => {
    console.error('执行失败:', error);
    process.exit(1);
});
