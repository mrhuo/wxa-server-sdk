# 微信小程序服务端SDK项目总结

## 项目概述

本项目是一个完整的微信小程序服务端SDK的Node.js模块，基于微信官方API文档开发。SDK采用模块化设计，提供统一的返回值格式，方便调用。

## 已完成的功能模块

### 1. 核心模块
- **BaseSdk**: 基础SDK类，提供访问令牌管理、API请求构建等核心功能
- **DefaultRequestAdapter**: 默认请求适配器，基于axios实现HTTP请求
- **WxaServerSdk**: 主SDK类，集成所有功能模块

### 2. 用户信息模块 (UserModule)
- `code2Session`: 登录凭证校验，获取用户openid和session_key
- `getPaidUnionId`: 支付后获取用户UnionId

### 3. 模板消息模块 (TemplateMessageModule)
- `sendTemplateMessage`: 发送模板消息

### 4. 客服消息模块 (CustomerServiceModule)
- `sendCustomerServiceMessage`: 发送客服消息
- 支持文本、图片、链接、小程序页面等多种消息类型

### 5. 二维码模块 (QrCodeModule)
- `createQrCode`: 创建二维码
- `getUnlimitedQrCode`: 获取无限数量二维码

### 6. URL Scheme模块 (UrlSchemeModule)
- `queryScheme`: 查询scheme码
- `generateScheme`: 生成scheme码
- `generateNfcScheme`: 生成NFC scheme码
- `queryUrlLink`: 查询URL Link
- `generateUrlLink`: 生成URL Link
- `generateShortLink`: 生成短链（Short Link）

## 技术特点

### 1. 统一的返回值格式
- 成功时返回接口数据
- 失败时返回 `{errcode, errmsg}` 格式
- 统一的错误处理机制

### 2. 模块化设计
- 每个功能模块独立封装
- 清晰的API接口设计
- 易于扩展和维护

### 3. TypeScript支持
- 完整的类型定义
- 类型安全的API调用
- 自动补全和类型检查

### 4. 配置灵活
- 支持自定义请求适配器
- 可配置超时时间
- 调试模式支持

## 项目结构

```
wxa-server-sdk/
├── src/                          # 源代码目录
│   ├── core/                     # 核心模块
│   │   └── index.ts              # 核心模块入口
│   ├── modules/                  # 功能模块
│   │   ├── customer-service.ts   # 客服消息模块
│   │   ├── qrcode.ts             # 二维码模块
│   │   ├── template.ts           # 模板消息模块
│   │   ├── url-scheme.ts         # URL Scheme模块
│   │   └── user.ts               # 用户信息模块
│   ├── types/                    # 类型定义
│   │   └── index.ts              # 类型定义入口
│   └── index.ts                  # SDK主入口
├── examples/                     # 示例代码
│   ├── modules/                  # 模块化示例
│   │   ├── core/                 # 核心模块示例
│   │   ├── customer-service/     # 客服消息示例
│   │   ├── qrcode/               # 二维码示例
│   │   ├── template/             # 模板消息示例
│   │   ├── url-scheme/           # URL Scheme示例
│   │   └── user/                 # 用户信息示例
│   ├── utils/                    # 工具函数
│   │   └── config.js             # 配置工具
│   └── test-all.js               # 完整测试示例
├── package.json                  # 项目配置
├── tsconfig.json                 # TypeScript配置
├── jest.config.js                # 测试配置
├── .eslintrc.js                  # ESLint配置
├── .prettierrc                   # Prettier配置
├── PROJECT_SUMMARY.md            # 项目总结文档
└── README.md                     # 项目说明文档
```

### 目录说明

