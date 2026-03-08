# 微信小程序服务端SDK

一个基于TypeScript开发的微信小程序服务端SDK，提供统一的API调用接口和模块化设计。

## 特性

- 🚀 **TypeScript支持** - 完整的类型定义和智能提示
- 📦 **模块化设计** - 按功能模块划分，使用方便
- 🔧 **直接返回微信原始响应** - 成功返回接口数据，失败返回{errcode, errmsg}
- 🛡️ **错误处理** - 完善的错误处理机制
- 🔌 **可扩展** - 支持自定义请求适配器
- 📝 **完整文档** - 详细的API文档和示例

## 安装

```bash
npm install wxa-server-sdk
# 或
yarn add wxa-server-sdk
```

## 快速开始

### 基本使用

```typescript
import WxaServerSdk from 'wxa-server-sdk';

// 初始化SDK
const sdk = new WxaServerSdk({
  appId: 'your-app-id',
  appSecret: 'your-app-secret',
  debug: true, // 可选，启用调试模式
});

// 获取访问令牌
try {
  const accessToken = await sdk.getAccessToken();
  console.log('访问令牌:', accessToken);
} catch (error) {
  console.error('获取令牌失败:', error.message);
}

// 使用用户模块
const sessionResult = await sdk.user.code2Session('js_code');
if (sessionResult.errcode) {
  console.error('错误:', sessionResult.errcode, sessionResult.errmsg);
} else {
  console.log('用户会话:', sessionResult);
}

// 使用模板消息模块
const templateResult = await sdk.template.sendTemplateMessage({
  touser: 'openid',
  template_id: 'template_id',
  data: {
    keyword1: { value: '内容1' },
    keyword2: { value: '内容2' },
  },
});

// 使用客服消息模块
const message = sdk.customerService.createTextMessage('openid', '你好！');
await sdk.customerService.sendCustomerServiceMessage(message);

// 使用二维码模块
const qrResult = await sdk.qrCode.getQrCode({
  path: 'pages/index/index',
  width: 430,
});
if (Buffer.isBuffer(qrResult)) {
  console.log('二维码大小:', qrResult.length, 'bytes');
} else if (qrResult.errcode) {
  console.error('二维码生成失败:', qrResult.errcode, qrResult.errmsg);
}

// 使用URL Scheme模块
const schemeResult = await sdk.urlScheme.generateScheme({
  jump_wxa: {
    path: 'pages/index/index',
    query: 'id=123',
    env_version: 'release',
  },
  is_expire: true,
  expire_time: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7天后过期
});
if (schemeResult.errcode) {
  console.error('生成scheme失败:', schemeResult.errcode, schemeResult.errmsg);
} else if (schemeResult.openlink) {
  console.log('生成的scheme码:', schemeResult.openlink);
}
```

### 模块说明

#### 用户模块 (`sdk.user`)
- `code2Session(code: string)` - 登录凭证校验
- `getPhoneNumber(code: string)` - 获取用户手机号
- `decryptData(sessionKey, encryptedData, iv)` - 解密用户数据

#### 模板消息模块 (`sdk.template`)
- `sendTemplateMessage(params)` - 发送模板消息
- `getTemplateList()` - 获取模板列表
- `deleteTemplate(templateId)` - 删除模板
- `buildTemplateData(data, color)` - 构建模板数据

#### 客服消息模块 (`sdk.customerService`)
- `sendCustomerServiceMessage(message)` - 发送客服消息
- `createTextMessage(touser, content)` - 创建文本消息
- `createImageMessage(touser, mediaId)` - 创建图片消息
- `createLinkMessage(touser, title, description, url, thumbUrl)` - 创建链接消息
- `createMiniprogramPageMessage(touser, title, pagepath, thumbMediaId)` - 创建小程序页面消息
- `setTyping(touser, typing)` - 设置客服输入状态

#### 二维码模块 (`sdk.qrCode`)
- `getQrCode(params)` - 获取小程序二维码（永久有效，有数量限制）
- `getUnlimitedQrCode(params)` - 获取小程序码（永久有效，无限数量）
- `createQrCode(params)` - 创建小程序二维码
- `bufferToBase64(buffer)` - 将Buffer转换为Base64字符串
- `bufferToDataUrl(buffer, mimeType)` - 将Buffer转换为Data URL

