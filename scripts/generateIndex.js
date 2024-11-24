const fs = require('fs').promises;
const path = require('path');

const CONFIG = {
    hwFolder: './hw',
    outputDir: './dist',  // Cloudflare Pages 默认构建输出目录
    title: 'YKN Computational Finance Homework',
    githubRepo: 'https://github.com/Chenming00/yknCompFin'
};

// Generate HTML content for the index page
function generateHTML(htmlFiles) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="YKN Computational Finance Homework Collection">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📊</text></svg>">
    <title>${CONFIG.title}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #ffffff;
            color: #24292e;
            line-height: 1.6;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            animation: fadeIn 0.5s ease-in;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        h1 {
            text-align: center;
            color: #24292e;
            margin-bottom: 30px;
            font-size: 2.2em;
            font-weight: 600;
        }
        .github-link {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin: 20px 0 30px;
            padding: 8px 16px;
            text-decoration: none;
            color: #24292e;
            transition: all 0.2s;
            font-size: 1.1em;
            border: 1px solid transparent;
            border-radius: 6px;
        }
        .github-link:hover {
            color: #0366d6;
            border-color: #0366d6;
            background-color: rgba(3, 102, 214, 0.05);
        }
        .github-icon {
            width: 20px;
            height: 20px;
        }
        .homework-list {
            list-style: none;
            padding: 0;
            margin: 0;
            counter-reset: homework;
        }
        .homework-item {
            counter-increment: homework;
            margin-bottom: 12px;
            border: 1px solid #eaecef;
            border-radius: 6px;
            transition: all 0.2s;
        }
        .homework-item:hover {
            border-color: #0366d6;
            box-shadow: 0 2px 8px rgba(3, 102, 214, 0.15);
        }
        .homework-link {
            display: flex;
            align-items: center;
            padding: 12px 16px;
            color: #24292e;
            text-decoration: none;
            transition: all 0.2s;
            position: relative;
        }
        .homework-link:before {
            content: counter(homework) ".";
            min-width: 32px;
            color: #6a737d;
            font-weight: 500;
        }
        .homework-link:hover {
            color: #0366d6;
        }
        .build-time {
            text-align: center;
            color: #6a737d;
            font-size: 0.9em;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eaecef;
        }
        .empty-state {
            text-align: center;
            padding: 40px 20px;
            color: #6a737d;
            background: #f6f8fa;
            border-radius: 6px;
            margin: 20px 0;
        }
        @media (max-width: 600px) {
            .container {
                padding: 15px;
            }
            h1 {
                font-size: 1.8em;
            }
            .homework-link {
                padding: 10px 12px;
            }
        }
        @media (prefers-color-scheme: dark) {
            body {
                background-color: #0d1117;
                color: #c9d1d9;
            }
            h1 {
                color: #c9d1d9;
            }
            .github-link {
                color: #c9d1d9;
            }
            .github-link:hover {
                color: #58a6ff;
                border-color: #58a6ff;
                background-color: rgba(88, 166, 255, 0.1);
            }
            .homework-item {
                border-color: #30363d;
            }
            .homework-item:hover {
                border-color: #58a6ff;
                box-shadow: 0 2px 8px rgba(88, 166, 255, 0.15);
            }
            .homework-link {
                color: #c9d1d9;
            }
            .homework-link:hover {
                color: #58a6ff;
            }
            .build-time {
                color: #8b949e;
                border-color: #30363d;
            }
            .empty-state {
                background: #161b22;
                color: #8b949e;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>${CONFIG.title}</h1>
        <a href="${CONFIG.githubRepo}" class="github-link" target="_blank" rel="noopener noreferrer">
            <svg class="github-icon" viewBox="0 0 16 16" fill="currentColor">
                <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
            View on GitHub
        </a>
        ${htmlFiles.length > 0 ? `
        <ol class="homework-list">
            ${htmlFiles
                .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
                .map(file => `
                    <li class="homework-item">
                        <a href="hw/${file}" class="homework-link">
                            ${file.replace('.html', '')}
                        </a>
                    </li>
                `).join('\n')}
        </ol>
        ` : `
        <div class="empty-state">
            No homework files found. Check back later!
        </div>
        `}
        <div class="build-time">
            Built at: ${new Date().toLocaleString('en-US', { 
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
</html>
`;
}

// Copy directory recursively
async function copyDir(src, dest) {
    try {
        await fs.mkdir(dest, { recursive: true });
        const entries = await fs.readdir(src, { withFileTypes: true });

        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);

            if (entry.isDirectory()) {
                await copyDir(srcPath, destPath);
            } else {
                await fs.copyFile(srcPath, destPath);
            }
        }
    } catch (error) {
        console.error(`Error copying directory from ${src} to ${dest}:`, error);
        throw error;
    }
}

// Build function
async function build() {
    console.log('🚀 Starting build process...');

    try {
        // 1. Create dist directory
        await fs.mkdir(CONFIG.outputDir, { recursive: true });
        console.log('📁 Created dist directory');

        // 2. Copy hw folder to dist
        const distHwPath = path.join(CONFIG.outputDir, 'hw');
        await copyDir(CONFIG.hwFolder, distHwPath);
        console.log('📚 Copied homework files');

        // 3. Generate index.html
        const files = await fs.readdir(CONFIG.hwFolder);
        const htmlFiles = files.filter(file => path.extname(file) === '.html');
        const htmlContent = generateHTML(htmlFiles);
        
        // 4. Write index.html to dist
        await fs.writeFile(path.join(CONFIG.outputDir, 'index.html'), htmlContent);
        console.log('📝 Generated index.html');

        console.log('✅ Build completed successfully!');
    } catch (error) {
        console.error('❌ Build failed:', error);
        process.exit(1);
    }
}

// Run build
build();
