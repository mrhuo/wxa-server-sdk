# 发布到 npm 平台指南

本指南将帮助您将微信小程序服务端SDK发布到npm平台。

## 准备工作

### 1. 检查项目配置

确保 `package.json` 文件中的以下信息正确：

```json
{
  "name": "wxa-server-sdk",
  "version": "1.0.0",
  "description": "微信小程序服务端SDK - 提供统一的API调用接口",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "keywords": ["wechat", "miniprogram", "sdk", "server", "api"],
  "author": "您的姓名或组织名",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/您的用户名/wxa-server-sdk.git"
  },
  "bugs": {
    "url": "https://github.com/您的用户名/wxa-server-sdk/issues"
  },
  "homepage": "https://github.com/您的用户名/wxa-server-sdk#readme"
}
```

**需要更新的字段：**
- `author`: 您的姓名或组织名
- `repository.url`: 您的GitHub仓库地址
- `bugs.url`: 您的GitHub Issues地址
- `homepage`: 您的项目主页地址

### 2. 更新版本号

根据语义化版本控制（SemVer）规则更新版本号：

- **主版本号（Major）**: 不兼容的API更改
- **次版本号（Minor）**: 向后兼容的功能性新增
- **修订号（Patch）**: 向后兼容的问题修复

例如，如果是首次发布，可以使用 `1.0.0`。

### 3. 确保构建文件最新

运行以下命令确保构建文件是最新的：

```bash
npm run build
```

这会生成 `dist/` 目录，包含编译后的JavaScript文件。

## 发布步骤

### 步骤1: 登录 npm 账户

如果您还没有 npm 账户，请先注册：https://www.npmjs.com/signup

然后在命令行中登录：

```bash
npm login
```

系统会提示您输入：
- 用户名
- 密码
- 邮箱地址
- 一次性密码（如果启用了双重验证）

### 步骤2: 检查包名可用性

在发布前，检查包名是否可用：

```bash
npm view wxa-server-sdk
```

如果返回 `404`，表示包名可用。如果包名已被占用，您需要修改 `package.json` 中的 `name` 字段。

### 步骤3: 运行测试

确保所有测试通过：

```bash
npm test
```

### 步骤4: 发布到 npm

使用以下命令发布：

```bash
npm publish
```

**注意：** 如果是首次发布，建议先使用 `--dry-run` 参数进行试运行：

```bash
npm publish --dry-run
```

这会显示将要发布的内容，但不会实际发布。

### 步骤5: 验证发布

发布后，您可以通过以下方式验证：

1. 在 npm 官网搜索您的包：https://www.npmjs.com/package/wxa-server-sdk
2. 使用命令行查看包信息：

```bash
npm view wxa-server-sdk
```

## 发布后的维护

### 更新版本

当您需要发布新版本时：

1. 更新 `package.json` 中的版本号
2. 提交更改到 Git
3. 创建 Git 标签：

```bash
git tag v1.0.0
git push origin v1.0.0
```

4. 重新构建并发布：

```bash
npm run build
npm publish
```

### 撤销发布

如果发布后发现严重问题，可以在72小时内撤销发布：

```bash
npm unpublish wxa-server-sdk@1.0.0
```

**注意：** 撤销后，相同的版本号不能再发布。

## 最佳实践

### 1. 使用 .npmignore 文件

创建 `.npmignore` 文件，指定哪些文件不应该发布到 npm：

```
# 源代码
src/

# 测试文件
examples/
__tests__/
*.test.js
*.spec.js

# 配置文件
.env
.env.example
.eslintrc.js
.prettierrc
jest.config.js
tsconfig.json

# 文档
PROJECT_SUMMARY.md
PUBLISH_GUIDE.md

# 其他
.gitignore
```

### 2. 添加 package.json 中的 files 字段

在 `package.json` 中明确指定要包含的文件：

```json
"files": [
  "dist",
  "README.md",
  "LICENSE"
]
```

### 3. 添加预发布脚本

在 `package.json` 中添加预发布检查：

```json
"scripts": {
  "prepublishOnly": "npm test && npm run lint",
  "prepare": "npm run build"
}
```

### 4. 添加引擎要求

指定支持的 Node.js 版本：

```json
"engines": {
  "node": ">=16.0.0"
}
```

## 常见问题

### 1. 包名冲突

如果包名已被占用，可以：
- 添加组织前缀：`@your-org/wxa-server-sdk`
- 使用不同的名称：`wechat-miniprogram-sdk`

### 2. 权限错误

如果遇到权限错误，检查：
- 是否已登录正确的 npm 账户
- 是否有该包名的发布权限

### 3. 版本号错误

确保版本号符合 SemVer 格式：`主版本号.次版本号.修订号`

### 4. 构建失败

确保 TypeScript 编译成功：
```bash
npm run build
```

检查 `dist/` 目录是否包含所有必要的文件。

## 推广您的包

发布后，您可以：

1. 在 README.md 中添加 npm 安装说明
2. 在 GitHub 仓库中添加 npm 徽章
3. 在相关社区和论坛分享
4. 编写博客文章或教程

## 后续步骤

1. **监控下载量**: 使用 npm 统计功能
2. **收集反馈**: 通过 GitHub Issues 收集用户反馈
3. **定期更新**: 根据用户反馈和微信API更新进行维护
4. **添加更多功能**: 考虑添加更多微信小程序API支持

## 有用的命令

```bash
# 查看当前登录用户
npm whoami

# 查看包信息
npm view wxa-server-sdk

# 查看包的所有版本
npm view wxa-server-sdk versions

# 更新包
npm update wxa-server-sdk

# 安装特定版本
npm install wxa-server-sdk@1.0.0

# 发布测试版本
npm publish --tag beta
```

祝您发布成功！