#### URL Scheme模块 (`sdk.urlScheme`)
- `queryScheme(params)` - 查询scheme码信息
- `generateScheme(params)` - 生成scheme码（适用于短信、邮件、网页等场景）
- `generateNfcScheme(params)` - 生成NFC scheme码（适用于NFC支付等场景）

## API响应格式

SDK直接返回微信原始响应，不进行额外包装：

### 成功响应
- 微信API成功时返回接口数据，不包含errcode和errmsg字段
- 示例：`{ access_token: "xxx", expires_in: 7200 }`

### 错误响应
- 微信API失败时返回`{ errcode: number, errmsg: string }`
- 示例：`{ errcode: 40029, errmsg: "code无效" }`

### 二维码API特殊处理
- 成功：返回`Buffer`类型的图片数据
- 失败：返回`{ errcode: number, errmsg: string }`

### 响应处理示例
```typescript
// 处理普通API响应
const result = await sdk.user.code2Session('js_code');
if (result.errcode) {
  // 错误处理
  console.error(`错误: ${result.errcode} - ${result.errmsg}`);
} else {
  // 成功处理
  console.log('用户会话:', result);
}

// 处理二维码API响应
const qrResult = await sdk.qrCode.getQrCode(params);
if (Buffer.isBuffer(qrResult)) {
  // 成功：处理二进制图片数据
  console.log(`二维码大小: ${qrResult.length} bytes`);
  const base64 = sdk.qrCode.bufferToBase64(qrResult);
} else if (qrResult.errcode) {
  // 失败：处理错误
  console.error(`错误: ${qrResult.errcode} - ${qrResult.errmsg}`);
}
```

## 高级配置

### 自定义请求适配器

```typescript
import { WxaServerSdk, RequestAdapter, RequestOptions } from 'wxa-server-sdk';

class CustomRequestAdapter implements RequestAdapter {
  async request<T = any>(options: RequestOptions): Promise<T> {
    // 实现自定义请求逻辑
    // 例如使用fetch、axios或其他HTTP客户端
    // 注意：需要直接返回微信API的原始响应
    const response = await fetch(options.url, {
      method: options.method,
      headers: options.headers,
      body: options.data ? JSON.stringify(options.data) : undefined,
    });
    
    return await response.json();
  }
}

const sdk = new WxaServerSdk({
  appId: 'your-app-id',
  appSecret: 'your-app-secret',
  requestAdapter: new CustomRequestAdapter(),
});
```

### 调试模式

启用调试模式可以查看详细的请求日志：

```typescript
const sdk = new WxaServerSdk({
  appId: 'your-app-id',
  appSecret: 'your-app-secret',
  debug: true, // 启用调试模式
});
```

## 类型定义

SDK提供完整的TypeScript类型定义，包括：

- `WxaSdkConfig` - SDK配置类型
- `WechatApiResponse` - 微信API响应类型（包含errcode和errmsg）
- `UserSession` - 用户会话类型
- `TemplateMessageParams` - 模板消息参数类型
- `CustomerServiceMessage` - 客服消息类型
- `QrCodeParams`, `UnlimitedQrCodeParams`, `CreateQrCodeParams` - 二维码参数类型
- `QuerySchemeParams`, `GenerateSchemeParams`, `GenerateNfcSchemeParams` - URL Scheme参数类型
- `QuerySchemeResponse`, `GenerateSchemeResponse`, `GenerateNfcSchemeResponse` - URL Scheme响应类型

## 错误码

SDK会处理微信API的错误码，并转换为统一的错误格式。常见的微信错误码包括：

- `40029` - code无效
- `45011` - 频率限制
- `41002` - appid缺失
- `40013` - appid无效

## 开发

### 构建项目
```bash
npm run build
```

### 开发模式（监听文件变化）
```bash
npm run dev
```

### 运行测试
```bash
npm test
```

### 代码检查
```bash
npm run lint
```

### 代码格式化
```bash
npm run format
```

## 许可证

MIT

## 贡献

欢迎提交Issue和Pull Request！

## 支持

如果在使用过程中遇到问题，请：
1. 查看文档和示例
2. 搜索已有的Issue
3. 创建新的Issue并提供详细的信息