# Novelist

Novelist 是一款一体化小说创作软件，旨在为作家提供流畅高效的写作体验。

## 快速开始

本项目使用 Just、Node.js 和 pnpm。以下是如何运行项目的简单指南：

**准备工作:**

* **Node.js:** 确保已安装 Node.js。
* **pnpm:** 使用 npm 全局安装 pnpm：`npm install -g pnpm`
* **Just:** 使用 cargo 全局安装 Just：`cargo install just` 或 [Github查看其他安装方式](https://github.com/casey/just)


**安装依赖:**

```bash
just install
```

### 脚本

* **install:** 安装项目依赖：`just install` （等同于 `pnpm install`）
* **lint:** 使用 Biome 检查代码：`just lint`
* **format:** 使用 Biome 格式化代码：`just format`
