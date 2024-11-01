const fs = require('fs');
const path = require('path');

const hwFolder = './hw';
const indexPath = './index.html';

fs.readdir(hwFolder, (err, files) => {
    if (err) {
        console.error('Failed to read hw folder:', err);
        return;
    }

    const htmlFiles = files.filter(file => path.extname(file) === '.html');

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YKN Computational Finance Homework</title>
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
            transition: color 0.2s;
            font-size: 1.1em;
        }
        .github-link:hover {
            color: #0366d6;
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
            border-bottom: 1px solid #eaecef;
        }
        .homework-link {
            display: flex;
            align-items: center;
            padding: 12px 16px 12px 0;
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
            padding-left: 8px;
        }
        @media (max-width: 600px) {
            .container {
                padding: 15px;
            }
            h1 {
                font-size: 1.8em;
            }
            .homework-link {
                padding: 10px 12px 10px 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Computational Finance Homework</h1>
        <a href="https://github.com/Chenming00/yknCompFin" class="github-link" target="_blank">
            <svg class="github-icon" viewBox="0 0 16 16" fill="currentColor">
                <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
            View on GitHub
        </a>
        <ol class="homework-list">
            ${htmlFiles.map(file => `
                <li class="homework-item">
                    <a href="hw/${file}" class="homework-link">
                        ${file.replace('.html', '')}
                    </a>
                </li>
            `).join('\n')}
        </ol>
    </div>
</body>
</html>
`;

    fs.writeFile(indexPath, htmlContent, err => {
        if (err) {
            console.error('Failed to write index.html:', err);
            return;
        }
        console.log('index.html generated successfully!');
    });
});