# YKN CONPFIN静态网站

这是一个部署在 Cloudflare Pages 上的静态网站项目。项目包含一个自动生成 `index.html` 文件的脚本，用于列出 `hw` 文件夹中的所有 HTML 文件。每次向仓库推送更改时，Cloudflare Pages 都会自动重建并重新部署该网站。

## 项目结构

```
my-static-site/
├── hw/
│   ├── hw1_question1.html
│   ├── hw1_question2.html
│   └── hw1_question3.html
├── scripts/
│   └── generateIndex.js   # 用于生成 index.html 的脚本
├── index.html             # 由脚本生成的主页面
└── package.json           # 项目依赖和构建脚本
```

- **`hw/`**：存放 HTML 文件的文件夹。
- **`scripts/generateIndex.js`**：读取 `hw` 文件夹中的文件并生成包含所有文件链接的 `index.html` 文件。
- **`index.html`**：主页面，列出 `hw` 文件夹中的所有文件（自动生成）。
- **`package.json`**：包含构建命令，以便在部署前生成 `index.html`。

## 部署

此站点托管在 [Cloudflare Pages](https://pages.cloudflare.com/) 上，每当 GitHub 仓库的 `main` 分支更新时，Cloudflare Pages 会自动重新部署。

### 构建与部署流程

1. **构建命令**：`npm run build`
   - 该命令执行 `generateIndex.js` 脚本，以生成或更新 `index.html` 文件。

2. **输出目录**：`/`
   - 生成的 `index.html` 文件位于项目根目录，以便 Cloudflare Pages 可以作为主页面提供服务。

### 本地开发

如果你希望在本地进行测试或开发：

1. 克隆仓库：
   ```bash
   git clone https://github.com/Chenming00/yknCompFin.git
   cd yknCompFin
   ```

2. 确保已安装 Node.js。

3. 运行构建脚本以生成 `index.html`：
   ```bash
   npm run build
   ```

4. 打开 `index.html` 文件，在浏览器中查看 `hw` 文件夹中的文件列表。

### 贡献

如果你有改进建议或其他贡献，欢迎提交 Issue 或 Pull Request。

---

### 许可证

此项目遵循 [CC BY-NC 许可证](LICENSE)。
[![Creative Commons License](https://i.creativecommons.org/l/by-nc/4.0/88x31.png)](http://creativecommons.org/licenses/by-nc/4.0/)

本作品采用 [知识共享署名-非商业性使用 4.0 国际许可协议](http://creativecommons.org/licenses/by-nc/4.0/) 进行许可。

Copyright (c) 2024 Kening Yu (i@cmand.us)

这意味着您可以：
- ✅ 复制、分享和修改本作品
- ✅ 将本作品用于个人学习和非商业用途

但您必须：
- ✅ 署名 - 标明原作者及来源
- ❌ 禁止商业使用 - 不得将本作品用于商业目的