1. **src/**: 包含所有TypeScript源代码
   - `core/`: 核心功能，包括基础SDK类、请求适配器等
   - `modules/`: 各个功能模块的实现
   - `types/`: TypeScript类型定义
   - `index.ts`: SDK主入口文件

2. **examples/**: 包含使用示例和测试代码
   - `modules/`: 按模块组织的示例代码
   - `utils/`: 工具函数和配置
   - 各种测试文件：展示不同API的使用方式

3. **配置文件**: 项目构建、测试和代码质量相关配置

## API实现详情

### URL Scheme API (3个接口)
1. **查询scheme码** (`/wxa/queryscheme`)
   - 功能：查询小程序scheme码及长期有效scheme码的剩余访问次数
   - 方法：`queryScheme(params: QuerySchemeParams)`

2. **生成scheme码** (`/wxa/generatescheme`)
   - 功能：获取小程序scheme码，适用于短信、邮件、外部网页、微信内等拉起小程序的业务场景
   - 方法：`generateScheme(params: GenerateSchemeParams)`

3. **生成NFC scheme码** (`/wxa/generatenfcscheme`)
   - 功能：获取NFC拉起小程序scheme码
   - 方法：`generateNfcScheme(params: GenerateNfcSchemeParams)`

### URL Link API (2个接口)
1. **查询URL Link** (`/wxa/query_urllink`)
   - 功能：查询小程序URL Link及长期有效URL Link的剩余访问次数
   - 方法：`queryUrlLink(params: QueryUrlLinkParams)`

2. **生成URL Link** (`/wxa/generate_urllink`)
   - 功能：获取小程序URL Link，适用于短信、邮件、外部网页、微信内等拉起小程序的业务场景
   - 方法：`generateUrlLink(params: GenerateUrlLinkParams)`

### 短链API (1个接口)
1. **生成短链** (`/wxa/genwxashortlink`)
   - 功能：获取小程序短链，适用于短信、邮件、网页、微信内等拉起小程序的业务场景
   - 方法：`generateShortLink(params: GenerateShortLinkParams)`
   - 参数：
     - `page_url`: 小程序页面路径
     - `page_title`: 页面标题
     - `is_permanent`: 是否永久有效（默认false）

## API实现详情

### 用户信息模块 (UserModule)

1. **登录凭证校验** (`/sns/jscode2session`)
   - 方法：`code2Session(code: string)`
   - 功能：通过微信登录code获取用户openid和session_key
   - 实现：使用GET请求调用微信API，无需access_token
   - 返回：`UserSession & WechatApiResponse`，包含openid、session_key或错误信息

2. **获取用户手机号** (`/wxa/business/getuserphonenumber`)
   - 方法：`getPhoneNumber(code: string)`
   - 功能：通过动态令牌获取用户手机号信息
   - 实现：使用POST请求调用微信API，需要access_token
   - 返回：包含phone_info的手机号信息或错误信息

3. **检查加密数据**
   - 方法：`decryptData<T>(sessionKey: string, encryptedData: string, iv: string)`
   - 功能：解密微信加密的用户数据
   - 实现：需要crypto模块实现解密逻辑（占位实现）

### 模板消息模块 (TemplateModule)

1. **发送模板消息** (`/cgi-bin/message/wxopen/template/send`)
   - 方法：`sendTemplateMessage(params: TemplateMessageParams)`
   - 功能：向指定用户发送模板消息
   - 实现：使用POST请求调用微信API，需要access_token
   - 返回：`WechatApiResponse & { msgid?: number }`，包含消息ID或错误信息

2. **获取模板列表** (`/cgi-bin/wxopen/template/list`)
   - 方法：`getTemplateList()`
   - 功能：获取已添加的模板列表
   - 实现：使用GET请求调用微信API，需要access_token
   - 返回：包含模板列表或错误信息

3. **删除模板** (`/cgi-bin/wxopen/template/del`)
   - 方法：`deleteTemplate(templateId: string)`
   - 功能：删除指定的模板
   - 实现：使用POST请求调用微信API，需要access_token
   - 返回：`WechatApiResponse`，操作结果

4. **组合模板消息数据**
   - 方法：`buildTemplateData(data: Record<string, string>, color?: string)`
   - 功能：构建模板消息的数据格式
   - 实现：将键值对转换为微信模板消息要求的格式

### 客服消息模块 (CustomerServiceModule)

1. **发送客服消息** (`/cgi-bin/message/custom/send`)
   - 方法：`sendCustomerServiceMessage(message: CustomerServiceMessage)`
   - 功能：向用户发送客服消息
   - 实现：使用POST请求调用微信API，需要access_token
   - 支持消息类型：文本、图片、链接、小程序页面

2. **创建文本客服消息**
   - 方法：`createTextMessage(touser: string, content: string)`
   - 功能：创建文本类型的客服消息对象
   - 实现：构建符合微信API格式的消息对象

3. **创建图片客服消息**
   - 方法：`createImageMessage(touser: string, mediaId: string)`
   - 功能：创建图片类型的客服消息对象
   - 实现：构建符合微信API格式的消息对象

4. **创建链接客服消息**
   - 方法：`createLinkMessage(touser: string, title: string, description: string, url: string, thumbUrl: string)`
   - 功能：创建链接类型的客服消息对象
   - 实现：构建符合微信API格式的消息对象

5. **创建小程序页面客服消息**
   - 方法：`createMiniprogramPageMessage(touser: string, title: string, pagepath: string, thumbMediaId: string)`
   - 功能：创建小程序页面类型的客服消息对象
   - 实现：构建符合微信API格式的消息对象

6. **设置客服输入状态** (`/cgi-bin/message/custom/typing`)
   - 方法：`setTyping(touser: string, typing: boolean)`
   - 功能：设置客服输入状态（正在输入/取消输入）
   - 实现：使用POST请求调用微信API，需要access_token

### 二维码模块 (QrCodeModule)

1. **获取小程序二维码** (`/cgi-bin/wxaapp/createwxaqrcode`)
   - 方法：`getQrCode(params: QrCodeParams)`
   - 功能：获取小程序二维码（永久有效，有数量限制）
   - 实现：使用POST请求调用微信API，需要access_token，处理二进制响应
   - 返回：`Buffer`（二维码图片）或错误信息

2. **获取小程序码（无限数量）** (`/wxa/getwxacodeunlimit`)
   - 方法：`getUnlimitedQrCode(params: UnlimitedQrCodeParams)`
   - 功能：获取小程序码（永久有效，无数量限制）
   - 实现：使用POST请求调用微信API，需要access_token，处理二进制响应
   - 返回：`Buffer`（小程序码图片）或错误信息

3. **创建小程序二维码** (`/cgi-bin/wxaapp/createwxaqrcode`)
   - 方法：`createQrCode(params: CreateQrCodeParams)`
   - 功能：创建小程序二维码（与getQrCode功能相同）
   - 实现：使用POST请求调用微信API，需要access_token，处理二进制响应

4. **Buffer转换工具方法**
   - `bufferToBase64(buffer: Buffer)`: 将Buffer转换为Base64字符串
   - `bufferToDataUrl(buffer: Buffer, mimeType: string)`: 将Buffer转换为Data URL

### URL Scheme模块 (UrlSchemeModule)

1. **查询scheme码** (`/wxa/queryscheme`)
   - 方法：`queryScheme(params: QuerySchemeParams)`
   - 功能：查询小程序scheme码及长期有效scheme码的剩余访问次数
   - 实现：使用POST请求调用微信API，需要access_token

2. **生成scheme码** (`/wxa/generatescheme`)
   - 方法：`generateScheme(params: GenerateSchemeParams)`
   - 功能：获取小程序scheme码，适用于短信、邮件、外部网页、微信内等拉起小程序的业务场景
   - 实现：使用POST请求调用微信API，需要access_token

3. **生成NFC scheme码** (`/wxa/generatenfcscheme`)
   - 方法：`generateNfcScheme(params: GenerateNfcSchemeParams)`
   - 功能：获取NFC拉起小程序scheme码
   - 实现：使用POST请求调用微信API，需要access_token

4. **查询URL Link** (`/wxa/query_urllink`)
   - 方法：`queryUrlLink(params: QueryUrlLinkParams)`
   - 功能：查询小程序URL Link及长期有效URL Link的剩余访问次数
   - 实现：使用POST请求调用微信API，需要access_token

5. **生成URL Link** (`/wxa/generate_urllink`)
   - 方法：`generateUrlLink(params: GenerateUrlLinkParams)`
   - 功能：获取小程序URL Link，适用于短信、邮件、外部网页、微信内等拉起小程序的业务场景
   - 实现：使用POST请求调用微信API，需要access_token

6. **生成短链** (`/wxa/genwxashortlink`)
   - 方法：`generateShortLink(params: GenerateShortLinkParams)`
   - 功能：获取小程序短链，适用于短信、邮件、网页、微信内等拉起小程序的业务场景
   - 实现：使用POST请求调用微信API，需要access_token

## 使用示例

### 初始化SDK
```javascript
const { WxaServerSdk } = require('wxa-server-sdk');

const sdk = new WxaServerSdk({
  appId: 'your-app-id',
  appSecret: 'your-app-secret',
  debug: true,
});
```

### 使用短链API
```javascript
// 生成临时短链
const result = await sdk.urlScheme.generateShortLink({
  page_url: 'pages/index/index',
  page_title: '小程序首页',
  is_permanent: false,
});

if (result.errcode === 0 && result.link) {
  console.log(`生成的短链: ${result.link}`);
  // 可用于短信、邮件、社交媒体等场景
} else {
  console.error(`错误: ${result.errcode} - ${result.errmsg}`);
}
```

### 使用URL Link API
```javascript
// 生成URL Link
const urlLinkResult = await sdk.urlScheme.generateUrlLink({
  path: 'pages/product/detail',
  query: 'id=123',
  env_version: 'release',
  expire_type: 0,
  expire_time: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7天后过期
});

if (urlLinkResult.errcode === 0 && urlLinkResult.url_link) {
  console.log(`生成的URL Link: ${urlLinkResult.url_link}`);
}
```

### 使用用户信息模块
```javascript
// 登录凭证校验
const sessionResult = await sdk.user.code2Session('js_code_from_wx_login');
if (sessionResult.errcode) {
  console.error(`错误: ${sessionResult.errcode} - ${sessionResult.errmsg}`);
} else {
  console.log(`用户openid: ${sessionResult.openid}`);
  console.log(`会话密钥: ${sessionResult.session_key}`);
}

// 获取用户手机号
const phoneResult = await sdk.user.getPhoneNumber('phone_code_from_wx');
if (phoneResult.errcode) {
  console.error(`错误: ${phoneResult.errcode} - ${phoneResult.errmsg}`);
} else if (phoneResult.phone_info) {
  console.log(`用户手机号: ${phoneResult.phone_info.phoneNumber}`);
  console.log(`纯手机号: ${phoneResult.phone_info.purePhoneNumber}`);
  console.log(`国家代码: ${phoneResult.phone_info.countryCode}`);
}
```

### 使用模板消息模块
```javascript
// 构建模板消息数据
const templateData = sdk.template.buildTemplateData({
  keyword1: '订单号: 202312345678',
  keyword2: '商品名称: iPhone 15 Pro',
  keyword3: '订单金额: ¥8999',
  keyword4: '下单时间: 2023-12-01 10:30:00',
}, '#173177');

// 发送模板消息
const templateResult = await sdk.template.sendTemplateMessage({
  touser: 'user_openid',
  template_id: 'template_id_from_wx',
  page: 'pages/order/detail',
  data: templateData,
});

if (templateResult.errcode) {
  console.error(`错误: ${templateResult.errcode} - ${templateResult.errmsg}`);
} else {
  console.log(`模板消息发送成功，消息ID: ${templateResult.msgid}`);
}

// 获取模板列表
const templateList = await sdk.template.getTemplateList();
if (templateList.errcode) {
  console.error(`错误: ${templateList.errcode} - ${templateList.errmsg}`);
} else if (templateList.list) {
  console.log(`模板数量: ${templateList.list.length}`);
  templateList.list.forEach(template => {
    console.log(`模板ID: ${template.template_id}, 标题: ${template.title}`);
  });
}
```

### 使用客服消息模块
```javascript
// 创建文本客服消息
const textMessage = sdk.customerService.createTextMessage(
  'user_openid',
  '您好，有什么可以帮您？'
);

// 发送客服消息
const csResult = await sdk.customerService.sendCustomerServiceMessage(textMessage);
if (csResult.errcode) {
  console.error(`错误: ${csResult.errcode} - ${csResult.errmsg}`);
} else {
  console.log('客服消息发送成功');
}

// 创建链接客服消息
const linkMessage = sdk.customerService.createLinkMessage(
  'user_openid',
  '欢迎使用小程序',
  '点击查看最新活动',
  'https://example.com',
  'https://example.com/thumb.jpg'
);

// 设置客服输入状态
await sdk.customerService.setTyping('user_openid', true);  // 开始输入
// ... 处理用户请求 ...
await sdk.customerService.setTyping('user_openid', false); // 结束输入
```

### 使用二维码模块
```javascript
// 获取小程序二维码
const qrCodeResult = await sdk.qrCode.getQrCode({
  path: 'pages/index/index',
  width: 430,
});

if (Buffer.isBuffer(qrCodeResult)) {
  console.log(`二维码大小: ${qrCodeResult.length} bytes`);
  
  // 转换为Base64
  const base64 = sdk.qrCode.bufferToBase64(qrCodeResult);
  console.log(`Base64长度: ${base64.length}`);
  
  // 转换为Data URL
  const dataUrl = sdk.qrCode.bufferToDataUrl(qrCodeResult);
  console.log(`Data URL: ${dataUrl.substring(0, 50)}...`);
} else if (qrCodeResult.errcode) {
  console.error(`错误: ${qrCodeResult.errcode} - ${qrCodeResult.errmsg}`);
}

// 获取无限数量小程序码
const unlimitedResult = await sdk.qrCode.getUnlimitedQrCode({
  scene: 'id=123',
  page: 'pages/product/detail',
  width: 430,
  auto_color: true,
  line_color: { r: 0, g: 0, b: 0 },
  is_hyaline: false,
});

if (Buffer.isBuffer(unlimitedResult)) {
  console.log(`小程序码大小: ${unlimitedResult.length} bytes`);
}
```

### 使用URL Scheme模块的其他功能
```javascript
// 生成scheme码
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
  console.error(`错误: ${schemeResult.errcode} - ${schemeResult.errmsg}`);
} else if (schemeResult.openlink) {
  console.log(`生成的scheme码: ${schemeResult.openlink}`);
}

// 查询scheme码
const queryResult = await sdk.urlScheme.queryScheme({
  scheme: 'weixin://dl/business/?t=abc123',
});

if (queryResult.errcode) {
  console.error(`错误: ${queryResult.errcode} - ${queryResult.errmsg}`);
} else {
  console.log(`scheme访问次数: ${queryResult.visit_openid}`);
  console.log(`剩余访问次数: ${queryResult.scheme_quota?.remain_quota}`);
}

// 运行所有模块测试
const { runAllTests } = require('wxa-server-sdk/examples/test-all');
await runAllTests();
```

## 技术栈

- **语言**: TypeScript 4.9+
- **运行时**: Node.js 14+
- **HTTP客户端**: Axios
- **测试框架**: Jest
- **构建工具**: TypeScript Compiler
- **包管理**: npm

## 许可证

MIT License

## 作者

https://www.github.com/mrhuo

---

**项目创建时间**: 2026年3月
**最后更新时间**: 2026年3月8日
**版本**: 1.0.0